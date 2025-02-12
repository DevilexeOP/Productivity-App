import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Splash Screen
import SplashScreen from '../Components/OnBoard/Splash';
// OnBoarding Screens
import OnBoarding from '../Components/OnBoard/OnBoarding';
import Register from '../Components/OnBoard/Register';
import Login from '../Components/OnBoard/Login';
// Animation Screens
import LoginSuccess from '../Components/OnBoard/AnimatedScreens/LoginSuccess';
import LoginFailed from '../Components/OnBoard/AnimatedScreens/LoginFail';
import RegisterSuccess from '../Components/OnBoard/AnimatedScreens/RegisterSuccess';
import RegisterFailed from '../Components/OnBoard/AnimatedScreens/RegisterFailed';
import BottomRoute from './BottomRouter/BottomRoute';
import ProfileHome from '../Components/ProfileSpace/ProfileHome';

const AuthStack = createStackNavigator();

const AuthRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName="SplashScreen">
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="OnBoard"
        component={OnBoarding}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="RegisterFail"
        component={RegisterFailed}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginSuccess"
        component={LoginSuccess}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginFail"
        component={LoginFailed}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="BottomStack"
        component={BottomRoute}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
