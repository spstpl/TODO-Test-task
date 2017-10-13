import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import classNames from 'classnames'

//const List = ({ id, name, isLast, showTodos }) => 
class List extends React.Component {


  todoTasks(id) {

    this.props.showTodos(id)
    // browserHistory.push('/lists/1');
    this.context.router.push('/lists/' + id)

  }
    static contextTypes = {
    router: PropTypes.object,
  };

 
  
  render(){
    const listClass = classNames(
      'ph3 pv3 pointer bg-animate hover-bg-light-gray',
      {
        'bb b--light-silver': !this.props.isLast
      }
    )
    return (
      <li className={listClass} onClick={ () => this.todoTasks(this.props.id)}> {this.props.name} </li>
    )
  }
}

List.propTypes = {
  name: PropTypes.string,
  isLast: PropTypes.bool
}

export default List
