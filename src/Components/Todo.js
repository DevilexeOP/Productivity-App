/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {updateAllTodos} from '../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';

class TodoScreen extends Component {
  navigateToAddTodo = () => {
    this.props.navigation.navigate('AddTodo');
  };
  componentDidMount() {
    this.getTodos();
    this.props.navigation.addListener('focus', () => {
      this.getTodos();
    });
  }
  getTodos = async () => {
    try {
      const response = await fetch('http://192.168.29.154:3000/todos', {
        method: 'GET',
      });
      const todos = await response.json();
      if (todos.length === 0) {
        this.notFoundToast();
        console.log('Todos not found');
      } else if (response.status === 201) {
        this.props.dispatch(updateAllTodos(todos));
        this.successToast();
      }
    } catch (error) {
      this.errorToast();
      console.log('Error Fetching todos' + error);
    }
  };
  successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Fetched Todos',
    });
  };
  errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Fetching Todos',
    });
  };
  notFoundToast = () => {
    Toast.show({
      type: 'error',
      text1: 'No Todos Found',
    });
  };
  render() {
    const {allTodos} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Your To-Do's </Text>
        </View>
        <ScrollView>
          <View>
            {allTodos.map(todo => (
              <View style={styles.todoContainer} key={todo._id}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.todoTitle}>{todo.todoTitle}</Text>
                  <View>
                    <TouchableOpacity>
                      <Image
                        style={styles.icon}
                        source={require('../Assets/edit.png')}
                      />
                    </TouchableOpacity>
                  </View>
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
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.todoButton}
            onPress={this.navigateToAddTodo}>
            <Text style={styles.todoText}>Add a Todo? </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

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
    marginHorizontal: hp('40%'),
    marginVertical: hp('1%'),
  },
});

const mapStateToProps = state => ({
  allTodos: state.addTodo.allTodos, // Map allNotes state to props
});

export default connect(mapStateToProps)(TodoScreen);
