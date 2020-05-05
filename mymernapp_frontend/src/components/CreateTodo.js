import React, {Component} from 'react'
import axios from 'axios'

class CreateTodo extends Component {
    constructor(props){
        super(props)
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    handleChange = (event) =>{
        var {name, value} = event.target
           this.setState({
               [name]: value
           })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:')
        console.table([this.state])
        
        const newTodo = this.state

        axios.post('http://localhost:4000/todos/add',newTodo)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            if(err.response){
                console.log('error occured')
            }
        })

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }
    render(){
        const {todo_description,todo_responsible,todo_priority} = this.state
        return(
          <div style ={{marginTop: 20}} className="container">
              <h3 className="text-center">Create New Todo</h3>
              <form onSubmit = {this.handleSubmit}>
                  <div className="form-group">
                      <label>Description:</label>
                      <input name="todo_description" type ="text" onChange={this.handleChange} value = {todo_description} className="form-control"/>
                  </div>
                  <div className="form-group">
                      <label>Responsible:</label>
                      <input name="todo_responsible" type = "text" onChange={this.handleChange} value = {todo_responsible} className="form-control"/>
                  </div>
                  <div className="form-group">
                      <div className="form-check form-check-inline">
                         <input className="form-check-input" type="radio" name="todo_priority" id="priorityLow" 
                         value="Low" checked={todo_priority === 'Low'} onChange={this.handleChange} />
                         <label className="form-check-label" htmlFor="priorityLow">Low</label>
                      </div>
                      <div className="form-check form-check-inline">
                         <input className="form-check-input" type="radio" name="todo_priority" id="priorityMedium" 
                         value="Medium" checked={todo_priority === 'Medium'} onChange={this.handleChange} />
                         <label className="form-check-label" htmlFor="priorityMedium">Medium</label>
                      </div>
                      <div className="form-check form-check-inline">
                         <input className="form-check-input" type="radio" name="todo_priority" id="priorityHigh" 
                         value="High" checked={todo_priority === 'High'} onChange={this.handleChange} />
                         <label className="form-check-label" htmlFor="priorityHigh">High</label>
                      </div>
                  </div>
                  <div className="form-group">
                      <input type= "submit" value="Create Todo" className="btn btn-primary" />
                  </div>
              </form>
          </div>
        )
    }
}

export default CreateTodo