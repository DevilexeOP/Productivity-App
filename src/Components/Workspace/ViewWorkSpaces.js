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
import {connect, useDispatch, useSelector} from 'react-redux';
import {updateAllWorkSpaces} from "../../Redux/Action-Creators";
import {DARKMODE} from "../../Config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROOT_URL } from "../../Config/constants";
import Snackbar from "react-native-snackbar";

const ViewWorkSpaces = ({navigation , route}) => {
    // fetch token when component mounts
    const [token,setToken] = useState('')
    const {jwt} =  route.params;
    useEffect(() => {
        getSpaces();
        console.log(jwt);
    }, []);
    // State managements
    const dispatch = useDispatch();
    const workspaces = useSelector(state => state.spaces.allWorkSpaces)
    // Navigation Functions
    const navigateToWorkspaceHome = () =>{
        navigation.navigate("WorkSpaceHome")
    }
    const navigateToCreateSpace = () =>{
        navigation.navigate("CreateWorkSpace")
    }

    // fetching all spaces
    const getSpaces = async () => {
        if (!jwt) {
            console.log("Token in get Space " + jwt)
            return;
        }
        try {
            const res = await fetch(`${ROOT_URL}/user/api/v1/workspaces`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${jwt}`
                }
            })
            const data = await res.json();
            if (res.status === 404) {
                Snackbar.show({
                    text: data.message,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: "#FFB800",
                    textColor: "black",
                });
            }
            else if (res.status === 200) {
                dispatch(updateAllWorkSpaces(data));
            }
        }
        catch (e){
            console.log(e);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.outContainer}>
                <TouchableOpacity onPress={navigateToWorkspaceHome}>
                    <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.hamBtn} />
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>All Workspaces</Text>
                </View>
            </View>
            <ScrollView>
                {/* TODO ALL WORK SPACES  */}
                <View style={styles.activityContainer}>
                    {workspaces.length === 0 ? (
                      <View>
                      <Text style={styles.noWorkspaceText}>No Workspaces found!</Text>
                      </View>
                    ) :(
                      workspaces.map(workspace => (
                        <TouchableOpacity
                          key={workspace._id}
                          style={styles.workspaceItem}
                          onPress={() => handleWorkspaceClick(workspace)}>
                         <View>
                             <Text>{workspace.workspace}</Text>
                         </View>
                        </TouchableOpacity>
                      ))
                    )}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:hp('13%')
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
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("3%"),
        tintColor: DARKMODE.iconColor,
        marginHorizontal: wp("4%"),
    },
    noWorkspaceText: {
        fontSize: 12,
        color: '#FFB800', // Dark yellow color
        textAlign: 'center',
        marginTop: 16,
    },
})

export default ViewWorkSpaces
