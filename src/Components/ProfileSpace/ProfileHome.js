import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROOT_URL_KOYEB} from '@env';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DARKMODE} from '../../config/Colors';

const ProfileHome = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const fetchToken = async () => {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      setToken(jwt);
    }
    return jwt;
  };

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

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    setName('');
    setUserName('');
    setEmail('');
    navigation.navigate('OnBoard');
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.bottomContainer}>
        <View>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}>
            <Text style={styles.labelSignOut}>Sign Out </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  infoContainer: {
    width: '100%',
    height: '20%',
    marginTop: hp('-15%'),
  },
  bottomContainer: {
    width: '100%',
    height: '100%',
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
    fontSize: hp('2.75%'),
    color: DARKMODE.signOutTextColor,
    display: 'flex',
    textAlign: 'right',
    marginTop: wp('80%'),
    marginRight: wp('5%'),
    fontFamily: 'Poppins-Bold',
  },
});

export default ProfileHome;
