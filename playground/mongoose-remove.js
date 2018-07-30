const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// removes all
// Todo.remove({}).then((result) => {
//   console.log(result)
// })

// Todo.findOneAndRemove()
Todo.findOneAndRemove({ _id:'5b5f8525b7d386c032421f77'}).then((todo) => {
  console.log(todo)
})

// Todo.findByIdAndRemove()
Todo.findByIdAndRemove('5b5f8525b7d386c032421f77').then((todo) => {
  console.log(todo)
})



