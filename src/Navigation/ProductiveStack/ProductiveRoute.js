import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../components/productivity/Home';
import NotesScreen from '../../components/productivity/Notes';
import TodoScreen from '../../components/productivity/Todo';
import AddNotes from '../../components/productivity/AddNotes';
import AddTodos from '../../components/productivity/AddTodos';
import UpdateTodos from '../../components/productivity/UpdateTodos';
import UpdateNotes from '../../components/productivity/UpdateNotes';

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
