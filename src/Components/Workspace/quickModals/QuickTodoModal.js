import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

const QuickTodoModal = ({todoModal, closeTodoModal}) => {
  return (
    <Modal isVisible={todoModal} style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Your Todo-s </Text>
        <Text style={styles.modalContent}>You can add todo-s from here</Text>
        <TouchableOpacity
          style={styles.modalButtonClose}
          onPress={closeTodoModal}>
          <Text style={styles.modalButtonTextClose}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
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
  },
  modalContent: {
    color: '#FFFFFF',
    fontSize: wp('4.5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
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
});

export default QuickTodoModal;
