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
  Image,
} from 'react-native';
import {
  updateNotesTitle,
  updateNotesDescription,
} from '../../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import Snackbar from 'react-native-snackbar';
import {ROOT_URI_DEV} from '@env';
import {DARKMODE} from '../../Config/Colors';

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
      const res = await fetch(`${ROOT_URI_DEV}/user/api/v1/notes/add`, {
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

  // navigation
  const navigateToHome = token => {
    navigation.navigate('Notes', {
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
            source={require('../../Assets/backlight.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
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
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.notesButton} onPress={handleSaveNote}>
        <Text style={styles.notesText}>Save Note </Text>
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
  inputContainer: {
    width: wp('90%'),
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
    width: wp('90%'),
    height: null,
    borderRadius: 10,
    marginHorizontal: wp('5%'),
    justifyContent: 'center',
  },
  inputText2: {
    marginHorizontal: wp('2%'),
    fontSize: wp('3%'),
    color: DARKMODE.notesInput,
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

// Map state to props
const mapStateToProps = state => ({
  notesTitle: state.addNote.notesTitle,
  notesDescription: state.addNote.notesDescription,
  notesMedia: state.addNote.notesMedia,
  allNotes: state.addNote.allNotes,
});

// Connect the component to Redux
export default AddNotes;
