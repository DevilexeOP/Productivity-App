import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Register = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>
          Register with one of the options
        </Text>
      </View>
      <View style={styles.googleContainer}>
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            style={styles.googleLogo}
            source={require('../../Assets/google.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.inputHeader}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            keyboardType="default"
          />
          <Text style={styles.inputHeader}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Pick a unqiue username"
            keyboardType="default"
          />
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Abc@gmail.com"
          />
          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Pick a password with atleast 6 characters"
            keyboardType="default"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.registerContainer}>
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerText}>Create Account </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loggedInContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>Already a user?</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.loginBtn} onPress={navigateToLogin}>
            <Text style={styles.loginText}>Log in</Text>
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
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('12%'),
    marginLeft: wp('4%'),
  },
  headerText: {
    color: '#FFB800',
    fontSize: wp('6%'),
    fontWeight: 700,
  },
  subHeaderContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('3%'),
    marginLeft: wp('4%'),
  },
  subHeaderText: {
    color: '#B3B3B3',
    fontSize: wp('3.5%'),
    fontWeight: 300,
  },
  googleContainer: {
    width: wp('40%'),
    height: hp('5%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('5%'),
    marginLeft: wp('4%'),
  },
  googleBtn: {
    width: wp('50%'),
    height: hp('5%'),
    backgroundColor: '#DCA61B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'rgba(221, 199, 144, 1)',
    borderWidth: 2,
  },
  googleLogo: {
    width: wp('3%'),
    height: null,
    padding: wp('2.8%'),
  },
  formContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('4%'),
    marginLeft: wp('4%'),
  },
  inputHeader: {
    color: '#B3B3B3',
    fontSize: wp('4%'),
    marginTop: wp('1%'),
    marginBottom: wp('1%'),
  },
  input: {
    width: wp('90%'),
    height: hp('6.5%'),
    backgroundColor: '#DCA61B',
    color: 'white',
    fontSize: wp('3.5%'),
    borderRadius: 15,
    borderColor: 'rgba(221, 199, 144, 1)',
    borderWidth: 2,
    marginTop: wp('2%'),
    paddingLeft: 15,
    marginBottom: wp('1%'),
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('10%'),
    marginLeft: wp('4%'),
  },
  registerBtn: {
    backgroundColor: '#D39E16',
    width: wp('60%'),
    height: hp('6%'),
    borderRadius: 15,
    borderColor: 'rgba(221, 199, 144, 1)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontSize: wp('3%'),
  },
  loggedInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('3%'),
  },
  userContainer: {},
  userText: {
    fontSize: wp('3.5%'),
    color: '#D3CACA',
  },
  loginBtn: {
    marginLeft: wp('2%'),
  },
  loginText: {
    color: '#DCA61B',
    fontSize: wp('3.5%'),
  },
});

export default Register;
