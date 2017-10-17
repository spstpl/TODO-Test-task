import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actions from 'App/stores/resources/actions'
import { getEntities } from 'App/stores/resources'

import { Field, reduxForm } from 'redux-form'

import AddList from './components/AddList'
import ListList from './components/ListList'

class Lists extends React.Component {

  render(){

   let len_of_lists = this.props.lists.length

    return (
      <section className='pa3 pa5-ns'>
        <AddList  onSubmit={({list}, _, {reset}) => {
          this.props.addList(list,len_of_lists)
          reset()
        }} />

      <h1 className='f4 bold center mw6'>All Lists</h1>
      <ListList lists={this.props.lists} showTodos={this.props.showTodos}/>
    </section>
    )
  } 
}

Lists.propTypes = {
  lists: PropTypes.array
}

export default connect(
  state => ({
    lists: getEntities('lists')(state)
  }),
  dispatch => ({
    addList: (name,len_of_lists) => dispatch(actions.submitEntity({ name,len_of_lists }, {type: 'lists'})),
    showTodos: (list) => dispatch(actions.fetchEntity({ list }, {type: 'todos'}))
  })
)(Lists)
