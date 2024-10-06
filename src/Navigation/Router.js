import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AppRoute from './AppRoute.js';
import AuthRoute from './AuthRoute.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();

const Router = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      if (jwt) {
        setToken(jwt); 
      }
    } catch (e) {
      console.log('Failed to fetch token', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
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
