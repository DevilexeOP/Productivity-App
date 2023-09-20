import {combineReducers} from 'redux';

// Importing Reducers
import AddNoteReducer from '../Reducers/AddNoteReducer';
import ToDoReducer from '../Reducers/AddTodoReducer';
import UserReducer from '../Reducers/UserReducer';
import WorkSpaceReducer from "../Reducers/AddWorkSpaceReducer"
import ChannelReducer from "../Reducers/AddChannelReducer"
import MessageReducer from "../Reducers/SendMessageReducer"
import WorkSpaces from "../Reducers/AllSpacesReducer"

const reducers = combineReducers({
  addNote: AddNoteReducer,
  addTodo: ToDoReducer,
  user: UserReducer,
  workspace:WorkSpaceReducer,
  channel:ChannelReducer,
  message:MessageReducer,
  spaces:WorkSpaces
});

export default reducers;
