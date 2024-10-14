import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {ROOT_URL_KOYEB} from '@env';
import Spinner from 'react-native-loading-spinner-overlay';
import {DARKMODE} from '../../config/Colors';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    actions.updateEmail('');
    actions.updatePassword('');
  }, []);
  // state management handlers
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const email = useSelector(state => state.user.email);
  const password = useSelector(state => state.user.password);
  const emailHandler = email => {
    actions.updateEmail(email);
  };
  const passwordHandler = password => {
    actions.updatePassword(password);
  };
  const handleLogin = async (Email, Password) => {
    setSpinner(true);
    try {
      const res = await fetch(`${ROOT_URL_KOYEB}/auth/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: Email,
          password: Password,
        }),
      });

      const data = await res.json();
      console.log('Login Data ->  ' + JSON.stringify(data)); // returns message Login Success and token

      if (res.status === 200) {
        const token = data.token;
        const id = data._id;
        const name = data.name;
        const email = data.email;
        const username = data.username;
        if (id) await AsyncStorage.setItem('user_id', id);
        if (name) await AsyncStorage.setItem('name', name);
        if (email) await AsyncStorage.setItem('email', email);
        if (username) await AsyncStorage.setItem('username', username);
        if (token) {
          showMessage({
            message: `Welcome back ${name}`,
            description: 'Glad to see you again !',
            type: 'default',
            icon: 'success',
            position: 'top',
            duration: 5000,
            backgroundColor: DARKMODE.headerText,
          });
          await AsyncStorage.setItem('token', token);
          console.log(token + ' Login Token ');
          setSpinner(false);
          setTimeout(() => {
            navigateToSuccess(token);
          }, 1000);
        } else {
          console.log('Login response missing token or userId.');
        }
      } else if (res.status === 400 || res.status === 401) {
        showMessage({
          message: `Error Logging in`,
          description: data.message,
          type: 'error',
          icon: 'error',
          position: 'top',
          duration: 5000,
        });
        console.log('Error:', data.message);
        setSpinner(false);
      } else if (res.status === 500) {
        showMessage({
          message: `Login Failed`,
          description: 'Retrying .....',
          type: 'error',
          icon: 'error',
          position: 'top',
          duration: 5000,
        });
        setSpinner(false);
        navigation.navigate('LoginFail');
      } else {
        console.log('Unexpected status:', res.status);
        setSpinner(false);
      }
    } catch (error) {
      console.log('Login error:', error);
      setSpinner(false);
      navigation.navigate('LoginFail');
    }
  };

  // forgot password
  const forgotPassword = async email => {
    try {
      const res = await fetch(`${ROOT_URL_KOYEB}/auth/api/v1/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
      } else if (res.status === 400 || 401) {
        console.log('Error ? :', data.message);
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  // navigations
  const navigateToSuccess = token => {
    navigation.navigate('LoginSuccess', {
      jwt: token,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Logging in...'}
        textStyle={styles.spinnerTextStyle}
        color={`${DARKMODE.headerText}`}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter your email "
            value={email}
            onChangeText={emailHandler}
          />
          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            keyboardType="default"
            secureTextEntry={true}
            value={password}
            onChangeText={passwordHandler}
          />
        </View>
      </View>
      <View style={styles.userContainer}>
        <Text
          style={styles.forgotText}
          onPress={() => {
            forgotPassword(email);
          }}>
          Forgot Password
        </Text>
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            handleLogin(email, password);
          }}>
          <Text style={styles.loginText}>Login </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loggedInContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>Dont have an account ? </Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: wp('12%'),
    marginLeft: wp('4%'),
  },
  headerText: {
    color: '#FFB800',
    fontSize: wp('6%'),
    fontFamily: 'Poppins-Bold',
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
    color: '#ffffff',
    fontSize: wp('4.2%'),
    marginTop: wp('2%'),
    marginBottom: wp('2%'),
    fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('10%'),
    marginLeft: wp('4%'),
  },
  loginBtn: {
    backgroundColor: '#D69D0C',
    width: wp('60%'),
    height: hp('6%'),
    borderRadius: 15,
    borderColor: 'rgba(221, 199, 144, 1)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Bold',
  },
  loggedInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('3%'),
  },
  userContainer: {},
  userText: {
    fontSize: wp('3.2%'),
    color: '#D3CACA',
    fontFamily: 'Poppins-Medium',
  },
  registerBtn: {
    marginLeft: wp('2%'),
  },
  registerText: {
    color: '#D69D0C',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Bold',
  },
  animation2: {
    width: wp('20%'),
    height: hp('20%'),
  },
  forgotText: {
    color: '#FFB800',
    fontSize: wp('3.5%'),
    marginLeft: wp('6%'),
    marginTop: hp('3%'),
    fontFamily: 'Poppins-Bold',
  },
});

export default Login;
