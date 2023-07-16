import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Immersive} from 'react-native-immersive';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import Toast from 'react-native-toast-message';

// Screens
import HomeScreen from './src/Components/Home';
import TodoScreen from './src/Components/Todo';
import AddNotes from './src/Components/AddNotes';
import NotesScreen from './src/Components/Notes';
import AddTodos from './src/Components/AddTodos';

const Stack = createStackNavigator();

export default class App extends Component {
  componentDidMount() {
    Immersive.setImmersive(true);
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Notes"
              component={NotesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Todo"
              component={TodoScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddNotes"
              component={AddNotes}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddTodo"
              component={AddTodos}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    );
  }
}
