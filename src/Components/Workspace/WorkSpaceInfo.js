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
  Share,
} from 'react-native';
import {DARKMODE} from '../../Config/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSpaceData,
  updateResetSpaceData,
} from '../../Redux/actioncreators';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const WorkSpaceInfo = ({navigation, route}) => {
  const {title, project, spaceId, jwtToken} = route.params;
  const [token, setToken] = useState('');
  // state management
  const dispatch = useDispatch();
  const data = useSelector(state => state.data.spaceData);
  const [defaultChannels, setDefaultChannels] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [paramsTitle, setParamsTitle] = useState('');
  useEffect(() => {
    const getTitle = () => {
      setParamsTitle(title);
    };
    const getToken = async () => {
      const jwt = await AsyncStorage.getItem('token');
      setToken(jwt);
    };
    getToken();
    getTitle();
    console.log(jwtToken + ' From recent activity ');
    const focusListener = navigation.addListener('focus', () => {
      getToken();
      getTitle();
    });
    return () => {
      focusListener();
    };
    /*
     eslint-disable-next-line
    */
  }, [navigation]);

  useEffect(() => {
    console.log(
      'workspace title from params ' +
        title +
        ' workspace prj from params ' +
        project,
    );
    const unsubscribeFocus = navigation.addListener('focus', () => {
      // console.log('Screen focused, fetching data...');
      fetchData();
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      dispatch(updateResetSpaceData([]));
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
    /*
     eslint-disable-next-line
    */
  }, [navigation, spaceId, jwtToken]);

  // fetching space data
  const fetchData = async () => {
    if (!jwtToken) {
      return;
    }
    try {
      const res = await fetch(
        `${Config.ROOT_URL}/user/api/v1/workspace/${spaceId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      // eslint-disable-next-line no-shadow
      const data = await res.json();
      console.log('data from api ' + JSON.stringify(data));
      if (res.status === 404 || res.status === 403) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        setIsLoading(true);
      } else if (res.status >= 200 && res.status < 300) {
        dispatch(updateSpaceData([data]));
        setIsLoading(false);
      } else {
        console.error('Unexpected response status:', res.status);
        setIsLoading(true);
      }
    } catch (e) {
      console.error('Error during fetch:', e);
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
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Dropdown state manage
  const [toggleDrop, setToggleDrop] = useState(true);
  const toggleDropdown = () => {
    setToggleDrop(!toggleDrop);
    fetchData();
  };
  // navigation
  const navigationToHome = token => {
    setParamsTitle('');
    navigation.navigate('AllWorkSpaces', {
      jwtToken: token,
    });
  };
  const navigateToCreateChannel = (token, id) => {
    navigation.navigate('CreateChannel', {
      jwt: token,
      spaceId: id,
    });
  };

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
    if (!jwtToken) {
      return;
    }
    setSpinner(true);
    try {
      const res = await fetch(`${Config.ROOT_URL}/invite/api/v1/${spaceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const link = await res.json();
      if (res.ok) {
        setSpinner(false);
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
      setSpinner(false);
      console.log(e);
    }
  };

  // share invite link
  const shareInviteLink = async () => {
    if (!jwtToken) {
      return;
    }
    setSpinner(true);
    try {
      const res = await fetch(`${Config.ROOT_URL}/invite/api/v1/${spaceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const link = await res.json();
      if (res.ok) {
        setSpinner(false);
        try {
          await Share.share({
            message: `Here's the invite link to join the workspace: ${link.inviteLink} 
            \nIf you dont have the application https://appdistribution.firebase.dev/i/bdeb6de1b737a080 request access from here ! `,
            url: link.inviteLink,
          });
        } catch (error) {
          setSpinner(false);
          console.log('Error sharing invite link:', error);
        }
      }
    } catch (e) {
      setSpinner(false);
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
        <Spinner
          visible={spinner}
          textContent={'Please wait...'}
          textStyle={styles.spinnerTextStyle}
          color={`${DARKMODE.headerText}`}
          overlayColor="rgba(0, 0, 0, 0.75)"
        />
        <View style={styles.outContainer}>
          <TouchableOpacity onPress={() => navigationToHome(jwtToken)}>
            <Image
              source={require('../../Assets/images/backlight.png')}
              alt="Back"
              style={styles.backBtn}
            />
          </TouchableOpacity>
          {data.map(info => (
            <View style={styles.headerContainer} key={info._id}>
              <Text style={styles.headerText}>
                {info.workspace ? info.workspace : paramsTitle}
              </Text>
            </View>
          ))}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../Assets/images/settings.png')}
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
                source={require('../../Assets/images/add.png')}
                alt="Back"
                style={styles.addBtn}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDropdown}>
              {toggleDrop ? (
                <Image
                  source={require('../../Assets/images/dropdownlight.png')}
                  alt="Close"
                  style={styles.dropwdownBtn}
                />
              ) : (
                <Image
                  source={require('../../Assets/images/dropdownlight.png')}
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
                        source={require('../../Assets/images/link.png')}
                        alt="Invite Link"
                        style={styles.modalLinkIcon}
                      />
                      <Text style={styles.modalLinkText}>
                        Generate Invite Link
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.inviteButton}
                    onPress={shareInviteLink}>
                    <View style={styles.inviteLinkContainer}>
                      <Image
                        source={require('../../Assets/images/sharesocial.png')}
                        alt="Share Invite Link"
                        style={styles.modalLinkIcon}
                      />
                      <Text style={styles.modalLinkText}>
                        Share Invite Link
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Additional space for new components */}
                  <View style={styles.additionalSpace} />
                  <View style={styles.modalButtonContainer} />
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: wp('75%'),
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    marginRight: wp('4%'),
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARKMODE.headerText,
    borderRadius: wp('3%'),
    padding: wp('8%'),
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
    marginRight: wp('2.5%'),
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
    height: wp('10%'),
  },
  inviteButton: {
    width: wp('60%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARKMODE.black,
    borderRadius: 8,
    margin: wp('1%'),
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

export default WorkSpaceInfo;
