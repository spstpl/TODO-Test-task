import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import { Field, reduxForm } from 'redux-form'

import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

class Todos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption:'AllTodos'
    };
  }

  handleOptionChange = (e) => { 
  this.setState({
    selectedOption: e.target.value
  });
  }

  handleFormSubmit = (e) => { 
  e.preventDefault();

  console.log('You have selected:', this.state.selectedOption);
  }

  render(){
    return (
      <section className='pa3 pa5-ns'>
        <AddTodo onSubmit={({todo}, _, {reset}) => {
          this.props.addTodo(todo,this.props.params.id)
          reset()
        }} />

        <form onSubmit={this.handleFormSubmit}>
        <div className="radio">
          <label>
            <input type="radio" checked={this.state.selectedOption === 'AllTodos'} onChange={this.handleOptionChange} value="AllTodos"  />
            All Todos
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" checked={this.state.selectedOption === 'CompletedTodos'} onChange={this.handleOptionChange} value="CompletedTodos" />
            Completed Todos
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" checked={this.state.selectedOption === 'InProgressTodos'} onChange={this.handleOptionChange} value="InProgressTodos" />
            In-progress Todos
          </label>
        </div>
        <div>
          <button className="btn btn-default" type="submit">Create new List</button>
        </div>
      </form>

      <h1 className='f4 bold center mw6'>All Todos</h1>
      <TodoList todos={this.props.todos} toggleTodo={this.props.toggleTodo} selectedOption={this.state.selectedOption} id_of_list={this.props.params.id}/>
    </section>
    )
  } 
}

Todos.propTypes = {
  todos: PropTypes.array
}

export default connect(
  state => ({
    todos: getEntities('todos')(state)
  }),
  dispatch => ({
    addTodo: (text,id_of_list) => dispatch(actions.submitEntity({ text,id_of_list }, {type: 'todos'})),
    toggleTodo: (todo, completed) => dispatch(actions.updateEntity({ ...todo, completed }, {type: 'todos'}))
  })
)(Todos)
