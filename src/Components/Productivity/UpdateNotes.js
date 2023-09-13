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
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from 'redux';
import {
  updateNotesDescription,
  updateNotesTitle,
} from '../../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
import {ROOT_URL} from '../../Config/constants';

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
      const res = await fetch(`${ROOT_URL}/user/api/v1/notes/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
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
