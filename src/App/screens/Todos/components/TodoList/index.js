import React, { PropTypes } from 'react'

import Todo from '../Todo'

const sortByDate = (arr) => arr.sort((a, b) => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.createdAt) - new Date(a.createdAt)
})

const TodoList = ({ todos, toggleTodo, selectedOption,id_of_list }) => {
  
  todos = todos.filter(function( obj ) {
      return obj.id_of_list == id_of_list;
    });

  const sortedTodos = todos && todos[0] ? sortByDate(todos) : null

  if(selectedOption === 'CompletedTodos'){
    todos = todos.filter(function( obj ) {
      return obj.completed == true && obj.id_of_list == id_of_list;
    });
  }

  if(selectedOption === 'InProgressTodos'){
    todos = todos.filter(function( obj ) {
        return obj.completed == false && obj.id_of_list == id_of_list;
    });
  }

  return (
    <ul className='list pl0 ml0 center mw6 ba b--light-silver br2'>
      {sortedTodos
        ? todos.map((todo, i) =>
          <Todo
            key={i}
            {...todo}
            toggle={() => toggleTodo(todo, !todo.completed)}
            isLast={(todos.length - 1) === i}
          />
        )
        : <p className='ph3 pv3 tc'>No todos found</p>
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array
}

export default TodoList
