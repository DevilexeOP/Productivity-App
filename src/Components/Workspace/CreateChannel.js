import React, {useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {actionCreators} from '../../redux/index';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {DARKMODE} from '../../config/Colors';
import {ROOT_URL_KOYEB} from '@env';
import Snackbar from 'react-native-snackbar';

const CreateChannel = ({navigation, route}) => {
  const {spaceId, jwt} = route.params;
  // state manage
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const channelName = useSelector(state => state.channel.channelName);
  const handleChannelName = val => {
    actions.updateChannelName(val);
  };
  // create channel function
  const createChannel = async () => {
    if (!jwt) {
      return;
    }
    try {
      const res = await fetch(
        `${ROOT_URL_KOYEB}/user/api/v1/channel/add/${spaceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            channelName,
          }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        navigation.goBack();
        actions.updateChannelName('');
      } else if (res.status === 400) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  // navigation
  const navigateToSpace = id => {
    navigation.navigate('WorkSpace', {
      spaceId: id,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateToSpace(spaceId);
          }}>
          <Image
            source={require('../../assets/images/backlight.png')}
            alt="Back"
            style={styles.backBtn}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create Channel</Text>
        </View>
      </View>
      {/*  CREATE CHANNEL & SAVE */}
      <View style={styles.channelBox}>
        <Text style={styles.labelHead}>Name</Text>
      </View>
      <View style={styles.addContainer}>
        <Text style={styles.labelhash}>#</Text>
        <TextInput
          value={channelName}
          onChangeText={handleChannelName}
          style={styles.channelInput}
          placeholder={'project-features'}
          placeholderTextColor={DARKMODE.placeholder}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Channels are where you can communicate with your team . Choose a
          unique channel name for your workspace
        </Text>
      </View>
      <View style={styles.createContainer}>
        <TouchableOpacity style={styles.btn} onPress={createChannel}>
          <Text style={styles.createText}>Create Channel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARKMODE.background,
  },
  outContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: wp('75%'),
    height: null,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    textAlign: 'center',
  },
  backBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp('3.5%'),
  },
  channelBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: wp('12%'),
  },
  labelHead: {
    color: DARKMODE.iconColor,
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Medium',
  },
  addContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelhash: {
    fontSize: wp('5%'),
    color: DARKMODE.placeholder,
  },
  channelInput: {
    width: wp('80%'),
    height: wp('12%'),
    backgroundColor: 'white',
    margin: wp('5%'),
    padding: wp('3%'),
    color: DARKMODE.black,
    fontSize: wp('4%'),
    borderRadius: wp('1%'),
    fontFamily: 'Poppins-Medium',
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: wp('5%'),
  },
  infoText: {
    color: DARKMODE.infoText,
    fontSize: wp('3.2%'),
    fontFamily: 'Poppins-Bold',
  },
  createContainer: {
    marginTop: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    color: DARKMODE.iconColor,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  btn: {
    width: wp('60%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKMODE.buttons,
    height: wp('12%'),
    borderRadius: wp('2%'),
  },
});

export default CreateChannel;
