import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { editTodoAC } from "../store/actions";
import { useDispatch } from "react-redux";
import { thunkDeleteTask } from "../store/actions";
import { delTodoAC } from "../store/actions";
import { doneTodoAC } from "../store/actions";
import { thunkChangeStatus } from "../store/actions";
import { errorAC } from "../store/actions";
import styled, { keyframes } from 'styled-components';
import { bounce} from 'react-animations';
import { flash} from 'react-animations';
import { headShake} from 'react-animations';
import { hinge} from 'react-animations';
import { pulse} from 'react-animations';
import { zoomIn } from 'react-animations';
import Image from 'react-random-image'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { nanoid } from 'nanoid'

const Hinge = styled.div`animation: 2s ${keyframes`${headShake}`} infinite`;
const Bounce = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

const divStyle = {
  WebkitTransition: 'all',
  msTransition: 'all',
  height: '100px',
};

const errStyle = {
  WebkitTransition: 'all',
  msTransition: 'all',
  fontSize: '20px',
  color: 'red'
};

const taskStyle = {
  WebkitTransition: 'all',
  msTransition: 'all',
  height: '100px',
};

const TasksList = () => {
  const todos = useSelector((store) => store);
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  let taskNameDuplicateErrorId = nanoid()

  const saveNewTask = async (id, name) => {
    try {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {

        let condition = todos.every(elem => elem.name !== name);

        if (condition) {
          
        todos[i].name = name;
        todos[i].edit = false;
        todos[i].message = '';
        dispatch(editTodoAC(todos[i]));

       await fetch(`http://localhost:3100/task/edit`, {
       method: 'POST',
       headers: {
      'Content-Type': 'application/json'
       },
        body: JSON.stringify(todos[i]),
       });
        } else {
          throw new Error(["This task name already exists"]);
        }
      } 
    }
    } catch (e) {
      console.log('Error message:', { id: taskNameDuplicateErrorId, message: e.message, status: false, isLoaded: true } );
      dispatch(errorAC({ id: taskNameDuplicateErrorId, message: e.message, status: false, isLoaded: true }))
      }
  };

  const changeStatus = async (id) => {
    let currentTask;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        // todos[i].status = !todos[i].status
        currentTask = todos[i]
        // dispatch(doneTodoAC(todos[i]));
      }
    }
    dispatch(thunkChangeStatus(currentTask));
  }

  const deleteTask = async (id) => {
    let currentTask 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
      currentTask = todos[i]
        
      // todos.splice(i, 1);
      // dispatch(delTodoAC(todos));
      }
    }
      dispatch(thunkDeleteTask(currentTask));
  }

  const editTask = (id) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        todos[i].edit = true;
      } 
    }
    dispatch(editTodoAC(todos));
  };

  return (
    <Container style={divStyle}>
      {console.log('todos!!!!!!!!', todos)}
      <h3>{todos.length !== 0 && todos.map((el) => {
        
        return el.message === '' ? 
        el.name !== 'test' ?
        el.status === false ?
          (<Bounce key={el.id}>
            <div style={taskStyle} key={el.id}>
                {!el.isLoaded ?
                  <Loader key={el.id} type="ThreeDots" color="#00BFFF" height={80} width={80} /> :

                  <div style={taskStyle} key={el.id}>
                    <Image width={50} height={50} />{' '}
                    {el.name}{' '}
                    <Button onClick={() => changeStatus(el.id)} variant="primary">Resolve task
              </Button>{' '}
                    <Button onClick={() => deleteTask(el.id)} variant="primary">Delete
              </Button>{' '}
                    <Button onClick={() => editTask(el.id)} variant="primary">Edit
              </Button>
                  </div>
                }
            </div>
          </Bounce>) :
          (<Hinge key={el.id}>
            <div style={taskStyle} key={el.id}>
                {
              !el.isLoaded ?
                    <Loader key={el.id} type="ThreeDots" color="#00BFFF" height={80} width={80} /> : 
              <div style={taskStyle} key={el.id}>      
              <s>{el.name}</s>{' '}
              <Button onClick={() => changeStatus(el.id)} variant="primary">Resolve task
              </Button>{' '}
              <Button onClick={() => deleteTask(el.id)} variant="primary">Delete
              </Button>{' '}
              <Button onClick={() => editTask(el.id)} variant="primary">Edit
              </Button>{' '}
              </div>
              }
            </div>
          </Hinge>)
            : <Loader key={el.id} type="ThreeDots" color="#00BFFF" height={80} width={80} />
          :
          <div style={errStyle} key={el.id}>
            {el.message}
          </div>
          }
      )}{' '}
        
      </h3>
      
      {todos.length !== 0 && todos.map((el) => {
           
        return el.edit === true ? (
          <InputGroup key={el.id} className="mb-3" >
          <FormControl 
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter new task name"
          aria-label="Enter new task name"
          aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
          <Button onClick={() => saveNewTask(el.id, input)} variant="primary">Save new task name</Button>
          </InputGroup.Append>
          </InputGroup>
          ) : ''})}
        
    </Container>
  );
}

export default TasksList
