/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {updateAllNotes} from '../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';

class NotesScreen extends Component {
  navigateToAddNotes = () => {
    this.props.navigation.navigate('AddNotes');
  };
  componentDidMount() {
    this.getNotes();
    this.props.navigation.addListener('focus', () => {
      this.getNotes();
    });
  }
  getNotes = async () => {
    try {
      const response = await fetch('http://192.168.29.154:3000/notes', {
        method: 'GET',
      });
      const notes = await response.json();
      if (notes.length === 0) {
        this.notFoundToast();
        console.log('No Data found');
      } else if (response.status === 200) {
        this.props.dispatch(updateAllNotes(notes));
        this.successToast();
      }
    } catch (error) {
      this.errorToast();
      console.log('Couldnt Fetch Notes' + error);
    }
  };
  successToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Fetched Notes',
    });
  };
  errorToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Fetching Notes',
    });
  };
  notFoundToast = () => {
    Toast.show({
      type: 'error',
      text1: 'No Notes Found',
    });
  };
  render() {
    const {allNotes} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Your Note's </Text>
        </View>
        <ScrollView>
          <View>
            {allNotes.map(note => (
              <View style={styles.notesContainer} key={note._id}>
                <Text style={styles.notesTitle}>{note.title}</Text>
                <Text style={styles.noteDescription}>{note.description}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.notesButton}
            onPress={this.navigateToAddNotes}>
            <Text style={styles.notesText}>Add a note ? </Text>
          </TouchableOpacity>
        </View>
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
});

const mapStateToProps = state => ({
  allNotes: state.addNote.allNotes, // Map allNotes state to props
});

export default connect(mapStateToProps)(NotesScreen);
