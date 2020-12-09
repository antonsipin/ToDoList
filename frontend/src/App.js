import './App.css';
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import FormFunc from './components/Form'
import TasksList from './components/TasksList'

function App() {

  return (
    <Provider store={store}>
      <FormFunc />
      <TasksList />
    </Provider>
  );
}

export default App;
