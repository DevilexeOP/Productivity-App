import {combineReducers} from 'redux';

// Importing Reducers
import AddNoteReducer from '../Reducers/AddNoteReducer';
import ToDoReducer from '../Reducers/AddTodoReducer';
import UserReducer from '../Reducers/UserReducer';

const reducers = combineReducers({
  addNote: AddNoteReducer,
  addTodo: ToDoReducer,
  user: UserReducer,
});

export default reducers;
