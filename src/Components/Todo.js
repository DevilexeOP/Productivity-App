/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import { updateAllTodos } from '../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect, useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const TodoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.addTodo.allTodos);

  useEffect(() => {
    getTodos();
    navigation.addListener('focus', () => {
      getTodos();
    });
  }, []);

  const getTodos = async () => {
    try {
      const response = await fetch('http://192.168.29.154:3000/todos', {
        method: 'GET',
      });
      const todos = await response.json();
      if (todos.length === 0) {
        notFoundToast();
        console.log('Todos not found');
      } else if (response.status === 201) {
        dispatch(updateAllTodos(todos));
        successToast();
      }
    } catch (error) {
      errorToast();
      console.log('Error Fetching todos' + error);
    }
  };

  const navigateToAddTodo = () => {
    navigation.navigate('AddTodo');
  };

  const navigateToUpdateTodo = (_id,title,description,status,priority) => {
    navigation.navigate('UpdateTodo', {
      id: _id,
      title:title,
      description:description,
      status:status,
      priority:priority
    });
  };

  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Fetched Todos',
    });
  };

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Fetching Todos',
    });
  };

  const notFoundToast = () => {
    Toast.show({
      type: 'error',
      text1: 'No Todos Found',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your To-Do's </Text>
      </View>
      <ScrollView>
        <View>
          {allTodos.map((todo) => (
            <View style={styles.todoContainer} key={todo._id}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.todoTitle}>{todo.todoTitle}</Text>
              </View>
              <Text style={styles.todoDescription}>
                {todo.todoDescription}
              </Text>
              {todo.todoStatus ? (
                <Text style={styles.todoStatus}>
                  Completed : {todo.todoStatus}
                </Text>
              ) : (
                <Text style={styles.todoStatus}>Completed : No</Text>
              )}
              {todo.todoPriority ? (
                <Text style={styles.todoPriortiy}>
                  Priority : {todo.todoPriority}
                </Text>
              ) : (
                <Text style={styles.todoPriortiy}>Priority : None</Text>
              )}
              <View>
                  <TouchableOpacity onPress={() => navigateToUpdateTodo(
                    todo._id,todo.todoTitle,todo.todoDescription,todo.todoPriority,todo.todoStatus
                    )}>
                    <Image
                      style={styles.icon}
                      source={require('../Assets/edit.png')}
                    />
                  </TouchableOpacity>
                </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.todoButton}
          onPress={navigateToAddTodo}>
          <Text style={styles.todoText}>Add a Todo? </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    width: wp('100%'),
    height: null,
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('5%'),
    marginHorizontal: wp('5%'),
    color: '#dbac00',
  },
  todoButton: {
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 10,
    backgroundColor: '#dbac00',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('10%'),
  },
  todoText: {
    fontSize: wp('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
  todoContainer: {
    borderWidth: 1,
    borderColor: '#f2ae41',
    width: wp('80%'),
    height: null,
    borderRadius: 10,
    marginVertical: wp('2%'),
    marginHorizontal: hp('5%'),
  },
  todoTitle: {
    marginVertical: hp('1%'),
    fontSize: wp('3.5%'),
    marginHorizontal: hp('2%'),
    color: '#f0cf9c',
  },
  todoDescription: {
    marginVertical: hp('.5%'),
    fontSize: wp('2.5%'),
    marginHorizontal: hp('2%'),
  },
  todoStatus: {
    marginVertical: hp('.5%'),
    fontSize: wp('2.5%'),
    marginHorizontal: hp('2%'),
  },
  todoPriortiy: {
    marginVertical: hp('.5%'),
    fontSize: wp('2.5%'),
    marginHorizontal: hp('2%'),
  },
  icon: {
    width: wp('3%'),
    height: hp('3%'),
    marginHorizontal: hp('3%'),
    marginVertical: hp('1%'),
  },
});

const mapStateToProps = (state) => ({
  allTodos: state.addTodo.allTodos, // Map allNotes state to props
});

export default connect(mapStateToProps)(TodoScreen);
