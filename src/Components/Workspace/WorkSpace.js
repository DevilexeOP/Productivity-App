import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import { DARKMODE } from "../../Config/Colors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ROOT_URL } from "../../Config/Constants";
import Snackbar from "react-native-snackbar";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateSpaceData } from "../../Redux/Action-Creators";

const WorkSpace = ({ navigation, route }) => {
    const { spaceId, jwtToken } = route.params;
    useEffect(() => {
        fetchData();
        navigation.addListener('focus', () => {
            fetchData();
        });
    }, []);
    // state management
    const dispatch = useDispatch();
    const data = useSelector(state => state.data.spaceData);
    const [defaultChannels, setDefaultChannels] = useState([]);
    // search state manage
    useEffect(() => {
        // Initialize defaultChannels when data changes
        setDefaultChannels(data.flatMap(workspace => workspace.channels));
    }, [data]);

    // search state manage
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredChannels, setFilteredChannels] = useState(defaultChannels);

    const searchQueryHandler = (text) => {
        setSearchQuery(text);

        // Filter channels based on the search query or reset to default if no query
        const filtered = text
            ? defaultChannels.filter(channel =>
                channel.channelName.toLowerCase().includes(text.toLowerCase())
            )
            : defaultChannels;
        setFilteredChannels(filtered);
    };
    // loading manage
    const [isLoading, setIsLoading] = useState(true);
    // Dropdown state manage
    const [toggleDrop,setToggleDrop] = useState(true)
    const toggleDropdown = () => {
        setToggleDrop(!toggleDrop);
        fetchData();
    };
    // navigation
    const navigationToHome = (token) => {
        navigation.navigate("ViewWorkSpaces",{
            jwtToken:token
        });
    };
    const navigateToCreateChannel = (token,id) => {
        navigation.navigate("CreateChannel" , {
            jwt:token,
            spaceId:id
        })
    }
    // fetching space data
    const fetchData = async () => {
        if (!jwtToken) {
            return;
        }
        try {
            const res = await fetch(`${ROOT_URL}/user/api/v1/workspace/${spaceId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`,
                },
            });
            const data = await res.json();
            if (res.status === 404 || res.status === 403) {
                Snackbar.show({
                    text: data.message,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: "#FFB800",
                    textColor: "black",
                });
                setIsLoading(true);
            } else {
                console.log(data);
                dispatch(updateSpaceData([data]));
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setIsLoading(true);
        }
    };
    // navigate to Chat in Channel
    const navigateToChat = (_id,jwt) => {
        navigation.navigate("Channel",{
            channelId:_id,
            jwtToken:jwt
        })
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.outContainer}>
                    <TouchableOpacity onPress={()=>navigationToHome(jwtToken)}>
                        <Image source={require("../../Assets/backlight.png")} alt="Back" style={styles.backBtn} />
                    </TouchableOpacity>
                    {data.map(info => (
                        <View style={styles.headerContainer} key={info._id}>
                            <Text style={styles.headerText}>{info.workspace}</Text>
                        </View>
                    ))}
                    <TouchableOpacity>
                        <Image source={require("../../Assets/settings.png")} alt="Back" style={styles.settingBtn} />
                    </TouchableOpacity>
                </View>
                {/*SEARCH CHANNELS & STUFF */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholderTextColor={DARKMODE.headerText}
                        placeholder={"Search"}
                        value={searchQuery}
                        onChangeText={searchQueryHandler}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity>
                        <Image source={require("../../Assets/adduserlight.png")} alt="Back" style={styles.memberBtn} />
                    </TouchableOpacity>
                </View>
                {/* LINE DIVIDE */}
                <View style={styles.divider}>
                </View>
                <View style={styles.channelContainer}>
                    <Text style={styles.channelHead}>Channels</Text>
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={()=>{
                            navigateToCreateChannel(jwtToken,spaceId)
                        }}>
                            <Image source={require("../../Assets/add.png")} alt="Back" style={styles.addBtn} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleDropdown}>
                            {toggleDrop ? (
                                <Image source={require("../../Assets/dropdownlight.png")} alt="Close" style={styles.dropwdownBtn} />
                            ) : (
                                <Image source={require("../../Assets/dropdownlight.png")} alt="Open" style={styles.dropwdownBtnClose} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                {toggleDrop && (
                    <ScrollView style={{ marginBottom: wp('20%') }}>
                        <View>
                            {isLoading ? (
                                <View>
                                    <Text style={styles.noWorkspaceText}>Loading....</Text>
                                </View>
                            ) : (
                                ((searchQuery.trim() && filteredChannels.length === 0) || (!searchQuery.trim() && defaultChannels.length === 0)) ? (
                                    <View>
                                        <Text style={styles.noWorkspaceText}>No channel found</Text>
                                    </View>
                                ) : (
                                    (searchQuery ? filteredChannels : defaultChannels).map(channel => {
                                        const trimmedChannelName = channel.channelName.trim();
                                        // Check if the trimmed channel name is not empty
                                        if (trimmedChannelName) {
                                            return (
                                                <TouchableOpacity
                                                    key={channel._id}
                                                    onPress={() =>navigateToChat(channel._id,jwtToken)}
                                                >
                                                    <View style={styles.container2}>
                                                        <Text style={styles.channelName}>#{trimmedChannelName}</Text>
                                                        <View style={styles.divider2}></View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        }
                                        return null; // Exclude channels with empty names
                                    })
                                )
                            )}
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DARKMODE.background,
    },
    outContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    headerContainer: {
        width: wp("75%"),
        height: null,
        justifyContent: "center",
    },
    buttonContainer: {
        marginVertical: wp("2%"),
    },
    headerText: {
        fontSize: wp("4.5%"),
        fontWeight: "600",
        marginVertical: hp("5%"),
        color: DARKMODE.headerText,
        textAlign: "center",
    },
    workSpaceButton: {
        borderRadius: 10,
        width: wp("60%"),
        height: hp("6%"),
        backgroundColor: DARKMODE.buttons,
    },
    backBtn: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("3%"),
        tintColor: DARKMODE.iconColor,
        marginHorizontal: wp("3.5%"),
    },
    settingBtn: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("2.6%"),
        tintColor: DARKMODE.iconColor,
        marginHorizontal: wp("1%"),
    },
    memberBtn: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("2.6%"),
        tintColor: DARKMODE.iconColor,
    },
    searchContainer:{
        backgroundColor:DARKMODE.searchBox,
        borderRadius:wp('2%'),
        padding:wp('3.5%'),
        marginLeft:wp('6%'),
        marginRight:wp('6%'),
    },
    searchInput:{
        color:DARKMODE.inputText,
        fontSize:wp('3.5%')
    },
    divider:{
        backgroundColor:DARKMODE.searchBox,
        width:wp('100%'),
        height:wp('.5%'),
        marginTop:wp('12%')
    },
    divider2:{
        backgroundColor:DARKMODE.searchBox,
        width:wp('100%'),
        height:wp('.2%'),
        marginTop:wp('2.5%')
    },
    btnContainer:{
        display:'flex',
        justifyContent:'flex-end',
        flexDirection:'row',
        marginRight:wp('5%'),
        marginBottom:wp('-4%'),
        top:wp('4%')
    },
    channelContainer :{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    addBtn: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("2%"),
        tintColor: DARKMODE.iconColor,
        marginRight:wp('4%')
    },
    dropwdownBtn: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("2%"),
        tintColor: DARKMODE.iconColor,
        marginRight:wp('4%'),
    },
    dropwdownBtnClose: {
        width: wp("4%"),
        height: wp("4%"),
        padding: wp("2%"),
        tintColor: DARKMODE.iconColor,
        marginRight:wp('4%'),
        transform: [{ rotate: '180deg'}]
    },
    channelHead:{
        color:DARKMODE.headerText,
        fontSize:wp('3.6%'),
        margin:wp('3%'),
    },
    btnsContainer:{
        display:'flex',
        flexDirection:'row',
    },
    noWorkspaceText: {
        fontSize: wp("4%"),
        color: DARKMODE.headerText, // Dark yellow color
        textAlign: "center",
        marginTop: wp("4%"),
    },
    channelName:{
        fontSize: wp("4%"),
        color: DARKMODE.iconColor, // Dark yellow color
        margin: wp("2.5%"),
    },
    container2:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    }
});

export default WorkSpace;
