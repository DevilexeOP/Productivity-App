import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../Components/Productivity/Home';
import NotesScreen from '../../Components/Productivity/Notes';
import TodoScreen from '../../Components/Productivity/Todo';
import AddNotes from '../../Components/Productivity/AddNotes';
import AddTodos from '../../Components/Productivity/AddTodos';
import UpdateTodos from '../../Components/Productivity/UpdateTodos';
import UpdateNotes from '../../Components/Productivity/UpdateNotes';

const ProductiveStack = createStackNavigator();

const ProductiveRoute = () => {
  return (
    <ProductiveStack.Navigator>
      <ProductiveStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <ProductiveStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{headerShown: false}}
      />
      <ProductiveStack.Screen
        name="Todo"
        component={TodoScreen}
        options={{headerShown: false}}
      />
      <ProductiveStack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{headerShown: false}}
      />
      <ProductiveStack.Screen
        name="AddTodo"
        component={AddTodos}
        options={{headerShown: false}}
      />
      <ProductiveStack.Screen
        name="UpdateTodo"
        component={UpdateTodos}
        options={{headerShown: false}}
      />
      <ProductiveStack.Screen
        name="UpdateNotes"
        component={UpdateNotes}
        options={{headerShown: false}}
      />
    </ProductiveStack.Navigator>
  );
};

export default ProductiveRoute;
