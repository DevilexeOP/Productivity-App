import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DARKMODE } from "../../Config/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ROOT_URL } from "../../Config/constants";
import Snackbar from "react-native-snackbar";


const WorkSpace = ({navigation,route}) => {
  const {spaceId,jwtToken} = route.params;
  useEffect(() => {
    fetchData();
  }, []);
  // fetch token
  // navigation
  const navigationToHome = () => {
    navigation.navigate("WorkSpaceHome")
  }
  // fetching space data
  const fetchData = async () => {
      if (!jwtToken) {
        return;
      }
      try {
        const res = await fetch(`${ROOT_URL}/user/api/v1/workspace/${spaceId}`,{
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${jwtToken}`
          }
        })
        const data  = await res.json()
        if (res.status === 404 || res.status === 403) {
          Snackbar.show({
            text: data.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: "#FFB800",
            textColor: "black",
          });
        }
        else {
          console.log(data);
          // TODO MANAGE THE STATE OF THE DATA JSON RECEIVED FROM SERVER
        }
      }
      catch (e) {
          console.log(e)
      }
  }
  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity onPress={navigationToHome}>
          <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.hamBtn}/>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Workspace</Text>
        </View>
      </View>
      <View>
        <Text>

        </Text>
      </View>
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:DARKMODE.background
  },
  outContainer:{
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerContainer: {
    width: wp('80%'),
    height: null,
    justifyContent:'center',
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: wp('2%')
  },
  headerText: {
    fontSize: wp('4.8%'),
    fontWeight: '600',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    textAlign:'center'
  },
  workSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: DARKMODE.buttons,
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  hamBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor:DARKMODE.iconColor,
    marginHorizontal:wp('4%')
  },
})

export default WorkSpace;
