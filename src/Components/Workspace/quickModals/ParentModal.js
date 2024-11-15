import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import RecentModal from './RecentModal';
import QuickNoteModal from './QuickNoteModal';
import QuickTodoModal from './QuickTodoModal';

const ParentModal = ({parentModal, closeParentModal, token}) => {
  const [recentModal, setRecentModal] = useState(false);
  const [quickNoteModal, setQuickNoteModal] = useState(false);
  const [quickTodoModal, setQuickTodoModal] = useState(false);
  const [jwtToken, setJwtToken] = useState('');
  useEffect(() => {
    setJwtToken(token);
  }, [token]);

  // Handle Recent Modal
  const handleOpenRecentModal = () => {
    setRecentModal(true);
  };
  const handleCloseRecentModal = () => {
    setRecentModal(false);
  };

  // Handle Quick Note Modal
  const handleOpenQuickNoteModal = () => {
    setQuickNoteModal(true);
  };
  const handleCloseQuickNoteModal = () => {
    setQuickNoteModal(false);
  };

  // Handle Quick Todo Modal
  const handleOpenTodoModal = () => {
    setQuickTodoModal(true);
  };
  const handleCloseTodoModal = () => {
    setQuickTodoModal(false);
  };
  return (
    <>
      <Modal visible={parentModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Quick Access</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOpenRecentModal}>
              <Text style={styles.modalButtonText}>Recents</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOpenQuickNoteModal}>
              <Text style={styles.modalButtonText}>Quick Note</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleOpenTodoModal}>
              <Text style={styles.modalButtonText}>Quick Todo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonClose}
              onPress={closeParentModal}>
              <Text style={styles.modalButtonTextClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <RecentModal
        recentModal={recentModal}
        closeRecentModal={handleCloseRecentModal}
        token={jwtToken}
      />
      <QuickNoteModal
        noteModal={quickNoteModal}
        closeNoteModal={handleCloseQuickNoteModal}
        token={jwtToken}
      />
      <QuickTodoModal
        todoModal={quickTodoModal}
        closeTodoModal={handleCloseTodoModal}
        token={jwtToken}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: wp('80%'),
    padding: wp('5%'),
    backgroundColor: '#000000',
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
  modalButton: {
    width: wp('70%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#FFB800',
    borderRadius: wp('2%'),
    marginVertical: hp('1%'),
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontSize: wp('5%'),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
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

export default ParentModal;
