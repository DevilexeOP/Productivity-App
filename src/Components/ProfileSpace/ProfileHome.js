import React, {useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {ROOT_URL} from '../../Config/Constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {DARKMODE} from "../../Config/Colors";
import {useNavigation, useFocusEffect} from "@react-navigation/native";

const ProfileHome = () => {


    const navigation = useNavigation();

    useFocusEffect(()=>{
        fetchToken();
        getData();
    })

    const [token, setToken] = useState('');

    const fetchToken = async () => {
        const jwt = await AsyncStorage.getItem('token');
        if (jwt) {
            setToken(jwt);
        }
    };

    const getData = async () => {
        let userId = await  AsyncStorage.getItem('userId');
        try{
            const res = await fetch(`${ROOT_URL}/user/api/v1/profile/${userId}`,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data = await res.json();
            setName(data.name)
            setUserName(data.username)
            setEmail(data.email)
            console.log(JSON.stringify(data))
        }catch (e) {
            console.log(e);
        }
    }


    const [name,setName] = useState('')
    const [userName,setUserName]= useState('');
    const [email,setEmail] = useState('')

    const signOut = async () => {
        await AsyncStorage.removeItem('token');
        setName('');
        setUserName('');
        setEmail('');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth', screen: 'OnBoard' }],
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={require("../../Assets/profile.png")}
                       resizeMode="contain"/>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.labelName}>{name}</Text>
            <Text style={styles.labelUserName}>{userName}</Text>
            <Text style={styles.labelEmail}>{email}</Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.bottomContainer}>
                <View>
                    <TouchableOpacity onPress={signOut}>
                        <Text style={styles.labelSignOut}>Sign Out </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    profileImage: {
        width: '30%',
        height: '30%',
        marginLeft: hp('16%'),
        marginTop: wp('10%')
    },
    infoContainer:{
        width:'100%',
        height:'20%',
        marginTop:hp('-15%'),
    },
    bottomContainer:{
        width:'100%',
        height:'100%',
    },
    divider: {
        backgroundColor: DARKMODE.searchBox,
        width: wp('100%'),
        height: wp('.5%'),
        marginTop: wp('12%'),
    },
    labelName:{
        fontSize:hp('2.3%'),
        margin:wp('6%'),
        color:DARKMODE.profileTextColor,
    },
    labelUserName:{
        fontSize:hp('2.2%'),
        marginLeft:wp('8%'),
        color:DARKMODE.profileTextColorSecondary,
    },
    labelEmail:{
        fontSize:hp('2.3%'),
        margin:wp('6%'),
        color:DARKMODE.profileTextColor,
    },
    labelSignOut:{
        fontSize:hp('2.3%'),
        color:DARKMODE.signOutTextColor,
        display:'flex',
        textAlign:'right',
        marginTop:wp('80%'),
        marginRight:wp('5%')
    },

})

export default ProfileHome;
