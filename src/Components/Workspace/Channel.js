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
import {actionCreators} from '../../Redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from '../../Config/Colors';
import {ROOT_URI_DEV} from '@env';
import Snackbar from 'react-native-snackbar';
import {
  updateChannelData,
  updateMessage,
  updateAllMessages,
  updateAddMessage,
} from '../../Redux/Action-Creators';
import KeyboardAvoidView from '../../Config/KeyboardAvoidView';
import socket from '../../Config/Socket';

// import io from 'socket.io-client';

// sentMessage - >  message sent by user
// all Message -> display all messages by  user

const Channel = ({navigation, route}) => {
  const {channelId, jwtToken} = route.params;
  const name = useSelector(state => state.user.name);
  const email = useSelector(state => state.user.email);
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const data = useSelector(state => state.data.channelData);

  // loading manage
  const [isLoading, setIsLoading] = useState(true);
  // msg manage
  const allMessages = useSelector(state => state.message.allMessages);
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Username:', username);
  useEffect(() => {
    fetchData();
    console.log('All Messages', allMessages);
  }, []);

  useEffect(() => {
    const handleMessageResponse = data => {
      // dispatch(updateAddMessage(data)); // Dispatching action to add new message
    };
    socket.on('chat message', handleMessageResponse);
    return () => {
      socket.off('chat message', handleMessageResponse);
    };
  }, [dispatch]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [allMessages]);

  // fetching channel data
  const fetchData = async () => {
    if (!jwtToken) {
      return;
    }
    try {
      const res = await fetch(
        `${ROOT_URI_DEV}/user/api/v1/channel/${channelId}`,
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
        console.log(data);
        dispatch(updateChannelData([data]));
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };
  //navigation
  const navigationToHome = token => {
    navigation.navigate('WorkSpace', {
      jwtToken: token,
    });
  };
  //send message  handler
  const sentMessage = useSelector(state => state.message.message);
  const handleSentMessage = val => {
    actions.updateMessage(val);
  };

  const sendMessageToSocket = async () => {
    if (sentMessage) {
      // const userData = await getData();
      // console.log('Users Data ' + JSON.stringify(userData));
      // const {name, userName, email} = userData;
      const messageData = {
        message: sentMessage,
        // name: name,
        // email: email,
        // userName: userName,
        socketID: socket.id,
        timeStamp: new Date().toLocaleTimeString(),
      };
      socket.emit('chat message', messageData);

      // dispatch action to redux
      dispatch(updateAddMessage(messageData));

      // set to default state
      actions.updateMessage('');
    }
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
            source={require('../../Assets/backlight.png')}
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
            source={require('../../Assets/quick.png')}
            alt="Back"
            style={styles.quickBtn}
          />
        </TouchableOpacity>
      </View>
      {/*Chatting Section */}
      <View style={styles.chatContainer}>
        {/* All Chat */}
        <ScrollView style={styles.scrollView} ref={scrollViewRef}>
          {allMessages.map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.senderName}>{name}</Text>
              <View style={styles.messageContent}>
                <Text style={styles.chatMessage}>{msg.message}</Text>
                <Text style={styles.chatMessageTime}>{msg.timeStamp}</Text>
              </View>
            </View>
          ))}
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
                source={require('../../Assets/send.png')}
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
    fontSize: wp('4.5%'),
    fontWeight: '600',
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
  messageLabel: {
    color: DARKMODE.iconColor,
    fontSize: wp('3%'),
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
  },
  senderName: {
    fontSize: wp('4%'),
    color: DARKMODE.senderTextColor,
    marginBottom: wp('1%'),
    alignSelf: 'flex-start',
  },
  chatMessageTime: {
    fontSize: wp('3.2%'),
    color: '#a0a0a0',
    marginLeft: wp('3%'),
  },
});

export default Channel;
