import React, {Component} from 'react'
import axios from 'axios'

class EditTodo extends Component {
    constructor(props){
        super(props)
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/todos/'+ this.props.match.params.id)
        .then(res => {
            this.setState({
                todo_description: res.data.todo_description,
                todo_responsible: res.data.todo_responsible,
                todo_priority: res.data.todo_priority,
                todo_completed: res.data.todo_completed
            })
            console.log([this.state])
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) =>{
        var {name, value,type,checked} = event.target
           type === 'checkbox' ? this.setState({
                [name]: checked
           }) : this.setState({
               [name]: value
           })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:')

        const updateTodo = this.state

        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, updateTodo)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            if(err.response){
                console.log(err.response.data)
            }
        })

        this.props.history.push('/')

    }
    
    render(){
        const {todo_description,todo_responsible,todo_priority,todo_completed} = this.state
        return(
          <div style ={{marginTop: 20}} className="container">
              <h3 className="text-center">Update Todo</h3>
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
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="todo_completed" id="completed"
                           onChange={this.handleChange} checked ={todo_completed === true} value={todo_completed} />
                           <label className="form-check-label" htmlFor="completed">Completed</label>
                      </div>
                  </div>
                  <div className="form-group">
                      <input type= "submit" value="Update Todo" className="btn btn-primary" />
                  </div>
              </form>
          </div>
        )
    }
}

export default EditTodo