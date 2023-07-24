/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
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
import {updateAllNotes} from '../Redux/Action-Creators';

const NotesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const allNotes = useSelector(state => state.addNote.allNotes);

  useEffect(() => {
    getNotes();
    navigation.addListener('focus', () => {
      getNotes();
    });
  }, []);

  const navigateToAddNotes = () => {
    navigation.navigate('AddNotes');
  };

  const getNotes = async () => {
    try {
      const response = await fetch('http://192.168.29.209:3000/notes', {
        // 209 for linux , 154 pc
        method: 'GET',
      });
      const notes = await response.json();
      if (notes.length === 0) {
        notFoundToast();
        console.log('No Data found');
      } else if (response.status === 200) {
        dispatch(updateAllNotes(notes));
        successToast();
      }
    } catch (error) {
      errorToast();
      console.log("Couldn't Fetch Notes" + error);
    }
  };

  const navigateToUpdateNotes = (_id, notesTitle, notesDescription) => {
    navigation.navigate('UpdateNotes', {
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

  const notFoundToast = () => {
    Toast.show({
      type: 'error',
      text1: 'No Notes Found',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Note's </Text>
      </View>
      <ScrollView>
        <View>
          {allNotes.map(note => (
            <View key={note._id}>
              <View style={styles.notesContainer}>
                <Text style={styles.notesTitle}>{note.title}</Text>
                <Text style={styles.noteDescription}>{note.description}</Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigateToUpdateNotes(
                        note._id,
                        note.title,
                        note.description,
                      )
                    }>
                    <Image
                      style={styles.icon}
                      source={require('../Assets/edit.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.notesButton}
          onPress={navigateToAddNotes}>
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
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 10,
    backgroundColor: '#dbac00',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('10%'),
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
    fontSize: wp('3.5%'),
    marginHorizontal: hp('2%'),
    color: '#f0cf9c',
  },
  noteDescription: {
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

const mapStateToProps = state => ({
  allNotes: state.addNote.allNotes,
});

export default connect(mapStateToProps)(NotesScreen);
