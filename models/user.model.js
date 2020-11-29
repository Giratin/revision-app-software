const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        image: {
            type: String
        }
    },{
       timestamps: true 
    }
);
// createAt updatedAt

//users
const User = mongoose.model('user', userSchema);

module.exports = { User }