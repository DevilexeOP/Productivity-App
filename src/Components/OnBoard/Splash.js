import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Splash = () => {
  const [auth, setAuth] = useState(false);
  const navigation = useNavigation();
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setAuth(false);
      navigation.replace('OnBoard');
    } else {
      setAuth(true);
      navigation.replace('Home');
    }
  };
  useEffect(() => {
    const delayTime = 3000;
    const timeout = setTimeout(() => {
      getToken();
    }, delayTime);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BE PRODUCTIVE </Text>
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/animations/splashLoad.json')}
          style={styles.animation}
          autoPlay={true}
          loop={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('35%'),
  },
  headerText: {
    color: '#dbac00',
    fontWeight: 'bold',
    fontSize: wp('7%'),
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('50%'),
  },
  animation: {
    width: wp('80%'),
    height: hp('80%'),
  },
});

export default Splash;
