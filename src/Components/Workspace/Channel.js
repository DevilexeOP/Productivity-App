import React, { useEffect } from "react";
import { Text, View, TextInput, Image, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { actionCreators } from "../../Redux/index";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { DARKMODE } from "../../Config/colors";
import { ROOT_URL } from "../../Config/constants";
import Snackbar from "react-native-snackbar";


const Channel = ({ route }) => {
    const { channelId, jwtToken } = route.params;
    const dispatch = useDispatch();
    const actions = bindActionCreators(actionCreators, dispatch);
    const data =  useSelector(state=>state.data.spaceData)
    useEffect(() => {
        console.log(channelId, jwtToken);
    }, []);
    // fetching channel data
    const fetchData = () => {

    }
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DARKMODE.background,
    },
});

export default Channel;
