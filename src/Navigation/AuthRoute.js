import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Splash Screen
import SplashScreen from '../components/onboard/Splash';
// OnBoarding Screens
import OnBoarding from '../components/onboard/OnBoarding';
import Register from '../components/onboard/Register';
import Login from '../components/onboard/Login';
// Animation Screens
import LoginSuccess from '../components/onboard/AnimatedScreens/LoginSuccess';
import LoginFailed from '../components/onboard/AnimatedScreens/LoginFail';
import RegisterSuccess from '../components/onboard/AnimatedScreens/RegisterSuccess';
import RegisterFailed from '../components/onboard/AnimatedScreens/RegisterFailed';
import BottomRoute from './bottomRouter/BottomRoute';
import ProfileHome from '../components/profilespace/ProfileHome';

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
        name="Profile"
        component={ProfileHome}
        options={{
          headerShown: false,
        }}
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
