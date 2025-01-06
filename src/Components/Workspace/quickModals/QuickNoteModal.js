import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {showMessage} from 'react-native-flash-message';
import {DARKMODE} from '../../../config/Colors';
import Config from "react-native-config";

const QuickNoteModal = ({noteModal, closeNoteModal, token}) => {
  const [jwt, setJwt] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  useEffect(() => {
    setJwt(token);
  });

  const addNote = async () => {
    if (!jwt) {
      return;
    }
    try {
      const res = await fetch(`${Config.ROOT_URL}/user/api/v1/notes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          title: noteTitle,
          description: noteDescription,
        }),
      });
      const data = await res.json();
      console.log(JSON.stringify(data) + 'data');
      if (res.status === 201) {
        showMessage({
          message: 'Note added !',
          type: 'success',
          icon: 'success',
          position: 'top',
          duration: 3000,
          backgroundColor: DARKMODE.headerText,
        });
        setNoteTitle('');
        setNoteDescription('');
        closeNoteModal;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={noteModal}
      style={styles.modalOverlay}
      avoidKeyboard={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Your Notes</Text>
        <Text style={styles.modalContent}>Add a quick note</Text>

        <KeyboardAvoidingView
          style={styles.keyboardAvoidView}
          behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#aaa"
            value={noteTitle}
            onChangeText={setNoteTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#aaa"
            value={noteDescription}
            onChangeText={setNoteDescription}
            multiline={true}
          />
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.modalButtonSave} onPress={addNote}>
            <Text style={styles.modalButtonTextClose}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButtonClose}
            onPress={closeNoteModal}>
            <Text style={styles.modalButtonTextClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  keyboardAvoidView: {
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp('100%'),
    height: hp('80%'),
    padding: wp('5%'),
    backgroundColor: '#262626',
    borderRadius: wp('3%'),
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: wp('2%'),
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontFamily: 'Poppins-Bold',
    marginBottom: hp('2%'),
    color: '#FFB800',
    alignSelf: 'flex-start',
    marginTop: hp('5%'),
  },
  modalContent: {
    color: '#FFFFFF',
    fontSize: wp('4.5%'),
    marginBottom: hp('5%'),
    alignSelf: 'flex-start',
  },
  input: {
    width: wp('90%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#333333',
    color: '#FFFFFF',
    fontSize: wp('4.5%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    fontFamily: 'Poppins-Regular',
  },
  textArea: {
    height: hp('20%'),
    textAlignVertical: 'top',
  },
  modalButtonSave: {
    width: wp('40%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#FFB800',
    borderRadius: wp('2%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
    marginRight: wp('5%'),
  },
  modalButtonClose: {
    width: wp('40%'),
    paddingVertical: hp('1%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('2%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  modalButtonTextClose: {
    color: '#000',
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Medium',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default QuickNoteModal;
