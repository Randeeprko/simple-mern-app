const mongoose =  require('mongoose')

const schema = {
      todo_description: {
          type: String
      },
      todo_responsible: {
          type: String
      },
      todo_priority: {
          type: String
      },
      todo_completed : {
          type: Boolean
      }
}
let todoSchema = mongoose.Schema(schema, {collection: 'Todo'})

module.exports = mongoose.model('Todo', todoSchema)