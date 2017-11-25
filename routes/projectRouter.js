const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Projects = require('../models/projects');

const projectRouter = express.Router();

projectRouter.use(bodyParser.json());

projectRouter.route('/')
.get((req,res,next)=> { 
    Projects.find({})
    .then((projects) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(projects);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=> { 
    Projects.create(req.body)
    .then((project) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( (req,res,next)=> { 
    res.statusCode = 403;
    res.end('Put operation not supported on /projects');
})
.delete((req,res,next)=> { 
    res.statusCode = 403;
    res.end('Deleting not supported');
});

projectRouter.route('/:projectId')
.get((req,res,next)=> {
    Projects.findById(req.params.projectId)
    .then((project) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=> { 
    res.statusCode = 403;
    res.end('Post operation not supported on /proejcts/' + req.params.projectId);
})
.put( (req,res,next)=> { 
    Projects.findByIdAndUpdate(req.params.projectId,  {
        $set: req.body
    }, { new: true })
    .then((project) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next)=> { 
    Projects.findByIdAndRemove(req.params.projectId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = projectRouter;