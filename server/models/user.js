const mongoose = require('mongoose');
const validator = require('validator');

var User =mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlen: 1,
        unique: true,
        validate: [{
          validator: value => validator.isEmail(value),
          message: '{VALUE} is not a valid email'
        }] 
    },
    password: {
      type: String,
      require: true,
      minlen: 6
    },
    tokens: [{
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }]
})

module.exports = {
    User
}