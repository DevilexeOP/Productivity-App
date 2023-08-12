import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  updateNotesTitle,
  updateNotesDescription,
} from '../Redux/Action-Creators/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import Snackbar from 'react-native-snackbar';

const {width, height} = Dimensions.get('window');

const AddNotes = ({navigation, route}) => {
  const dispatch = useDispatch();
  const notesTitle = useSelector(state => state.addNote.notesTitle);
  const notesDescription = useSelector(state => state.addNote.notesDescription);
  const {jwtToken} = route.params;
  useEffect(() => {
    resetNote();
  }, []);
  const handleSaveNote = async () => {
    try {
      const res = await fetch('http://13.235.13.123:8082/user/addNotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          title: notesTitle,
          description: notesDescription,
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        successToast();
        navigation.goBack();
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
      text1: 'Successfully added your note ',
    });
  };

  const errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error adding your note',
    });
  };

  const resetNote = () => {
    dispatch(updateNotesTitle(''));
    dispatch(updateNotesDescription(''));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create a Note </Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Note Title"
              placeholderTextColor={'white'}
              style={styles.inputText}
              value={notesTitle}
              onChangeText={text => {
                dispatch(updateNotesTitle(text));
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
                value={notesDescription}
                onChangeText={text => {
                  dispatch(updateNotesDescription(text));
                }}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.notesButton} onPress={handleSaveNote}>
            <Text style={styles.notesText}>Save Note </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  icon: {
    marginVertical: hp('5%'),
    width: 35,
    height: 35,
  },
});

// Map state to props
const mapStateToProps = state => ({
  notesTitle: state.addNote.notesTitle,
  notesDescription: state.addNote.notesDescription,
  notesMedia: state.addNote.notesMedia,
  allNotes: state.addNote.allNotes,
});

// Connect the component to Redux
export default AddNotes;
