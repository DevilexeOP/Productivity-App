import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

const OnBoarding = ({navigation}) => {
  const navigationToRegister = () => {
    navigation.navigate('Register');
  };
  const navigationToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Let's Start Your </Text>
        <Text style={styles.headerText}>Productive Journey</Text>
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../Assets/animations/onBoard3.json')}
          style={styles.animation}
          autoPlay={true}
          loop={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={navigationToRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={navigationToLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('20%'),
    marginLeft: wp('5%'),
  },
  headerText: {
    color: '#FFB800',
    fontSize: wp('6.5%'),
    fontFamily: 'Poppins-Bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('100%'),
    height: hp('50%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerBtn: {
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: '#DCA61B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('6%'),
    marginRight: wp('5%'),
    borderRadius: 10,
  },
  registerText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Bold',
  },
  loginBtn: {
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: '#D49B08',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('6%'),
    borderRadius: 10,
  },
  loginText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Bold',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('50%'),
  },
  animation: {
    width: wp('95%'),
    height: hp('95%'),
  },
});

export default OnBoarding;
