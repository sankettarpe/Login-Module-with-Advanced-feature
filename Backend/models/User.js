const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type: String, 
        required : true, 
        unique : true,
    },
    password : {
        type: String,
        required : true
    }, 
    mobile : {
        type: String,
    },
},
    {
        timestamps : true,
    }
);

module.exports = mongoose.model('User', userSchema);

// This file defines a Mongoose schema for the User model. The schema includes fields for name, email, password, and mobile number. The email field is marked as unique to ensure that no two users can have the same email address. The schema also includes timestamps, which automatically add createdAt and updatedAt fields to the documents. Finally, the User model is exported for use in other parts of the application.