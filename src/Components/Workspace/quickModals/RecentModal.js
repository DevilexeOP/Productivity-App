import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Config from "react-native-config";
import {DARKMODE} from '../../../config/Colors';
import {showMessage} from 'react-native-flash-message';

const RecentModal = ({recentModal, closeRecentModal, token}) => {
  const [jwt, setJwt] = useState('');
  const [recentNotes, setRecentNotes] = useState([]);
  const [recentTodos, setRecentTodos] = useState([]);

  useEffect(() => {
    setJwt(token);
    getRecentItems();
  });
  const getRecentItems = async () => {
    if (!jwt) {
      return;
    }
    try {
      const notesResponse = await fetch(
        `${Config.ROOT_URL}/user/api/v1/notes/recents`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const notesData = await notesResponse.json();
      if (notesResponse.ok) {
        setRecentNotes([...notesData]);
      } else {
        showMessage({
          message: `Unable to fetch notes`,
          description: 'Retrying... !',
          type: 'error',
          icon: 'error',
          position: 'top',
          duration: 5000,
          backgroundColor: DARKMODE.headerText,
        });
      }
      const todoResponse = await fetch(
        `${Config.ROOT_URL}/user/api/v1/todos/recents`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      const todoData = await todoResponse.json();
      if (todoResponse.ok) {
        setRecentTodos([...todoData]);
      } else {
        showMessage({
          message: `Unable to fetch todos`,
          description: 'Retrying... !',
          type: 'error',
          icon: 'error',
          position: 'top',
          duration: 5000,
          backgroundColor: DARKMODE.headerText,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isVisible={recentModal} style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.modalTitle}>Recent Items</Text>
        </View>
        <ScrollView>
          {recentNotes.length > 0 && (
            <>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Notes</Text>
              </View>
              {recentNotes.map((note, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemTitle}>Title : {note.title}</Text>
                  <Text style={styles.itemDescription}>
                    Description : {note.description}
                  </Text>
                </View>
              ))}
            </>
          )}
          {recentTodos.length > 0 && (
            <>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Todo-s</Text>
              </View>
              {recentTodos.map((todo, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.itemTitle}>Todo: {todo.todoTitle}</Text>
                  <Text style={styles.itemDescription}>
                    {todo.todoDescription}
                  </Text>
                  <Text style={styles.itemDescription}>
                    Priority : {todo.todoPriority ? todo.todoPriority : 'None'}
                  </Text>
                  <Text style={styles.itemDescription}>
                    Status : {todo.todoStatus ? todo.todoStatus : 'None'}
                  </Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
        {recentNotes.length === 0 && recentTodos.length === 0 && (
          <Text style={styles.noItemsText}>No recent items available.</Text>
        )}
        <TouchableOpacity
          style={styles.modalButtonClose}
          onPress={closeRecentModal}>
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
  headerContainer: {
    alignSelf: 'flex-start',
  },
  sectionContainer: {
    alignSelf: 'flex-start',
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontFamily: 'Poppins-Bold',
    color: '#FFB800',
    marginBottom: hp('1%'),
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
  sectionTitle: {
    fontSize: wp('5%'),
    color: '#FFB800',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  item: {
    backgroundColor: '#333333',
    padding: wp('4%'),
    marginVertical: hp('1%'),
    borderRadius: wp('2%'),
    width: wp('90%'),
  },
  itemTitle: {
    fontSize: wp('5%'),
    color: '#FFB800',
    fontFamily: 'Poppins-Medium',
  },
  itemDescription: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    marginTop: hp('0.5%'),
  },
  noItemsText: {
    color: '#AAAAAA',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
});

export default RecentModal;
