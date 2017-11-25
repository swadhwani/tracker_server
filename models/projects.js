const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var memberSchema = new Schema({
    username: {
        type: String, 
        required: true
    }
});

var projectSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    }, 
    defaultUser: {
        type: String
    }, 
    members: [memberSchema]
}, {
    timestamps: true
});

var Projects = mongoose.model('Project', projectSchema); 

module.exports = Projects;