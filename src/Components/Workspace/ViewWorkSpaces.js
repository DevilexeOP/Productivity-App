import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../Redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from "../../Config/colors";

const ViewWorkSpaces = ({navigation}) => {
    // State managements

    // Navigation Fnctions
    const navigateToWorkspaceHome = () =>{
        navigation.navigate("WorkSpaceHome")
    }
    const navigateToCreateSpace = () =>{
        navigation.navigate("CreateWorkSpace")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={navigateToWorkspaceHome}>
                    <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.hamBtn}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Workspaces</Text>
            </View>
            <ScrollView>
                {/* TODO ALL WORK SPACES  */}
                <View style={styles.activityContainer}>

                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.workSpaceButton}
                    onPress={() => {
                        navigateToCreateSpace();
                    }}>
                    <Text style={styles.todoText}>Add Work Space</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: wp('100%'),
        height: null,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:hp('13%')
    },
    headerText: {
        fontSize: wp('6.5%'),
        fontWeight: '600',
        marginVertical: hp('5%'),
        color: DARKMODE.headerText,
        marginRight: wp('25%')
    },
    workSpaceButton: {
        borderRadius: 10,
        width: wp('60%'),
        height: hp('6%'),
        backgroundColor:DARKMODE.buttons,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoText: {
        color: 'white',
        fontSize: wp('3%'),
        fontWeight: 'bold',
    },
    hamBtn: {
        width: wp('4%'),
        height: wp('4%'),
        padding: wp('3%'),
        marginHorizontal: wp('10%'),
        tintColor:DARKMODE.iconColor
    },
})

export default ViewWorkSpaces
