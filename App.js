import React, {useEffect} from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import Router from './src/navigation/Router';
import {store, persistor} from './src/redux/store';
import {Immersive} from 'react-native-immersive';
import {PersistGate} from 'redux-persist/integration/react';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = {fontFamily: 'PoppinsRegular'};

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = {fontFamily: 'PoppinsRegular'}; // Replace with your font family name

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
    </>
  );
};

export default App;
