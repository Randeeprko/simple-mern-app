import React, {Component} from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'

const Todo = (props) => {
        return(
            <tr>
              <td className={props.todo.todo_completed ? 'completed': ''}>{props.todo.todo_description}</td>
              <td className={props.todo.todo_completed ? 'completed': ''}>{props.todo.todo_responsible}</td>
              <td className= {props.todo.todo_completed ? 'completed': ''}>{props.todo.todo_priority}</td>
              <td>
                  <Link to = {'/edit/'+ props.todo._id} >Edit </Link>
              </td>
            </tr>
        )
}
class TodosList extends Component {
    _isMounted = false

    constructor(props){
        super(props)
        this.state ={
            todos: []
        }
    }
    
    componentDidMount(){
        this._isMounted= true
        axios.get('http://localhost:4000/todos')
        .then(res => {
            if(this._isMounted){
            this.setState({todos: res.data})
            console.log(res.data) }
        })
        .catch(err => console.log(err))
        .finally(() => console.log('mounted'))
    }

    componentWillUnmount(){
        this._isMounted = false
    }


    todoList = () => {
        return this.state.todos.map( (currentTodo,i) => {
            return(
                <Todo todo = {currentTodo} key={i} />
            )
        })
    }
    render(){
        return(
          <div className="container">
               <h3 className="text text-center text-primary">Todos List</h3>
               <table className="table table-striped" style={{marginTop: 20}}>
                   <thead>
                       <tr>
                           <th>Description</th>
                           <th>Responsibility</th>
                           <th>Priority</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       {this.todoList()}
                   </tbody>
               </table>
          </div>
        )
    }
}

export default TodosList