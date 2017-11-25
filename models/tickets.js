const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const autoNumber = require('mongoose-auto-number');

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counters = mongoose.model('counter', CounterSchema);


/*
var connection = mongoose.createConnection("mongodb://localhost:27017/trackerServer");
autoNumber.init(connection); */

var commentSchema = new Schema({
    comment: {
        type: String, 
        required: true
    }, 
    author: {
        type: String, 
        required: true
    }, 
    image: {
        type: String
    }
}, 
{
    timestamps: true
});

var ticketSchema = new Schema({
     ticketNumber: {
        type: Number
    },
    project: {
        type: String, 
        required: true
    }, 
    createdBy: {
        type: String, 
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    }, 
    category: {
        type: String, 
        required: true
    }, 
    priority: {
        type: String
    }, 
    status: {
        type: String, 
        required: true
    }, 
    lastUpdatedBy: {
        type: String, 
        required: true
    }, 
    comments: [commentSchema]
}, 
{
    timestamps: true
});


ticketSchema.pre('save', function(next) {
    var doc = this;
    counters.findByIdAndUpdate({_id: 'ticketId'}, {$inc: { seq: 1} }, function(error, counters)   {
        if(error)
            return next(error);
        doc.ticketNumber = counters.seq;
        next();
    })
});

var Tickets = mongoose.model('Ticket', ticketSchema);

module.exports = Tickets;