/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

// Importing Reducers
import AddNoteReducer from '../Reducers/AddNoteReducer';

const reducers = combineReducers({
  addNote: AddNoteReducer,
});

export default reducers;
