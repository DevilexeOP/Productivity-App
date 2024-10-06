import {combineReducers} from 'redux';

// Importing Reducers
import AddNoteReducer from '../reducers/AddNoteReducer';
import ToDoReducer from '../reducers/AddTodoReducer';
import UserReducer from '../reducers/UserReducer';
import WorkSpaceReducer from '../reducers/AddWorkSpaceReducer';
import ChannelReducer from '../reducers/AddChannelReducer';
import MessageReducer from '../reducers/SendMessageReducer';
import WorkSpaces from '../reducers/AllSpacesReducer';
import SpaceDatas from '../reducers/WorkspaceDataReducer';
import RetrievedData from '../reducers/RetrieveDataReducer';

const reducers = combineReducers({
  addNote: AddNoteReducer,
  addTodo: ToDoReducer,
  user: UserReducer,
  workspace: WorkSpaceReducer,
  channel: ChannelReducer,
  message: MessageReducer,
  spaces: WorkSpaces,
  data: SpaceDatas,
  retrieved: RetrievedData,
});

export default reducers;
