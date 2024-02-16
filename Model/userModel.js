const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
        name:{
            type:String,
            required : [true,"Please Enter the name field"]
        },
        email:{
            type:String,
            unique:true,
            required: [true,"Please enter the email"]
        },
        password:{
            type:String,
            minlength:6,
            required:[true,"Please enter the password"]
        },
        address:{
            type:String,
            require : [true , "Please enter the address"]
        }
    
},
{
    timestamps : true,
});

const user = mongoose.model('User',userSchema);

module.exports = user;