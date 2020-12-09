import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTodoAC } from "../store/actions";
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { nanoid } from 'nanoid'
import { thunkGetTasksfromDb } from "../store/actions";
import { thunkAddTask } from "../store/actions";
import { pulse } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { errorAC } from "../store/actions";

const Bounce = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

const divStyle = {
  WebkitTransition: 'all',
  msTransition: 'all',
  alignItems: 'center',
  height: '180px',
};

function FormFunc() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('')
  let taskNameDuplicateErrorId = nanoid()
  let getTasksfromDbErrorId = nanoid()
  const todos = useSelector((store) => store);

  const onSubmitHandler = (event) => { 
  event.preventDefault(event)
  
    try {
    let currentTask = {
      id: /* Math.floor(Math.random() * 100000) */nanoid(),
      name: input,
      status: false,
      edit: false,
      isLoaded: false, 
      message: ''
    }

    let condition = todos.every(elem => elem.name !== input);

        if (condition) {
    
          dispatch(addTodoAC(currentTask));
          
          setInput('')

          dispatch(thunkAddTask(currentTask));
          
          } else {
          throw new Error(["This task name already exists"]);
        }
      } catch (e) {
      console.log('Error message:', { id: taskNameDuplicateErrorId, message: e.message, status: false, isLoaded: true } );
      dispatch(errorAC({ id: taskNameDuplicateErrorId, message: e.message, status: false, isLoaded: true }))
      }
  }

  async function getTasksfromDb() {

    let currentTask = {
      id: nanoid(),
      name: 'test',
      status: false,
      edit: false,
      isLoaded: false, 
      message: ''
    }

    dispatch(addTodoAC(currentTask));  

    dispatch(thunkGetTasksfromDb()); 
  
    };

  return (
    <Container style={divStyle}>
      <Bounce >
        <h2>To Do App</h2>
      </Bounce>
  <Form onSubmit={onSubmitHandler}>
  <Form.Group controlId="formBasicEmail">
  <Form.Control placeholder="Enter task name here" onChange={(event) => setInput(event.target.value)}
          name="name"
          type="text"
          value={input} className="text-muted" />
  <Form.Text  >
  </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
            Add task
  </Button>{' '}
  <Button variant="primary" onClick={getTasksfromDb}  >
            See all tasks
  </Button>
  </Form>
    </Container>
  );
}

export default FormFunc;
