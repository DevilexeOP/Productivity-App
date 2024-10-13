import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import {DARKMODE} from '../../config/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ROOT_URL_KOYEB} from '@env';
import Snackbar from 'react-native-snackbar';
import {connect, useDispatch, useSelector} from 'react-redux';
import {updateSpaceData} from '../../redux/actioncreators';
import Clipboard from '@react-native-clipboard/clipboard';

const WorkSpace = ({navigation, route}) => {
  const {spaceId, jwtToken} = route.params;

  // state management
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.spaceData);
  const [defaultChannels, setDefaultChannels] = useState([]);
  console.log('Redux data:', data);

  useEffect(() => {
    fetchData();
    navigation.addListener('focus', () => {
      fetchData();
    });
  }, [spaceId, jwtToken]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset space data when navigating away
      dispatch(resetSpaceData());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  // fetching space data
  const fetchData = async () => {
    if (!jwtToken) {
      return;
    }
    try {
      console.log('AM i being called?' + 'Inside TRy catch');
      const res = await fetch(
        `${ROOT_URL_KOYEB}/user/api/v1/workspace/${spaceId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );
      const data = await res.json();
      if (res.status === 404 || res.status === 403) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        console.log(data.message);
        setIsLoading(true);
      } else {
        console.log('FUNC DATA', JSON.stringify(data, null, 2));
        dispatch(updateSpaceData([data]));
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(true);
    }
  };

  // search state manage
  useEffect(() => {
    setDefaultChannels(data.flatMap(workspace => workspace.channels));
  }, [data]);

  // search state manage
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChannels, setFilteredChannels] = useState(defaultChannels);

  // Invite link state
  const [inviteLink, setInviteLink] = useState('');

  const searchQueryHandler = text => {
    setSearchQuery(text);

    // Filter channels based on the search query or reset to default if no query
    const filtered = text
      ? defaultChannels.filter(channel =>
          channel.channelName.toLowerCase().includes(text.toLowerCase()),
        )
      : defaultChannels;
    setFilteredChannels(filtered);
  };
  // loading manage
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Dropdown state manage
  const [toggleDrop, setToggleDrop] = useState(true);
  const toggleDropdown = () => {
    setToggleDrop(!toggleDrop);
    fetchData();
  };
  // navigation
  const navigationToHome = token => {
    navigation.navigate('ViewWorkSpaces', {
      jwtToken: token,
    });
  };
  const navigateToCreateChannel = (token, id) => {
    navigation.navigate('CreateChannel', {
      jwt: token,
      spaceId: id,
    });
  };

  // Reset space data
  const resetSpaceData = () => ({type: 'RESET_SPACE_DATA'});

  // navigate to Chat in Channel
  const navigateToChat = (s_id, _id, jwt) => {
    navigation.navigate('Channel', {
      spaceId: s_id,
      channelId: _id,
      jwtToken: jwt,
    });
  };

  // generate workspace invite link
  const generateInviteLink = async () => {
    if (!jwtToken) return;
    try {
      const res = await fetch(`${ROOT_URL_KOYEB}/invite/api/v1/${spaceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const link = await res.json();
      if (res.ok) {
        Snackbar.show({
          text: 'Link Copied to Clipboard',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        copyLinkToClipBoard(link.inviteLink);
        console.log(inviteLink);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const copyLinkToClipBoard = link => {
    setInviteLink(link);
    Clipboard.setString(link);
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.outContainer}>
          <TouchableOpacity onPress={() => navigationToHome(jwtToken)}>
            <Image
              source={require('../../assets/images/backlight.png')}
              alt="Back"
              style={styles.backBtn}
            />
          </TouchableOpacity>
          {data.map(info => (
            <View style={styles.headerContainer} key={info._id}>
              <Text style={styles.headerText}>{info.workspace}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../assets/images/settings.png')}
              alt="Back"
              style={styles.settingBtn}
            />
          </TouchableOpacity>
        </View>
        {/*SEARCH CHANNELS & STUFF */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={DARKMODE.headerText}
            placeholder={'Search'}
            value={searchQuery}
            onChangeText={searchQueryHandler}
          />
        </View>
        {/* LINE DIVIDE */}
        <View style={styles.divider} />
        <View style={styles.channelContainer}>
          <Text style={styles.channelHead}>Channels</Text>
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              onPress={() => {
                navigateToCreateChannel(jwtToken, spaceId);
              }}>
              <Image
                source={require('../../assets/images/add.png')}
                alt="Back"
                style={styles.addBtn}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDropdown}>
              {toggleDrop ? (
                <Image
                  source={require('../../assets/images/dropdownlight.png')}
                  alt="Close"
                  style={styles.dropwdownBtn}
                />
              ) : (
                <Image
                  source={require('../../assets/images/dropdownlight.png')}
                  alt="Open"
                  style={styles.dropwdownBtnClose}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {toggleDrop && (
          <ScrollView style={{marginBottom: wp('20%')}}>
            <View>
              {isLoading ? (
                <View>
                  <Text style={styles.noWorkspaceText}>Loading....</Text>
                </View>
              ) : (searchQuery.trim() && filteredChannels.length === 0) ||
                (!searchQuery.trim() && defaultChannels.length === 0) ? (
                <View>
                  <Text style={styles.noWorkspaceText}>No channel found</Text>
                </View>
              ) : (
                (searchQuery ? filteredChannels : defaultChannels).map(
                  channel => {
                    const trimmedChannelName = channel.channelName.trim();
                    // Check if the trimmed channel name is not empty
                    if (trimmedChannelName) {
                      return (
                        <TouchableOpacity
                          key={channel._id}
                          onPress={() =>
                            navigateToChat(spaceId, channel._id, jwtToken)
                          }>
                          <View style={styles.container2}>
                            <Text style={styles.channelName}>
                              #{trimmedChannelName}
                            </Text>
                            <View style={styles.divider2} />
                          </View>
                        </TouchableOpacity>
                      );
                    }
                    return null; // Exclude channels with empty names
                  },
                )
              )}
            </View>
            {/* Modal */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Invite to Space</Text>
                  {/* Additional space for future elements */}
                  <View style={styles.additionalSpace} />

                  <TouchableOpacity
                    style={styles.inviteButton}
                    onPress={generateInviteLink}>
                    <View style={styles.inviteLinkContainer}>
                      <Image
                        source={require('../../assets/images/link.png')}
                        alt="Invite Link"
                        style={styles.modalLinkIcon}
                      />
                      <Text style={styles.modalLinkText}>
                        Generate Invite Link
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Additional space for new components */}
                  <View style={styles.additionalSpace} />
                  <View style={styles.modalButtonContainer}></View>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: wp('75%'),
    height: null,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: wp('2%'),
  },
  headerText: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    textAlign: 'center',
  },
  workSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: DARKMODE.buttons,
  },
  backBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp('3.5%'),
  },
  settingBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginLeft: wp('-5%'),
  },
  linkBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    alignSelf: 'flex-end',
  },
  searchContainer: {
    backgroundColor: DARKMODE.searchBox,
    borderRadius: wp('2%'),
    padding: wp('3.5%'),
    marginLeft: wp('6%'),
    marginRight: wp('6%'),
  },
  searchInput: {
    color: DARKMODE.inputText,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
  divider: {
    backgroundColor: DARKMODE.searchBox,
    width: wp('100%'),
    height: wp('.5%'),
    marginTop: wp('15%'),
  },
  divider2: {
    backgroundColor: DARKMODE.searchBox,
    width: wp('100%'),
    height: wp('.2%'),
    marginTop: wp('2.5%'),
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: wp('5%'),
    marginBottom: wp('-4%'),
    top: wp('4%'),
  },
  channelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('2%'),
    tintColor: DARKMODE.iconColor,
    marginRight: wp('4%'),
  },
  dropwdownBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('2%'),
    tintColor: DARKMODE.iconColor,
    marginRight: wp('4%'),
  },
  dropwdownBtnClose: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('2%'),
    tintColor: DARKMODE.iconColor,
    marginRight: wp('4%'),
    transform: [{rotate: '180deg'}],
  },
  channelHead: {
    color: DARKMODE.headerText,
    fontSize: wp('5%'),
    margin: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  noWorkspaceText: {
    fontSize: wp('5%'),
    color: DARKMODE.headerText, // Dark yellow color
    textAlign: 'center',
    marginTop: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  channelName: {
    fontSize: wp('4.2%'),
    color: DARKMODE.iconColor, // Dark yellow color
    margin: wp('3.5%'),
    fontFamily: 'Poppins-Medium',
  },
  container2: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalView: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARKMODE.headerText,
    borderRadius: wp('3%'),
    padding: wp('8%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp('0.2%'),
    },
    shadowOpacity: 0.25,
    shadowRadius: wp('2%'),
    elevation: 5,
    width: wp('90%'),
    height: hp('40%'),
  },
  modalLinkIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('2%'),
    tintColor: DARKMODE.white,
    padding: wp('3%'),
    marginTop: hp('2%'),
  },
  inviteLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('5%'),
  },
  modalLinkText: {
    fontSize: wp('4%'),
    color: DARKMODE.white,
    marginTop: hp('2%'),
    fontFamily: 'Poppins-Bold',
  },
  modalText: {
    fontSize: wp('5%'),
    fontFamily: 'Poppins-Bold',
    color: DARKMODE.black,
    marginBottom: hp('-1%'),
  },
  additionalSpace: {
    height: wp('10%'), // Add extra space between elements
  },
  inviteButton: {
    width: wp('60%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKMODE.black,
    borderRadius: 8,
  },
  cancelButton: {
    width: wp('40%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKMODE.black,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: DARKMODE.buttons,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
});

export default WorkSpace;
