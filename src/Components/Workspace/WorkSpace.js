import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DARKMODE } from "../../Config/colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


const WorkSpace = ({navigation,route}) => {
  const {title,project} = route.params;
  useEffect(() => {
    console.log(title,project)
  }, []);

  // navigation
  const navigationToHome = () => {
    navigation.navigate("WorkSpaceHome")
  }
  return (
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity onPress={navigationToHome}>
          <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.hamBtn}/>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{title ? title : "My Workspace"}</Text>
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
