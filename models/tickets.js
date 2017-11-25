const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*const autoNumber = require('mongoose-auto-number');

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
    /*ticketNumber: {
        type: Number, 
        autoIncrement: true
    }, */
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

//ticketSchema.plugin(autoNumber.plugin, 'Ticket');

var Tickets = mongoose.model('Ticket', ticketSchema);

module.exports = Tickets;