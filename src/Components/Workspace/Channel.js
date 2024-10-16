import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from '../../config/Colors';
import {ROOT_URL_KOYEB, ROOT_URL_DEV} from '@env';
import Snackbar from 'react-native-snackbar';
import {
  updateChannelData,
  updateAddMessage,
  updateAllMessages,
} from '../../redux/actioncreators';
import KeyboardAvoidView from '../../config/KeyboardAvoidView';
import socket from '../../config/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const Channel = ({navigation, route}) => {
  const {spaceId, channelId, jwtToken} = route.params;

  // local states
  const [spinner, setSpinner] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [socketMessages, setSocketMessages] = useState([]);
  const [combinedMessages, setCombinedMessages] = useState([]);

  // redux states
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const data = useSelector(state => state.data.channelData);
  const sentMessage = useSelector(state => state.message.message);

  // message manage
  const allMessages = useSelector(state => state.message.allMessages);

  // messageData object
  const messageData = {
    socketID: socket.id,
    text: sentMessage,
    sentBy: name,
    email: email,
    userName: userName,
    channel: channelId,
    sentAt: new Date().toLocaleTimeString(),
    sentOn: new Date().toISOString(),
  };

  // API Calls
  useEffect(() => {
    socket.emit('join-channel', channelId);
    getMessages();
    fetchData();
    getUserData();
    return () => {
      dispatch(updateAllMessages([]));
    };
  }, []);

  // Setting messages
  useEffect(() => {
    setCombinedMessages([...allMessages, ...socketMessages]);
  }, [allMessages, socketMessages]);

  useEffect(() => {
    const handleResponse = msg => {
      if (
        msg.userName !== messageData.userName &&
        msg.socketID !== messageData.socketID
      ) {
        setSocketMessages(prev => [...prev, msg]);
      }
    };
    socket.on('chat message', handleResponse);
    return () => {
      socket.off('chat message');
    };
  }, [dispatch]);

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
    setSpinner(true);
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
        setSpinner(false);
      } else {
        // console.log(data);
        dispatch(updateChannelData([data]));
        setSpinner(false);
      }
    } catch (e) {
      console.log(e);
      setSpinner(false);
    }
  };

  // fetch channel messages
  const getMessages = async () => {
    if (!jwtToken) {
      return;
    }
    setSpinner(true);
    try {
      const res = await fetch(`${ROOT_URL_KOYEB}/api/v1/message/${channelId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        if (data.length === 0) {
          setSpinner(false);
          setSocketMessages([]);
        } else {
          setSpinner(false);
          dispatch(updateAllMessages(data));
        }
      }
    } catch (e) {
      console.log(e);
      setSpinner(false);
    }
  };

  // sending message to socket listener
  const sendMessageToSocket = async () => {
    if (sentMessage.trim()) {
      socket.emit('chat message', messageData);
      Keyboard.dismiss();
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

  const scrollViewRef = useRef(null);

  // Message Component
  const MessageItem = React.memo(({item, isSender}) => {
    return (
      <View style={styles.messageContainer}>
        <View style={styles.infoContainer}>
          <Text style={isSender ? styles.senderName : styles.senderName2}>
            {item.sentBy}
          </Text>
          <Text
            style={isSender ? styles.chatMessageTime : styles.chatMessageTime2}>
            {item.sentAt}
          </Text>
        </View>
        <View style={styles.messageContent}>
          <Text style={isSender ? styles.chatMessage : styles.chatMessage2}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  });

  return (
    <KeyboardAvoidView>
      <View style={styles.container}>
        {/* Top Content: Header */}
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

        {/* Chat Section */}
        <View style={styles.chatContainer}>
          <Spinner
            visible={spinner}
            textContent={'Loading messages...'}
            textStyle={styles.spinnerTextStyle}
            color={`${DARKMODE.headerText}`}
            overlayColor="rgba(0, 0, 0, 0.75)"
          />
          <FlatList
            ref={scrollViewRef}
            data={combinedMessages.filter(
              item => item.text && item.text.trim() !== '',
            )}
            renderItem={({item}) => {
              const isSender = item.sentBy === name;
              return <MessageItem item={item} isSender={isSender} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            onContentSizeChange={() => {
              scrollViewRef.current.scrollToEnd({animated: true});
            }}
          />
        </View>

        {/* Sending Container (Chat Input Box) */}
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
const screenHeight = Dimensions.get('screen').height;
const chatContainerHeight = screenHeight * 0.68;

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
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    width: wp('6%'),
    height: wp('6%'),
    padding: wp('5%'),
    marginRight: wp('5%'),
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    width: wp('100%'),
    backgroundColor: DARKMODE.chatContainer,
    height: chatContainerHeight,
    marginRight: wp('5%'),
    borderRadius: wp('2%'),
    marginTop: wp('-6%'),
  },
  sendingContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: DARKMODE.iconColor,
    alignItems: 'center',
    borderRadius: wp('1%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    marginTop: hp('1%'),
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
  chatMessage2: {
    fontSize: wp('4%'),
    color: '#FBD595',
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
  senderName2: {
    fontSize: wp('4.2%'),
    color: DARKMODE.senderTextColor,
    margin: wp('1%'),
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Bold',
  },
  chatMessageTime: {
    fontSize: wp('3.5%'),
    color: '#A3A19B',
    marginLeft: wp('3%'),
    fontFamily: 'Poppins-Bold',
    marginBottom: hp('0.75%'),
  },
  chatMessageTime2: {
    fontSize: wp('3.5%'),
    color: '#AEACAC',
    marginLeft: wp('3%'),
    fontFamily: 'Poppins-Bold',
    marginBottom: hp('0.75%'),
  },
});

export default Channel;
