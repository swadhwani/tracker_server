const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Tickets = require('../models/tickets');

const ticketRouter = express.Router();

ticketRouter.use(bodyParser.json());

ticketRouter.route('/')
    .get((req, res, next) => {
        Tickets.find({})
            .then((tickets) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tickets);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Tickets.create(req.body)
            .then((ticket) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ticket);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /tickets');
    })
    .delete((req, res, next) => {
        res.end('Delet operation not Possible');
    });

ticketRouter.route('/:ticketId')
    .get((req, res, next) => {
        Tickets.findById(req.params.ticketId)
            .then((ticket) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ticket);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('Post operation not supported on /tickets/' + req.params.ticketId);
    })
    .put((req, res, next) => {
        Tickets.findByIdAndUpdate(req.params.ticketId, {
                $set: req.body
            }, {
                new: true
            })
            .then((ticket) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ticket);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Tickets.findByIdAndRemove(req.params.ticketId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err))
    });

//Comments EndPoint 

ticketRouter.route('/:ticketId/comments')
    .get((req, res, next) => {
        Tickets.findById(req.params.ticketId)
            .then((ticket) => {
                if (ticket !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(ticket.comments);
                } else {
                    err = new Error('Ticket ' + req.params.ticketId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Tickets.findById(req.params.ticketId)
            .then((ticket) => {
                if (ticket !== null) {
                    ticket.comments.push(req.body);
                    ticket.save()
                        .then((ticket) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(ticket);
                        }, (err) => next(err));
                } else {
                    err = new Error('Ticket ' + req.params.ticketId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    ticketRouter.route('/:ticketId/comments/:commentId')
    .get((req,res,next) => {
        Tickets.findById(req.params.ticketId)
        .then((ticket) =>{
            if(ticket !== null && ticket.comments.id(req.params.commentId) !== null) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ticket.comments.id(req.params.commentId));
            }
            else if (ticket == null){
                err = new Error('Ticket ' +req.params.ticketId+ ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' +req.params.commentId+ ' not found');
                err.status = 404;
                return next(err); 
            }
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put((req,res,next) =>{
        Tickets.findById(req.params.ticketId)
        .then((ticket) =>{
            if(ticket !== null && ticket.comments.id(req.params.commentId) !== null){
                if(req.body.comment){
                    ticket.comments.id(req.params.commentId).comment = req.body.comment;
                    //ticket.comments.id(req.params.commentId).author = req.body.author;
                    // find a way to auto populate the author
                }
                if(req.body.image){
                    ticket.comments.id(req.params.commentId).image = req.body.image; 
                }
                ticket.save()
                .then((ticket) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(ticket);
                }, (err) => next(err));
            }
            else if(ticket == null) {
                err = new Error('Ticket ' +req.params.ticketId+ ' not found');
                err.status = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' +req.params.commentId+ ' not found');
                err.status = 404;
                return next(err);    
            }
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req,res,next) =>{
        Tickets.findById(req.params.ticketId)
        .then((ticket) =>{
            if(ticket !== null && ticket.comments.id(req.params.commentId) !== null){
                ticket.comments.id(req.params.commentId).remove();
                ticket.save()
                .then((ticket) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(ticket);
                }, (err) => next(err));
            }
            else if (ticket == null) {
                err = new Error('Ticket ' +req.params.ticketId+ ' not found');
                err.status = 404;
                return next(err); 
            }
            else {
                err = new Error('Comment ' +req.params.commentId+ ' not found');
                err.status = 404;
                return next(err); 
            }
        }, (err) => next(err))
        .catch((err) => next(err));
    });

module.exports = ticketRouter;