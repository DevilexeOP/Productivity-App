import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Splash Screen
import SplashScreen from '../Components/OnBoard/Splash';
// OnBoarding Screens
import OnBoarding from '../Components/OnBoard/OnBoarding';
import Register from '../Components/OnBoard/Register';
import Login from '../Components/OnBoard/Login';
//Components
import HomeScreen from '../Components/Home';
import TodoScreen from '../Components/Todo';
import AddNotes from '../Components/AddNotes';
import NotesScreen from '../Components/Notes.js';
import AddTodos from '../Components/AddTodos';
import UpdateTodos from '../Components/UpdateTodos';
import UpdateNotes from '../Components/UpdateNotes';
// Animation Screens
import RegisterSuccess from '../Components/OnBoard/Animations/RegisterSuccess';
import RegisterFailed from '../Components/OnBoard/Animations/RegisterFailed';
import LoginSuccess from '../Components/OnBoard/Animations/LoginSuccess';
import LoginFailed from '../Components/OnBoard/Animations/LoginFail';

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
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Todo"
        component={TodoScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AddTodo"
        component={AddTodos}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="UpdateTodo"
        component={UpdateTodos}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="UpdateNotes"
        component={UpdateNotes}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
