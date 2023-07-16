/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {updateAllTodos} from '../Redux/Action-Creators';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';

class AddTodos extends Component {
  render() {
    return (
      <View>
        <Text>AddTodos</Text>
      </View>
    );
  }
}

export default AddTodos;
