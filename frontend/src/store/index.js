import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = composeWithDevTools(applyMiddleware(thunkMiddleware)); // импорт reduxDevTools

export const store = createStore(reducers, composeEnhancers,);

window.addEventListener("beforeunload", function (e) {
    console.log('Saved store toDoApp to DB >>>>', store.getState().todos);
  })
