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
import {ROOT_URL} from '../../Config/Constants';
import Snackbar from 'react-native-snackbar';
import {
  updateChannelData,
  updateMessage,
  updateAllMessages,
} from '../../Redux/Action-Creators';
import KeyboardAvoidView from '../../Config/KeyboardAvoidView';
import socket from '../../Config/Socket';
import {act} from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import io from 'socket.io-client';

// sentMessage - >  message sent by user
// all Message -> display all messages by  user

const Channel = ({navigation, route}) => {
  const {channelId, jwtToken} = route.params;
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const data = useSelector(state => state.data.channelData);
  const allMessages = useSelector(state => state.message.allMessages);
  // loading manage
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
    getData();
  }, []);
  useEffect(() => {
    socket.on('messageRes', data => {
      actions.updateAllMessages(res => [...res, data]);
    });
    return () => socket.off('messageRes');
  }, [allMessages]);
  // getting user data
  let name, email, userName;
  const getData = async () => {
    name = await AsyncStorage.getItem('name');
    email = await AsyncStorage.getItem('email');
    userName = await AsyncStorage.getItem('username');
    console.log(name, email, userName);
    return {name, email, userName};
  };
  // fetching channel data
  const fetchData = async () => {
    if (!jwtToken) {
      return;
    }
    try {
      const res = await fetch(`${ROOT_URL}/user/api/v1/channel/${channelId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
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
  const sendMessageToSocket = () => {
    if (sentMessage) {
      socket.emit('message', {message: sentMessage});
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
        <ScrollView>
          <View style={styles.chattingSection}>
            <Text style={styles.messageLabel} />
          </View>
        </ScrollView>
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
                style={styles.sendMessage}
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
const chatContainerHeight = screenHeight * 0.76;

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
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3.5%'),
  },
  sendMessage: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('2.6%'),
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
    width: wp('80%'),
    height: hp('7.5%'),
    backgroundColor: DARKMODE.iconColor,
    alignItems: 'center',
    marginLeft: wp('5%'),
    marginBottom: wp('5%'),
    borderRadius: wp('1%'),
  },
  sendTxt: {
    fontSize: wp('3%'),
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
});

export default Channel;
