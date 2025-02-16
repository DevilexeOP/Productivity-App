import React, {useEffect, useState} from 'react';
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
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem('token');
      setToken(jwtToken);
    } catch (error) {
      console.log('could not fetch token ' + error);
    }
  };

  const navigateToNotes = token => {
    navigation.navigate('Notes', {
      jwtToken: token,
    });
  };

  const navigateToToDo = token => {
    navigation.navigate('Todo', {
      jwtToken: token,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Be Productive !</Text>
            {/*  TODO CHANGE HEADER TO RECENT ACTIVITY */}
          </View>
          {/* TODO DISPLAYING RECENT ACTIVITY */}
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../../Assets/animations/onBoardHome.json')}
              style={styles.animation}
              autoPlay={true}
              loop={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.notesButton}
              onPress={() => {
                navigateToNotes(token);
              }}>
              <Text style={styles.notesText}>Notes </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.todoButton}
              onPress={() => {
                navigateToToDo(token);
              }}>
              <Text style={styles.todoText}>Todos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    width: wp('100%'),
    height: null,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('26%'),
  },
  headerText: {
    fontSize: wp('6.5%'),
    fontFamily: 'Poppins-Bold',
    marginVertical: hp('5%'),
    marginHorizontal: wp('5%'),
    color: '#dbac00',
  },
  notesButton: {
    width: wp('40%'),
    height: hp('6%'),
    borderRadius: 10,
    backgroundColor: '#dbac00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesText: {
    fontSize: wp('4%'),
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  todoButton: {
    borderRadius: 10,
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: '#dbac00',
    marginHorizontal: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    color: 'white',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('50%'),
  },
  animation: {
    width: wp('120%'),
    height: hp('120%'),
  },
});

export default HomeScreen;
