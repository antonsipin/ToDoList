import { LOAD, ADD_TODO, DONE_TODO, DEL_TODO, EDIT_TODO, ADD_ALL_TODOS, DEL_TEST, ERROR } from './types'

const initialState = []

export const reducers = (state = initialState, action) => {
  switch (action.type) {

    case ADD_TODO:
      return [...state, action.payload].filter(item => item.message !== 'This task name already exists');
    
    case DONE_TODO:
      return [...action.payload].filter(item => item.message !== 'This task name already exists');

    case DEL_TODO:
      return [...action.payload].filter(item => item.message !== 'This task name already exists');
    
    case EDIT_TODO:
      return [...state].filter(item => item.message !== 'This task name already exists');
    
    case ADD_ALL_TODOS:
      return [...state, ...action.payload];
    
    case DEL_TEST:
      return [...action.payload].filter(item => item.name !== 'test');
    
    case LOAD:
      return [ ...state, action.payload ].filter(item => item.isLoaded !== false);
    
    case ERROR:
      return [...state, action.payload];

    default:
      return state;
  }
};
