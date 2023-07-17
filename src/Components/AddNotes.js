/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import {bindActionCreators} from 'redux';
import {
  updateNotesTitle,
  updateNotesDescription,
  updateNotesMedia,
  updateSaveNote,
  updateAllNotes,
} from '../Redux/Action-Creators/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');

class AddNotes extends Component {
  componentDidMount() {
    this.resetNote();
  }
  handleSaveNote = async () => {
    try {
      const res = await fetch('http://192.168.29.154:3000/notes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.props.notesTitle,
          description: this.props.notesDescription,
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
      text1: 'Successfully added your note ',
    });
  };
  errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error adding your note',
    });
  };
  resetNote = () => {
    this.props.updateNotesTitle('');
    this.props.updateNotesDescription('');
  };
  render() {
    const {notesTitle, notesDescription, actions} = this.props;
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
                  actions.updateNotesTitle(text);
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
                    actions.updateNotesDescription(text);
                  }}
                />
              </View>
              {/* <TouchableOpacity style={styles.iconButton}>
                <Image
                  source={require('../Assets/media.png')}
                  style={styles.icon}
                />
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.notesButton}
              onPress={this.handleSaveNote}>
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

// Map dispatch to props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      updateNotesTitle,
      updateNotesDescription,
      updateNotesMedia,
      updateSaveNote,
      updateAllNotes,
    },
    dispatch,
  ),
  updateNotesTitle: title => dispatch(updateNotesTitle(title)),
  updateNotesDescription: description =>
    dispatch(updateNotesDescription(description)),
  updateAllNotes: note => dispatch(updateAllNotes(note)),
});

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(AddNotes);
