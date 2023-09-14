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
import React, {useEffect} from 'react';
import {
  updateAllTodos,
  updateTodoDescription,
  updateTodoTitle,
  updateTodoStatus,
  updateTodoPriority,
} from '../../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';
import {bindActionCreators} from 'redux';
import Snackbar from 'react-native-snackbar';
import {ROOT_URL} from '../../Config/constants';


const {width, height} = Dimensions.get('window');

const AddTodos = ({
  todoTitle,
  todoDescription,
  todoStatus,
  todoPriority,
  actions,
  navigation,
  route,
}) => {
  useEffect(() => {
    resetTodo();
  }, []);
  const {jwtToken} = route.params;
  const handleAddTodo = async () => {
    try {
      const res = await fetch(`${ROOT_URL}/user/api/v1/todos/add`, {
        // 209 for linux , 154 pc
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          todoTitle: todoTitle,
          todoDescription: todoDescription,
          todoPriority: todoPriority,
          todoStatus: todoStatus,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        successToast();
        navigation.goBack();
        console.log(data);
      } else if (res.status < 200 || res.status >= 300) {
        console.log('ERROR ' + data.message);
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
      }
    } catch (error) {
      errorToast();
      console.log('Error ' + error);
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FFB800',
        textColor: 'black',
      });
    }
  };

  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully added your Todo ',
    });
  };

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error adding your Todo',
    });
  };

  const resetTodo = () => {
    actions.updateTodoTitle('');
    actions.updateTodoDescription('');
    actions.updateTodoStatus('');
    actions.updateTodoPriority('');
  };

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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={todoStatus}
              onValueChange={item => {
                actions.updateTodoStatus(item);
              }}>
              <Picker.Item label="Select Progress" value="" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="In-Progress" value="In-Progress" />
              <Picker.Item label="In-Complete" value="InComplete" />
            </Picker>
          </View>
          <View style={styles.pickerContainer2}>
            <Picker
              selectedValue={todoPriority}
              onValueChange={item => {
                actions.updateTodoPriority(item);
              }}>
              <Picker.Item label="Select Priority" value="" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="None" value="None" />
            </Picker>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.notesButton} onPress={handleAddTodo}>
        <Text style={styles.notesText}>Save Todo</Text>
      </TouchableOpacity>
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
  notesButton: {
    width: width / 2,
    height: height / 20,
    borderRadius: 10,
    marginVertical: hp('10%'),
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
  pickerContainer: {
    width: wp('80%'),
    marginVertical: hp('8%'),
    marginHorizontal: wp('8%'),
  },
  pickerContainer2: {
    width: wp('80%'),
    marginHorizontal: wp('8%'),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodos);
