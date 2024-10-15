import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROOT_URL_KOYEB} from '@env';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DARKMODE} from '../../config/Colors';
import RNRestart from 'react-native-restart';
import Spinner from 'react-native-loading-spinner-overlay';
import {showMessage} from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';

const ProfileHome = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [feedBack, setFeedBack] = useState('');
  const [loading, setLoading] = useState(false);
  const [appVersion, setAppVersion] = useState('');

  const fetchToken = async () => {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      setToken(jwt);
    }
    return jwt;
  };

  useEffect(() => {
    const fetchAppVersion = () => {
      const version = DeviceInfo.getVersion();
      setAppVersion(version);
    };
    fetchAppVersion();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const jwt = await fetchToken();
        if (jwt) {
          await getData(jwt);
        }
      };
      fetchData();
    }, []),
  );

  const getData = async jwt => {
    let userId = await AsyncStorage.getItem('user_id');
    if (!jwt) return;
    try {
      const res = await fetch(`${ROOT_URL_KOYEB}/api/v1/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        // Check if the data is as expected
        const user = data[0];
        console.log(JSON.stringify(data));
        if (user) {
          setName(user.name);
          setUserName(user.username);
          setEmail(user.email);
        }
      } else {
        // Handle errors from the API
        console.error('Failed to fetch user data', data);
      }
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  const postFeedBack = async () => {
    if (!token) {
      return;
    }
    try {
      console.log('Here/....');
      const res = await fetch(`${ROOT_URL_KOYEB}/api/v1/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          feedbackMessage: feedBack,
          sentBy: name,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        showMessage({
          message: 'Feedback Submitted ',
          description: data.message,
          type: 'default',
          icon: 'success',
          position: 'top',
          duration: 5000,
          backgroundColor: DARKMODE.headerText,
        });
      } else if (res.status === 403) {
        showMessage({
          message: 'Couldn`t submit feedback!  ',
          description: data.message,
          type: 'error',
          icon: 'error',
          position: 'top',
          duration: 5000,
        });
      }
    } catch (e) {
      showMessage({
        message: 'Couldn`t submit feedback! Server Error ',
        description: e,
        type: 'error',
        icon: 'error',
        position: 'top',
        duration: 5000,
      });
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      setName('');
      setUserName('');
      setEmail('');
      RNRestart.restart();
    } catch (e) {
      console.error('Error during sign-out:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Signing Out...'}
        textStyle={styles.spinnerTextStyle}
        color={`${DARKMODE.headerText}`}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/images/profile.png')}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.labelName}>{name || 'Loading...'}</Text>
        <Text style={styles.labelUserName}>{userName || 'Loading...'}</Text>
        <Text style={styles.labelEmail}>{email || 'Loading...'}</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.additionalContainer}>
        <View style={styles.feedbackButton}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.feedBackLabel}>Drop a Feedback</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signOutContainer}>
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.labelSignOut}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.labelAppVersion}>v{appVersion}</Text>
      </View>
      {/* Modal  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!setModalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>User Feedback</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Your feedback..."
              value={feedBack}
              onChangeText={setFeedBack}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => {
                postFeedBack();
                setModalVisible(false);
                setFeedBack('');
              }}>
              <Text style={styles.modalLinkText}>Submit Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: DARKMODE.headerText,
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profileImage: {
    width: '30%',
    height: '30%',
    marginLeft: hp('16%'),
    marginTop: wp('10%'),
  },
  modalLinkIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2.5%'),
    tintColor: DARKMODE.white,
    padding: wp('3%'),
    marginTop: hp('2%'),
  },
  infoContainer: {
    width: '100%',
    height: '20%',
    marginTop: hp('-15%'),
  },
  signOutContainer: {
    marginTop: wp('3%'),
    marginLeft: wp('5%'),
    padding: wp('1%'),
    backgroundColor: DARKMODE.headerText,
    color: DARKMODE.white,
    borderRadius: 5,
    fontFamily: 'Poppins-Bold',
    width: wp('25%'),
    height: hp('6%'),
  },
  versionContainer: {
    position: 'absolute',
    bottom: hp('10%'),
    right: wp('1%'),
  },
  divider: {
    backgroundColor: DARKMODE.searchBox,
    width: wp('100%'),
    height: wp('.5%'),
    marginTop: wp('12%'),
  },
  labelName: {
    fontSize: hp('2.5%'),
    margin: wp('6%'),
    color: DARKMODE.profileTextColor,
    fontFamily: 'Poppins-Medium',
  },
  labelUserName: {
    fontSize: hp('2.2%'),
    marginLeft: wp('8%'),
    color: DARKMODE.profileTextColorSecondary,
    fontFamily: 'Poppins-Medium',
  },
  labelEmail: {
    fontSize: hp('2.3%'),
    margin: wp('6%'),
    color: DARKMODE.profileTextColor,
    fontFamily: 'Poppins-Medium',
  },
  labelSignOut: {
    fontSize: hp('2%'),
    margin: wp('2%'),
    color: DARKMODE.profileTextColor,
    fontFamily: 'Poppins-Medium',
    alignContent: 'center',
  },
  labelAppVersion: {
    fontSize: hp('2%'),
    margin: wp('2%'),
    color: DARKMODE.profileTextColor,
    fontFamily: 'Poppins-Medium',
    alignContent: 'center',
  },
  feedbackButton: {
    marginVertical: hp('3%'),
    margin: wp('5%'),
    padding: wp('1%'),
    backgroundColor: DARKMODE.headerText,
    color: DARKMODE.white,
    borderRadius: 5,
    fontFamily: 'Poppins-Bold',
    width: wp('45%'),
    height: hp('6%'),
    justifyContent: 'center',
  },
  feedbackInput: {
    width: '100%',
    height: hp('16%'),
    backgroundColor: DARKMODE.searchBox,
    borderRadius: wp('2%'),
    padding: wp('2%'),
    color: DARKMODE.inputText,
    marginBottom: hp('2%'),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARKMODE.headerText,
    borderRadius: wp('3%'),
    padding: wp('8%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp('0.2%'),
    },
    shadowOpacity: 0.25,
    shadowRadius: wp('2%'),
    elevation: 5,
    width: wp('90%'),
    height: hp('50%'),
  },
  modalLinkIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2.5%'),
    tintColor: DARKMODE.white,
    padding: wp('3%'),
    marginTop: hp('2%'),
  },
  inviteLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('5%'),
  },
  modalLinkText: {
    fontSize: wp('4%'),
    color: DARKMODE.white,
    fontFamily: 'Poppins-Bold',
  },
  modalText: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    color: DARKMODE.black,
    marginBottom: hp('2%'),
  },
  additionalSpace: {
    height: wp('10%'),
  },
  inviteButton: {
    width: wp('60%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKMODE.black,
    borderRadius: 8,
    marginTop: wp('5%'),
  },
  cancelButton: {
    width: wp('40%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKMODE.black,
    borderRadius: 8,
    marginBottom: wp('-2%'),
    marginTop: wp('5%'),
  },
  cancelButtonText: {
    color: DARKMODE.buttons,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
  feedBackLabel: {
    fontSize: hp('2%'),
    margin: wp('2%'),
    color: DARKMODE.profileTextColor,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProfileHome;
