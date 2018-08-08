const mongoose = require('mongoose');
const _ = require('lodash')

const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObj = user.toObject()

  return _.pick(userObj, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth'
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()
  
  user.tokens = user.tokens.concat([{access, token}])

  return user.save().then(() => {
    return token
  })
}

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  })
}

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    return Promise.reject()
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  
  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject()
    }
    return new Promise((resolve, reject) => {
      // user input password, previous hashed password
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          return resolve(user)
        } else {
          reject()
        }
      })
    })
  })
}

UserSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

var User =mongoose.model('User', UserSchema)

module.exports = {
    User
}