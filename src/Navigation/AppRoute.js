import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//Splash Screen
import SplashScreen from '../Components/OnBoard/Splash';
// Components
import HomeScreen from '../Components/Home';
import TodoScreen from '../Components/Todo';
import AddNotes from '../Components/AddNotes';
import NotesScreen from '../Components/Notes.js';
import AddTodos from '../Components/AddTodos';
import UpdateTodos from '../Components/UpdateTodos';
import UpdateNotes from '../Components/UpdateNotes';

const AppStack = createStackNavigator();

const AppRoute = () => {
  return (
    <AppStack.Navigator initialRouteName="SplashScreen">
      <AppStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="Todo"
        component={TodoScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="AddTodo"
        component={AddTodos}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="UpdateTodo"
        component={UpdateTodos}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="UpdateNotes"
        component={UpdateNotes}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export default AppRoute;
