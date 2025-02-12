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
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {
  updateNotesDescription,
  updateNotesTitle,
} from '../../Redux/actioncreators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import Config from "react-native-config";
import {DARKMODE} from '../../Config/Colors';

const {width, height} = Dimensions.get('screen');

const UpdateNotes = ({actions, navigation, route}) => {
  const {jwtToken, id, notesTitle, notesDescription} = route.params;
  useEffect(() => {
    console.log('JWTTTTTTT   ' + jwtToken);
  }, []);
  const [title, setTitle] = useState(notesTitle);
  const [description, setDescription] = useState(notesDescription);
  const handleTitleChange = newTitle => {
    setTitle(newTitle); // Update the title in the state
    actions.updateNotesTitle(newTitle);
  };
  const handleDescriptionChange = newDescription => {
    setDescription(newDescription);
    actions.updateNotesDescription(newDescription);
  };
  const handleUpdateNote = async () => {
    try {
      const res = await fetch(
        `${Config.ROOT_URL}/user/api/v1/notes/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
          }),
        },
      );
      // const updatedData = await res.json();
      if (res.status === 200) {
        successToast();
        navigation.goBack();
      } else if (res.status < 200 || res.status >= 300) {
        console.log('ERROR ' + res.status + ' - ' + res.statusText);
      }
    } catch (error) {
      errorToast();
      console.log('Error updating Note ' + error);
    }
  };

  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Successfully updated your Note ',
    });
  };

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error updating your Note',
    });
  };

  const navigateToNotes = token => {
    navigation.navigate('Notes', {
      jwtToken: token,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateToNotes(jwtToken);
          }}>
          <Image
            source={require('../../Assets/images/backlight.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Update Note </Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Note Title"
              placeholderTextColor={'white'}
              style={styles.inputText}
              value={title}
              onChangeText={newTitle => {
                handleTitleChange(newTitle);
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.inputContainer2}>
              <TextInput
                multiline={true}
                placeholder="Your Note"
                placeholderTextColor={'grey'}
                style={styles.inputText2}
                value={description}
                onChangeText={text => {
                  handleDescriptionChange(text);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.notesButton}
        onPress={() => {
          handleUpdateNote();
        }}>
        <Text style={styles.notesText}>Update Note</Text>
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
    fontFamily: 'Poppins-Bold',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    marginRight: wp('25%'),
  },
  notesButton: {
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
  notesText: {
    fontSize: wp('3.5%'),
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  inputContainer: {
    width: wp('90%'),
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
    width: wp('90%'),
    height: null,
    borderRadius: 10,
    marginHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  inputText2: {
    marginHorizontal: wp('2%'),
    fontSize: wp('3.5%'),
    color: DARKMODE.notesInput,
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    marginVertical: hp('5%'),
    width: 35,
    height: 35,
  },
  hamBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    marginHorizontal: wp('5%'),
    tintColor: DARKMODE.iconColor,
  },
});

//map state to props
const mapStateToProps = state => ({
  notesTitle: state.addNote.notesTitle,
  notesDescription: state.addNote.notesDescription,
});
// map dispatch to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateNotesTitle,
      updateNotesDescription,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNotes);
