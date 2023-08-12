import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Router from './src/Navigation/Router';
import store from './src/Redux/store';
import {Immersive} from 'react-native-immersive';

const App = () => {
  useEffect(() => {
    Immersive.setImmersive(true);
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
};

export default App;
