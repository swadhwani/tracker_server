const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userProjectSchema = Schema({
    name: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

var userSchema = new Schema({
    username:{
        type: String,
        required: true, 
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String, 
        required: true
    },
    admin: {
        type: Boolean, 
        default: false
    },
    email: {
        type: String,
        required: true
    }, 
    projects: [userProjectSchema]

},{
    timestamps: true
});

var Users = mongoose.model('User', userSchema); 

module.exports = Users;