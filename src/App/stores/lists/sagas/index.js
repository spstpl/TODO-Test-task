import { put, fork, call, take } from 'redux-saga/effects'

import { normalize } from 'normalizr'

import api from 'config/api'

import * as actions from 'App/stores/resources/actions'
import t from 'App/stores/resources/actions/constants'

import * as schema from '../schema'

/*
 * Subroutines
 */

export function* receiveResponse (response) {
  if (response.ok) {
    const list = normalize(response.data.list, schema.list)

    yield put(actions.setEntity(list, {type: 'lists'}))
  } else {
    const error = response.data.error

    yield put(actions.requestFailure(error, {type: 'lists'}))
  }
}

export function* addList () {
  while (true) {
    const action = yield take(t.SUBMIT_ENTITY)
    if (action.meta && action.meta.type === 'lists') {
      console.log("scacsascascscasca", action.payload)
      const list = {
        ...action.payload,
        listID: 1 // Change this to support multiple lists
      }

      const response = yield call(api.post, '/lists', {...list})

      yield fork(receiveResponse, response)
    }
  }
}

export function* showTodos () {
  while (true) {
    const action = yield take(t.FETCH_ENTITY)      
    if (action.meta && action.meta.type === 'lists') { 
      const list = action.payload
        console.log("from list toggle", list)
      const response = yield call(api.get, `/lists/${list.id}`, {...list})

      yield fork(receiveResponse, response)
    }
  }
}



/*
 * Watchers
 */

export default function* watchLists () {
  yield [
    fork(addList),
    fork(showTodos)
  ]
}
