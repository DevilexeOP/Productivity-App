import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from '../../config/Colors';
import Config from "react-native-config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

const CreateWorkSpace = ({navigation, route}) => {
  const [token, setToken] = useState('');
  // State Management
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const workspaceTitle = useSelector(state => state.workspace.workspaceName);
  const projectName = useSelector(state => state.workspace.projectName);
  // getting token and space reset
  useEffect(() => {
    const getToken = async () => {
      const jwt = await AsyncStorage.getItem('token');
      setToken(jwt);
    };
    getToken();
    resetSpace();
    console.log(token);
    const focusListener = navigation.addListener('focus', () => {
      getToken();
    });
    return () => {
      focusListener();
    };
  }, [navigation]);
  // handlers
  const handleWorkSpaceTitle = workspaceTitle => {
    actions.updateWorkspaceName(workspaceTitle);
  };
  const handleProjectName = projectName => {
    actions.updateProjectName(projectName);
  };

  // reset space
  const resetSpace = () => {
    actions.updateWorkspaceName('');
    actions.updateProjectName('');
  };

  // handling api reqs
  const addWorkSpace = async () => {
    try {
      const res = await fetch(`${Config.ROOT_URL}/user/api/v1/workspace/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          workspace: workspaceTitle.trim(),
          projectName: projectName.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(JSON.stringify(data) + ' create space ');
        actions.updateWorkspaceName(data.workspace);
        actions.updateProjectName(data.projectName);
        navigateToWorkSpace(data.workspace, data.projectName, token, data._id);
      } else if (res.status === 400) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // navigations
  const navigateToWorkspaceHome = () => {
    navigation.replace('WorkSpaceHome');
  };

  //. TODO INSTEAD OF HARDCODED TITLE & PROJECT CHANGING IT TO GET-WORKSPACE-BY ID to FETCH THE DATA
  const navigateToWorkSpace = (workspaceTitle, projectName, token, spaceId) => {
    addWorkSpace(workspaceTitle, projectName, token, spaceId);
    console.log('navigate to space ' + spaceId);
    navigation.navigate('WorkSpace', {
      title: workspaceTitle,
      project: projectName,
      token: token,
      spaceId: spaceId,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity onPress={navigateToWorkspaceHome}>
          <Image
            source={require('../../assets/images/backlight.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create Workspace</Text>
        </View>
      </View>
      <View style={styles.userInputContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.customLabel}>Workspace title</Text>
          <TextInput
            placeholder="My Workspace 1"
            style={styles.textInput}
            placeholderTextColor={DARKMODE.labelText}
            value={workspaceTitle}
            onChangeText={handleWorkSpaceTitle}
          />
        </View>
        <View style={styles.projectContainer}>
          <Text style={styles.customLabel}>Project name</Text>
          <TextInput
            placeholder="# My App Project"
            style={styles.textInput}
            placeholderTextColor={DARKMODE.labelText}
            value={projectName}
            onChangeText={handleProjectName}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.workSpaceButton}
          onPress={() => {
            addWorkSpace();
          }}>
          <Text style={styles.todoText}>Create Space</Text>
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
  outContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: wp('80%'),
    height: null,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    textAlign: 'center',
  },
  workSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: DARKMODE.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    color: 'white',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
  hamBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp('4%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp('10%'),
  },
  userInputContainer: {
    width: wp('80%'),
    display: 'flex',
    height: wp('40%'),
    margin: wp('10%'),
  },
  nameContainer: {
    padding: wp('4%'),
  },
  customLabel: {
    fontSize: wp('4%'),
    color: DARKMODE.labelText,
    fontFamily: 'Poppins-Bold',
  },
  textInput: {
    height: wp('12%'),
    backgroundColor: 'white',
    marginTop: wp('2%'),
    padding: wp('2%'),
    color: DARKMODE.inputText,
    fontSize: wp('3%'),
    borderRadius: wp('1%'),
    fontFamily: 'Poppins-Medium',
  },
  projectContainer: {
    paddingBottom: wp('4%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: wp('2%'),
  },
});

export default CreateWorkSpace;
