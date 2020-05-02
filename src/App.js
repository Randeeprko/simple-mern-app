import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CreateTodo from './components/CreateTodo'
import EditTodo from './components/EditTodo'
import TodosList from './components/TodosList'
import logo from './logo.svg'

class App extends Component {
  render(){
     return (
       <Router>
        <div className = "container">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <a className="navbar-brand" href="http://codingthesmartway.com" target="_blank" rel='noopener noreferrer'>
             <img src={logo} width= '30' height = '30' alt = 'CodingTheSmartWay.com'/> 
           </a>
           <Link to ='/' className="navbar-brand">MERN-Stack Todo App</Link>
           <div className="collapse navbar-collapse">
             <ul className="navbar-nav mr-auto">
               <li className="navbar-item">
                 <Link to='/' className="nav-link">Todos</Link>
               </li>
               <li className="navbar-item">
                 <Link to='/create' className="nav-link">Create Todo</Link>
               </li>


             </ul>
           </div>
         </nav>
        </div>
        <Route exact path = '/' component = {TodosList} />
        <Route path = '/edit/:id' component = {EditTodo} />
        <Route path = '/create' component = {CreateTodo} />  
      </Router>
     );
  }
}

export default App;
