import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateAllWorkSpaces } from "../../Redux/Action-Creators";
import { DARKMODE } from "../../Config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROOT_URL } from "../../Config/constants";
import Snackbar from "react-native-snackbar";

const ViewWorkSpaces = ({ navigation, route }) => {
    // fetch token when component mounts
    const { jwt } = route.params;
    useEffect(() => {
        getSpaces();
        console.log(jwt);
    }, []);
    // State managements
    const dispatch = useDispatch();
    const workspaces = useSelector(state => state.spaces.allWorkSpaces);
    // Navigation Functions
    const navigateToWorkspaceHome = () => {
        navigation.navigate("WorkSpaceHome");
    };
    const navigateToCreateSpace = () => {
        navigation.navigate("CreateWorkSpace");
    };

    // navigate to specific space
    const handleWorkspace = (_id , token) => {
        navigation.navigate("WorkSpace",{
            spaceId:_id,
            jwtToken:token
        })
    }

    // fetching all spaces
    const getSpaces = async () => {
        if (!jwt) {
            console.log("Token in get Space " + jwt);
            return;
        }
        try {
            const res = await fetch(`${ROOT_URL}/user/api/v1/workspaces`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
            });
            const data = await res.json();
            if (res.status === 404) {
                Snackbar.show({
                    text: data.message,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: "#FFB800",
                    textColor: "black",
                });
            } else if (res.status === 200) {
                dispatch(updateAllWorkSpaces(data));
            }
        } catch (e) {
            console.log(e);
        }
    };
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
            <ScrollView style={{ marginBottom: wp("-17%") }}>
                <View>
                    {workspaces.length === 0 ? (
                        <View>
                            <Text style={styles.noWorkspaceText}>No Workspaces found!</Text>
                        </View>
                    ) : (
                        workspaces.map(workspace => (
                            <TouchableOpacity
                                key={workspace._id}
                                style={styles.workspaceItem}
                                onPress={() => handleWorkspace(workspace._id , jwt)}>
                                <View style={styles.workspaceContainer}>
                                    <Text style={styles.spaceName}>{workspace.workspace}</Text>
                                    <View style={styles.container2}>
                                        <View style={styles.rowContainer}>
                                            <Image style={styles.membersIcon} source={require("../../Assets/members.png")} />
                                            <Text style={styles.members}>{workspace.members.length}</Text>
                                        </View>
                                        <Text style={styles.channelText}>Channels: {workspace.channels.length}</Text>
                                    </View>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp("13%"),
    },
    workSpaceButton: {
        borderRadius: wp("2%"),
        width: wp("60%"),
        height: hp("6%"),
        marginBottom: wp("-1%"),
        backgroundColor: DARKMODE.buttons,
        justifyContent: "center",
        alignItems: "center",
    },
    todoText: {
        color: "white",
        fontSize: wp("3%"),
        fontWeight: "bold",
    },
    hamBtn: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("3%"),
        tintColor: DARKMODE.iconColor,
        marginHorizontal: wp("4%"),
    },
    noWorkspaceText: {
        fontSize: wp("5%"),
        color: DARKMODE.headerText, // Dark yellow color
        textAlign: "center",
        marginTop: wp("4%"),
    },
    workspaceContainer: {
        width: wp("90%"),
        display: "flex",
        height: null,
        marginLeft: wp("4%"),
        marginRight: wp("4%"),
        marginTop: wp("5%"),
        backgroundColor: DARKMODE.headerText,
        borderRadius: wp("1%"),
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        padding:wp('2%')
    },
    spaceName: {
        fontSize: wp("4%"),
        color: DARKMODE.iconColor,
        marginLeft: wp("2%"),
        marginRight: wp("2%"),
        marginBottom: wp("3%"),
        marginTop: wp("2%"),
        fontWeight: "700",
    },
    container2: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flex: 1,
        padding: wp("2%"),
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: wp("2%"),
    },
    membersIcon: {
        width: wp("3%"),
        height: wp("3%"),
        padding: wp("2.3%"),
        tintColor: DARKMODE.iconColor,
        marginHorizontal: wp("1%"),
    },
    members: {
        fontSize: wp("3.6%"),
        color: DARKMODE.iconColor,
        marginRight: wp("5%"),
    },
    channelText: {
        fontSize: wp("3.2%"),
        color: DARKMODE.iconColor,
        textAlign: "center",
        fontWeight:'700'
    },
});

export default ViewWorkSpaces;
