import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from '../../config/Colors';
import {ROOT_URL_KOYEB} from '@env';
import Snackbar from 'react-native-snackbar';
import {updateChannelData, updateAddMessage} from '../../redux/actioncreators';
import KeyboardAvoidView from '../../config/KeyboardAvoidView';
import socket from '../../config/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Channel = ({navigation, route}) => {
  const {spaceId, channelId, jwtToken} = route.params;

  // local states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  // redux states
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const data = useSelector(state => state.data.channelData);
  const sentMessage = useSelector(state => state.message.message);
  // messageData object
  const messageData = {
    message: sentMessage,
    name: name,
    email: email,
    userName: userName,
    socketID: socket.id,
    timeStamp: new Date().toLocaleTimeString(),
    channelID: channelId,
    date: new Date().toLocaleDateString(),
  };

  // loading manage
  const [isLoading, setIsLoading] = useState(true);
  // message manage
  const allMessages = useSelector(state => state.message.allMessages);

  // API Calls
  useEffect(() => {
    socket.emit('join-channel', channelId);
    fetchData();
    getUserData();
  }, []);

  useEffect(() => {
    const handleResponse = msg => {
      console.log(msg.message);
      if (
        msg.userName !== messageData.userName &&
        msg.socketID !== messageData.socketID
      ) {
        dispatch(updateAddMessage({...msg}));
      }
    };
    socket.on('chat message', handleResponse);
    return () => {
      socket.off('chat message');
    };
  }, [dispatch]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [allMessages]);

  // get user's data from async storage
  const getUserData = async () => {
    let name = await AsyncStorage.getItem('name');
    let email = await AsyncStorage.getItem('email');
    let userName = await AsyncStorage.getItem('username');
    setName(name);
    setEmail(email);
    setUserName(userName);
  };

  // fetching channel data
  const fetchData = async () => {
    if (!jwtToken) {
      return;
    }
    try {
      const res = await fetch(
        `${ROOT_URL_KOYEB}/user/api/v1/channel/${channelId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      const data = await res.json();
      if (res.status === 404 || res.status === 403) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        setIsLoading(true);
      } else {
        // console.log(data);
        dispatch(updateChannelData([data]));
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };

  // sending message to socket listener
  const sendMessageToSocket = async () => {
    if (sentMessage.trim()) {
      socket.emit('chat message', messageData);
      dispatch(updateAddMessage({...messageData, isSender: true}));
      actions.updateMessage('');
    }
  };

  //navigation
  const navigationToHome = token => {
    navigation.goBack();
  };

  const handleSentMessage = val => {
    actions.updateMessage(val);
  };

  const scrollViewRef = useRef();

  return (
    <KeyboardAvoidView>
      <View style={styles.outContainer}>
        <TouchableOpacity
          onPress={() => {
            navigationToHome(jwtToken);
          }}>
          <Image
            source={require('../../assets/images/backlight.png')}
            alt="Back"
            style={styles.backBtn}
          />
        </TouchableOpacity>
        {data.map(info => (
          <View style={styles.headerContainer} key={info._id}>
            <Text style={styles.headerText}>#{info.channelName}</Text>
          </View>
        ))}
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/quick.png')}
            alt="Back"
            style={styles.quickBtn}
          />
        </TouchableOpacity>
      </View>
      {/*Chatting Section */}
      <View style={styles.chatContainer}>
        {/* All Chat */}
        <ScrollView style={styles.scrollView} ref={scrollViewRef}>
          {allMessages.map((msg, index) => {
            if (!msg.message) return null;
            return (
              <View key={index} style={styles.messageContainer}>
                <Text style={styles.senderName}>{msg.name}</Text>
                <View style={styles.messageContent}>
                  <Text style={styles.chatMessage}>{msg.message}</Text>
                  <Text style={styles.chatMessageTime}>{msg.timeStamp}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Chat Input Box */}
        <View style={styles.sendingContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              numberOfLines={2}
              style={styles.sendTxt}
              placeholderTextColor={'black'}
              placeholder={'Send Message'}
              value={sentMessage}
              onChangeText={handleSentMessage}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{padding: wp('2%')}}
              onPress={sendMessageToSocket}>
              <Image
                style={styles.sendIcon}
                source={require('../../assets/images/send.png')}
                alt={'Send'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidView>
  );
};

// height
const screenHeight = Dimensions.get('window').height;
const chatContainerHeight = screenHeight * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARKMODE.background,
  },
  outContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: wp('75%'),
    height: null,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    textAlign: 'center',
  },
  backBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp('3.5%'),
  },
  quickBtn: {
    width: wp('6%'),
    height: hp('4%'),
    padding: wp('6%'),
    right: wp('5%'),
  },
  sendIcon: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('4%'),
    marginRight: wp('5%'),
  },
  chatContainer: {
    display: 'flex',
    width: wp('90%'),
    backgroundColor: DARKMODE.chatContainer,
    height: chatContainerHeight,
    marginLeft: wp('5%'),
    marginRight: wp('5%'),
    borderRadius: wp('2%'),
    marginTop: wp('-2.5%'),
  },
  sendingContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: hp('7.5%'),
    marginTop: wp('5%'),
    backgroundColor: DARKMODE.iconColor,
    alignItems: 'center',
    borderRadius: wp('1%'),
  },
  sendTxt: {
    fontSize: wp('4%'),
    padding: wp('2%'),
    color: DARKMODE.headerText,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    flex: 1,
  },
  chattingSection: {
    display: 'flex',
    alignItems: 'flex-start',
    width: wp('80%'),
    padding: wp('3%'),
    margin: wp('5%'),
  },
  messageContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: wp('2%'),
    paddingHorizontal: wp('3%'),
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '80%',
  },
  chatMessage: {
    fontSize: wp('4%'),
    color: DARKMODE.headerText,
    padding: wp('3%'),
    borderRadius: wp('2%'),
    backgroundColor: '#000000',
    maxWidth: '100%',
    fontFamily: 'Poppins-Medium',
  },
  senderName: {
    fontSize: wp('4.2%'),
    color: DARKMODE.senderTextColor,
    margin: wp('1%'),
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Bold',
  },
  chatMessageTime: {
    fontSize: wp('3.5%'),
    color: '#a0a0a0',
    marginLeft: wp('3%'),
    fontFamily: 'Poppins-Bold',
  },
});

export default Channel;
