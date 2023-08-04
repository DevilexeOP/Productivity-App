import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../Redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
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
  // handling login
  // navigations
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>Login with one of the options</Text>
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
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loggedInContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>Dont have an account ? </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.registerBtn}>
            <Text style={styles.registerText}>Register</Text>
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
  },
  registerBtn: {
    marginLeft: wp('2%'),
  },
  registerText: {
    color: '#D69D0C',
    fontSize: wp('3.5%'),
  },
});

export default Login;
