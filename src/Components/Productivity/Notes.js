/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {updateAllNotes} from '../../redux/actioncreators';
import {ROOT_URI_DEV} from '@env';
import {DARKMODE} from '../../config/Colors';

const NotesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const allNotes = useSelector(state => state.addNote.allNotes);
  const {jwtToken} = route.params;

  useEffect(() => {
    getNotes();
    navigation.addListener('focus', () => {
      getNotes();
      console.log('NOTES 2 ' + jwtToken);
    });
    console.log('NOTES 3 ' + jwtToken);
  }, []);

  const getNotes = async () => {
    // Pass jwtToken as a parameter
    if (!jwtToken) {
      console.log(
        'Token is not available yet. ------------------------ ' + jwtToken,
      );
      return;
    }
    try {
      const response = await fetch(`${ROOT_URI_DEV}/user/api/v1/notes`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const notes = await response.json();
      if (notes.length === 0) {
        console.log('No Data found');
      } else if (response.status === 200) {
        dispatch(updateAllNotes(notes));
        successToast();
      } else if (response.status < 200 || response.status >= 300) {
        console.log('ERROR ' + response.status + ' - ' + response.statusText);
      }
    } catch (error) {
      errorToast();
      console.log("Couldn't Fetch Notes" + error);
    }
  };

  const navigateToAddNotes = token => {
    navigation.navigate('AddNotes', {
      jwtToken: token,
    });
  };

  const deleteNote = async _id => {
    try {
      const res = await fetch(
        `${ROOT_URI_DEV}/user/api/v1/notes/delete/${_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        dispatch(updateAllNotes(allNotes.filter(note => note._id !== _id)));
        console.log(data);
      } else {
        console.log('Error couldnt remove note');
      }
    } catch (error) {
      console.log('ERROR : ' + error);
    }
  };

  const navigateToUpdateNotes = (
    jwtToken,
    _id,
    notesTitle,
    notesDescription,
  ) => {
    console.log('TITLE NOTES Screen  ' + notesTitle);
    console.log('DESC  NOTES Screen ' + notesDescription);
    navigation.navigate('UpdateNotes', {
      jwtToken: jwtToken,
      id: _id,
      notesTitle: notesTitle,
      notesDescription: notesDescription,
    });
  };

  const successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Fetched Notes',
    });
  };

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Fetching Notes',
    });
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateToHome();
          }}>
          <Image
            source={require('../../assets/images/backlight.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Note's </Text>
      </View>
      <ScrollView>
        {/*TODO LOADING TEXT INSTEAD OF NO NOTES FOUND WHEN FETCHING */}
        <View>
          {allNotes && allNotes.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: wp('4%')}}>
                No Notes Found
              </Text>
            </View>
          ) : allNotes ? (
            allNotes.map(note => (
              <View key={note._id}>
                <View style={styles.notesContainer}>
                  <Text style={styles.notesTitle}>{note.title}</Text>
                  <Text style={styles.noteDescription}>{note.description}</Text>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'flex-end',
                      flexDirection: 'row-reverse',
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigateToUpdateNotes(
                            jwtToken,
                            note._id,
                            note.title,
                            note.description,
                          )
                        }>
                        <Image
                          style={styles.icon}
                          source={require('../../assets/images/edit.png')}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          deleteNote(note._id);
                        }}>
                        <Image
                          style={styles.icon2}
                          source={require('../../assets/images/bin.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            /* ... JSX for loading state (optional) ... */
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: wp('4%')}}>
                Loading ...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.notesButton}
          onPress={() => {
            navigateToAddNotes(jwtToken);
          }}>
          <Text style={styles.notesText}>Add a note ? </Text>
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
    display: 'flex',
    flexDirection: 'row',
    width: wp('100%'),
    height: null,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: '600',
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
    fontSize: wp('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
  notesContainer: {
    borderWidth: 1,
    borderColor: '#f2ae41',
    width: wp('80%'),
    height: null,
    borderRadius: 10,
    marginVertical: wp('2%'),
    marginHorizontal: hp('5%'),
  },
  notesTitle: {
    marginVertical: hp('1%'),
    fontSize: wp('4%'),
    marginHorizontal: hp('2%'),
    color: '#f0cf9c',
  },
  noteDescription: {
    marginVertical: hp('.5%'),
    fontSize: wp('3%'),
    marginHorizontal: hp('2%'),
    color: DARKMODE.notesInput,
  },
  icon: {
    width: wp('2%'),
    height: wp('2%'),
    marginHorizontal: hp('3.5%'),
    marginVertical: hp('1%'),
    padding: wp('3%'),
  },
  icon2: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    marginVertical: hp('1%'),
    padding: wp('3%'),
  },
  hamBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    marginHorizontal: wp('5%'),
    tintColor: DARKMODE.iconColor,
  },
});

const mapStateToProps = state => ({
  allNotes: state.addNote.allNotes,
});

export default connect(mapStateToProps)(NotesScreen);
