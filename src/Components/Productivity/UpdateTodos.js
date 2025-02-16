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
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {
  updateAllTodos,
  updateTodoDescription,
  updateTodoTitle,
  updateTodoStatus,
  updateTodoPriority,
} from '../../Redux/actioncreators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {Picker} from '@react-native-picker/picker';
import Config from "react-native-config";
import {DARKMODE} from '../../Config/Colors';

const {width, height} = Dimensions.get('screen');
const UpdateTodos = ({actions, navigation, route}) => {
  const {jwtToken, id, todoTitle, todoDescription, todoStatus, todoPriority} =
    route.params;
  useEffect(() => {
    console.log('TODO STATUS -> ' + todoStatus);
    console.log('TODO PRIORITY -> ' + todoPriority);
  }, []);
  const [title, setTitle] = useState(todoTitle);
  const [description, setDescription] = useState(todoDescription);
  const [priority, setPriority] = useState(todoPriority);
  const [status, setStatus] = useState(todoStatus);
  const handleTitle = newTitle => {
    setTitle(newTitle);
    actions.updateTodoTitle(newTitle);
  };
  const handleDescription = newDescription => {
    setDescription(newDescription);
    actions.updateTodoDescription(newDescription);
  };
  const handleStatus = newStatus => {
    setStatus(newStatus);
    actions.updateTodoStatus(newStatus);
    console.log(newStatus);
  };
  const handlePriority = newPriority => {
    setPriority(newPriority);
    actions.updateTodoPriority(newPriority);
    console.log(newPriority);
  };

  const handleUpdateTodo = async () => {
    try {
      const res = await fetch(
        `${Config.ROOT_URL}/user/api/v1/todos/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            todoTitle: title,
            todoDescription: description,
            todoPriority: priority,
            todoStatus: status,
          }),
        },
      );
      const updatedData = await res.json();
      if (res.status === 200) {
        successToast();
        navigation.goBack();
        console.log(updatedData);
      } else if (res.status < 200 || res.status >= 300) {
        console.log('ERROR ' + res.status + ' - ' + res.statusText);
      }
    } catch (error) {
      errorToast();
      console.log('Error' + error);
    }
  };

  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully updated your Todo ',
    });
  };

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error updating your Todo',
    });
  };

  const navigateToHome = token => {
    navigation.navigate('Todo', {
      jwtToken: token,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateToHome(jwtToken);
          }}>
          <Image
            source={require('../../Assets/images/backlight.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}> Update To-Do </Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Task Title"
              placeholderTextColor={'white'}
              style={styles.inputText}
              value={title}
              onChangeText={newTitle => {
                handleTitle(newTitle);
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
                value={description}
                onChangeText={newDescription => {
                  handleDescription(newDescription);
                }}
              />
            </View>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={newStatus => {
                handleStatus(newStatus);
              }}
              style={{color: DARKMODE.notesInput}}
              dropdownIconColor={DARKMODE.iconColor}>
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="Select Progress"
                value=""
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="Completed"
                value="Completed"
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="In-Progress"
                value="In-Progress"
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="In-Complete"
                value="InComplete"
              />
            </Picker>
          </View>
          <View style={styles.pickerContainer2}>
            <Picker
              selectedValue={priority}
              onValueChange={newPriority => {
                handlePriority(newPriority);
              }}
              style={{color: DARKMODE.notesInput}}
              dropdownIconColor={DARKMODE.iconColor}>
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="Select Priority"
                value=""
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="High"
                value="High"
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="Medium"
                value="Medium"
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="Low"
                value="Low"
              />
              <Picker.Item
                color={DARKMODE.inputTextPicker}
                label="None"
                value="None"
              />
            </Picker>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.todosButton}
        onPress={() => {
          handleUpdateTodo();
        }}>
        <Text style={styles.todoText}>Update Todo</Text>
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
    display: 'flex',
    flexDirection: 'row',
    width: wp('100%'),
    height: null,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    fontSize: wp('5%'),
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    marginRight: wp('25%'),
    fontFamily: 'Poppins-Bold',
  },
  todosButton: {
    width: wp('50%'),
    height: wp('10%'),
    borderRadius: 10,
    marginBottom: wp('25%'),
    marginTop: wp('5%'),
    backgroundColor: '#dbac00',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoText: {
    fontSize: wp('3.5%'),
    color: 'white',
    fontFamily: 'Poppins-Bold',
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
    fontSize: wp('4%'),
    color: '#dbac00',
    fontFamily: 'Poppins-Bold',
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
    fontSize: wp('3.5%'),
    color: DARKMODE.notesInput,
    fontFamily: 'Poppins-Medium',
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
  hamBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    marginHorizontal: wp('5%'),
    tintColor: DARKMODE.iconColor,
  },
  picker: {
    color: DARKMODE.notesInput,
  },
});

//map state to props
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTodos);
