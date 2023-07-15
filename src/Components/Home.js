/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateToNotes = () => {
    this.props.navigation.navigate('Notes');
  };

  navigateToToDo = () => {
    this.props.navigation.navigate('Todo');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Be Productive !</Text>
            </View>
            <TouchableOpacity
              style={styles.notesButton}
              onPress={this.navigateToNotes}>
              <Text style={styles.notesText}>Create a Note ! </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.todoButton}
              onPress={this.navigateToToDo}>
              <Text style={styles.todoText}>Create a To-do !</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    width: wp('100%'),
    height: null,
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginVertical: hp('5%'),
    marginHorizontal: wp('5%'),
    color: '#dbac00',
  },
  notesButton: {
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 10,
    backgroundColor: '#dbac00',
    marginVertical: hp('3%'),
    marginHorizontal: wp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesText: {
    fontSize: wp('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
  todoButton: {
    borderRadius: 10,
    width: wp('70%'),
    height: hp('6%'),
    backgroundColor: '#dbac00',
    marginVertical: hp('1%'),
    marginHorizontal: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    color: 'white',
    fontSize: wp('3%'),
    fontWeight: 'bold',
  },
});
