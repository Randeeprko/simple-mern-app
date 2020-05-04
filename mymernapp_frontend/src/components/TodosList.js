import React, {Component} from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'
class TodosList extends Component {
    constructor(props){
        super(props)
        this.state ={
            todos: []
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:4000/todos')
        .then(res => {
            this.setState({todos: res.data})
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    todoList = () => {
        return this.state.todos.map( item => {
            return(
                <tr key = {item._id}>
                    <td>{item.todo_description}</td>
                    <td>{item.todo_responsible}</td>
                    <td>{item.todo_priority}</td>
                    <td>{""+item.todo_completed}</td>
                </tr>
            )
        })
    }
    render(){
        return(
          <div className="container">
               <h3>Todos List</h3>
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