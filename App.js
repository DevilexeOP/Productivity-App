import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Router from './src/navigation/Router';
import {store, persistor} from './src/redux/store';
import {Immersive} from 'react-native-immersive';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  useEffect(() => {
    Immersive.setImmersive(true);
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
