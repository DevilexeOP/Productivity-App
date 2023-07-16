/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

// Importing Reducers
import AddNoteReducer from '../Reducers/AddNoteReducer';
import ToDoReducer from '../Reducers/AddTodoReducer';

const reducers = combineReducers({
  addNote: AddNoteReducer,
  addTodo: ToDoReducer,
});

export default reducers;
