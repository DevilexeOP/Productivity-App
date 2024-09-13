import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();


const Router = () => {

  useEffect(() => {
    fetchToken();
  }, []);

  const [token, setToken] = useState('');

  const fetchToken = async () => {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      setToken(jwt);
    }
  };

  return (
    <NavigationContainer >
      {/*{token ? <AppRoute /> : <AuthRoute />}*/}
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
            <RootStack.Screen name="App" component={AppRoute} />
        ) : (
            <RootStack.Screen name="Auth" component={AuthRoute} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
