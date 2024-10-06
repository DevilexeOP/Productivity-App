import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import reducers from './reducers';

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['spaceData', 'channelData', 'addNote', 'addTodo'],
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Create Store & persistor
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
