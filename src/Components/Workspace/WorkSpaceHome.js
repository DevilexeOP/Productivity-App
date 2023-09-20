import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet, Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DARKMODE} from "../../Config/colors";
import ViewWorkSpaces from "./ViewWorkSpaces";

const WorkSpaceHome = ({navigation}) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken()
  }, []);

  const getToken = async () => {
    const jwt = await AsyncStorage.getItem('token')
    setToken(jwt)
  }

  // navigation
  const navigateToCreate = () =>{
    navigation.navigate("CreateWorkSpace")
  }
  const navigateToView = () =>{
    navigation.navigate("ViewWorkSpaces" , {
      jwt:token
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity onPress={()=>{
          return;
        }}>
          <Image source={require("../../Assets/hamdark.png")} alt="Back" style={styles.hamBtn} />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Recent Activity</Text>
        </View>
      </View>
      <ScrollView>
          {/* TODO DISPLAYING RECENT ACTIVITY */}
          <View style={styles.activityContainer}>

          </View>
      </ScrollView>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.workSpaceButton}
          onPress={() => {
            navigateToCreate();
          }}>
          <Text style={styles.todoText}>Add Workspace</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.viewSpaceButton}
          onPress={() => {
            navigateToView();
          }}>
          <Text style={styles.todoText}>View Workspaces</Text>
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
  outContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    width: wp("80%"),
    height: null,
    justifyContent: "center",
  },
  headerText: {
    fontSize: wp("4.8%"),
    fontWeight: "600",
    marginVertical: hp("5%"),
    color: DARKMODE.headerText,
    textAlign: "center",
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:hp('-12%')
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:hp('14%')
  },
  workSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor:DARKMODE.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: DARKMODE.secondaryButtons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    color: 'white',
    fontSize: wp('3%'),
    fontWeight: 'bold',
  },
  hamBtn: {
    width: wp("4%"),
    height: wp("4%"),
    padding: wp("3%"),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp("4%"),
  },
});

export default WorkSpaceHome;
