/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {
  updateAllTodos,
  updateTodoDescription,
  updateTodoTitle,
  updateTodoStatus,
  updateTodoPriority,
} from '../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');

class AddTodos extends Component {
  componentDidMount() {
    this.resetTodo();
  }
  handleAddTodo = async () => {
    try {
      const res = await fetch('http://192.168.29.154:3000/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todoTitle: this.props.todoTitle,
          todoDescription: this.props.todoDescription,
          todoPriority: this.props.todoPriority,
          todoStatus: this.props.todoStatus,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        this.successToast();
        console.log(data);
      }
    } catch (error) {
      this.errorToast();
      console.log('Error ' + error);
    }
  };
  successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully added your Todo ',
    });
  };
  errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error adding your Todo',
    });
  };
  resetTodo = () => {
    this.props.updateTodoTitle('');
    this.props.updateTodoDescription('');
    this.props.updateTodoStatus('');
    this.props.updateTodoPriority('');
  };
  render() {
    const {todoTitle, todoDescription, todoStatus, todoPriority, actions} =
      this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add To-Do </Text>
        </View>
        <ScrollView>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Task Title"
                placeholderTextColor={'white'}
                style={styles.inputText}
                value={todoTitle}
                onChangeText={text => {
                  actions.updateTodoTitle(text);
                }}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.inputContainer2}>
                <TextInput
                  multiline={true}
                  placeholder="Task Brief"
                  placeholderTextColor={'grey'}
                  style={styles.inputText2}
                  value={todoDescription}
                  onChangeText={text => {
                    actions.updateTodoDescription(text);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.notesButton}
              onPress={this.handleAddTodo}>
              <Text style={styles.notesText}>Save Note </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  notesButton: {
    width: width / 2,
    height: height / 20,
    borderRadius: 10,
    marginVertical: hp('30%'),
    backgroundColor: '#dbac00',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesText: {
    fontSize: wp('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: wp('70%'),
    height: hp('7%'),
    borderRadius: 10,
    marginHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  inputText: {
    marginHorizontal: wp('2%'),
    fontSize: wp('3%'),
    color: '#dbac00',
  },
  inputContainer2: {
    width: wp('70%'),
    height: null,
    borderRadius: 10,
    marginVertical: hp('2%'),
    marginHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  inputText2: {
    marginHorizontal: wp('2%'),
    fontSize: wp('3%'),
  },
});

const mapStateToProps = state => ({
  todoTitle: state.addTodo.todoTitle,
  todoDescription: state.addTodo.todoDescription,
  todoStatus: state.addTodo.todoStatus,
  todoPriority: state.addTodo.todoPriority,
});

// map dispatch to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateTodoTitle,
      updateTodoDescription,
      updateTodoPriority,
      updateTodoStatus,
      updateAllTodos,
    },
    dispatch,
  ),
  updateTodoTitle: title => dispatch(updateTodoTitle(title)),
  updateTodoDescription: description =>
    dispatch(updateTodoDescription(description)),
  updateTodoPriority: priority => dispatch(updateTodoPriority(priority)),
  updateTodoStatus: status => dispatch(updateTodoStatus(status)),
  updateAllTodos: todos => dispatch(updateAllTodos(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodos);
