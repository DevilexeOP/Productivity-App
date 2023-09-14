import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      {token ? <AppRoute /> : <AuthRoute />}
    </NavigationContainer>
  );
};

export default Router;
