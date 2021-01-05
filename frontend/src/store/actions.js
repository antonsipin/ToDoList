import { ADD_TODO, DEL_TODO, DONE_TODO, EDIT_TODO, ADD_ALL_TODOS, DEL_TEST, LOAD, ERROR } from "./types";
import { nanoid } from 'nanoid'

export const addTodoAC = (task) => ({ type: ADD_TODO, payload: task });

export const addAllTodosAC = (task) => ({ type: ADD_ALL_TODOS, payload: task });

export const doneTodoAC = (task) => ({ type: DONE_TODO, payload: task});

export const delTodoAC = (task) => ({ type: DEL_TODO, payload: task });

export const editTodoAC = () => ({ type: EDIT_TODO });

export const delTestAC = (task) => ({ type: DEL_TEST, payload: task });

export const loadAC = (task) => ({ type: LOAD, payload: task });

export const errorAC = (e) => ({ type: ERROR, payload: e });

export const thunkAddTask = (currentTask) => async (dispatch) => { 

  let getTasksfromDbErrorId = nanoid()
  
  try {

    const response = await fetch(`/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentTask),
    });
          
    let task = await response.json();
    dispatch(loadAC(task));
     } catch (err) {
    dispatch(errorAC({ id: getTasksfromDbErrorId, message: '400 Bad Request ', status: false, isLoaded: true }))
  }
}
  
export const thunkGetTasksfromDb = () => async (dispatch) => {
  let getTasksfromDbErrorId = nanoid()

  try {

    const response = await fetch('/task', {
      method: 'GET',
    });
    const task = await response.json();
    dispatch(delTestAC(task));
  } catch (err) {
    dispatch(errorAC({ id: getTasksfromDbErrorId, message: '400 Bad Request ', status: false, isLoaded: true }))
  }
}

export const thunkChangeStatus = (currentTask) => async (dispatch) => {
  let getTasksfromDbErrorId = nanoid()
  
  try {

    const response = await fetch(`/task/changeStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentTask),
    });
    const task = await response.json();
    dispatch(doneTodoAC(task));
  } catch (err) {
    console.log('Error message:', { id: getTasksfromDbErrorId, message: '400 Bad Request ', status: false, isLoaded: true });
    dispatch(errorAC({ id: getTasksfromDbErrorId, message: '400 Bad Request ', status: false, isLoaded: true }))
  }
}

export const thunkDeleteTask = (currentTask) => async (dispatch) => {
  let getTasksfromDbErrorId = nanoid()

  try {

    const response = await fetch(`/task/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentTask),
    });
     
    const task = await response.json();
    dispatch(delTodoAC(task));

  } catch (err) {
    console.log('Error message:', { id: getTasksfromDbErrorId, message: '400 Bad Request ', status: false, isLoaded: true });
    dispatch(errorAC({ id: getTasksfromDbErrorId, message: '400 Bad Request ', status: false, isLoaded: true }))
  }
}
