const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

const {ObjectID} = require('mongodb')

var id = '5b561b9e98b661a837178ddd'

if(!ObjectID.isValid(id)) {
  console.log('ID not valid')
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ',todos)
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// })

Todo.findById(id).then((todo)=> {
  console.log('Todo by ID: ', todo)
}).catch((e) => {
  console.error(e)
})