const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 4000
const todoRoutes = express.Router()

mongoose.Promise = global.Promise

let Todo = require('./todo.model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', function(){
    console.log("Mongodb database connection established successfully")
}) 

todoRoutes.route('/').get((req,res) => {
    Todo.find((err, todos) => {
        if(err){
            console.log(err)
        } else {
            res.json(todos)
        }
    })
})

todoRoutes.route('/:id').get((req,res) => {
    let id = req.params.id
    Todo.findById(id, (err,todo) => {
        res.json(todo)
    })
})

todoRoutes.route('/add').post((req,res) => {
     let todo = new Todo(req.body)
     todo.save()
         .then( todo => {
             res.status(200).json({'todo': 'todo added successfully'})
         })
         .catch(err => {
             res.status(400).send('adding new todo failed')
         })
})

todoRoutes.route('/update/:id').post((req,res) => {
    const {todo_description, todo_responsible, todo_completed, todo_priority} = req.body
    Todo.findById(req.params.id, (err, todo)=> {
        if(!todo)
           res.status(404).send('data is not found')
        else{
        todo.todo_description = todo_description
        todo.todo_responsible = todo_responsible
        todo.todo_priority = todo_priority
        todo.todo_completed = todo_completed

        todo.save().then(todo => {
            res.json('Todo updated')
        })
        .catch(err => {
            res.status(400).send('update not possible')
        })
        } 
    })
})
app.use('/todos', todoRoutes)

app.listen(PORT, function(){
    console.log('Server is running on Port: '+ PORT)
})