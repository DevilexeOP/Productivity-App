import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {updateAllWorkSpaces, updateSpaceData} from '../../redux/actioncreators';
import {DARKMODE} from '../../config/Colors';
import {ROOT_URI_DEV} from '@env';
import Snackbar from 'react-native-snackbar';

const ViewWorkSpaces = ({navigation, route}) => {
  // fetch token when component mounts
  const {jwt} = route.params;
  // State managements
  const dispatch = useDispatch();
  const workspaces = useSelector(state => state.spaces.allWorkSpaces);
  const data = useSelector(state => state.data.spaceData);
  const [isLoading, setIsLoading] = useState(true);
  // console.log('Data in ALLWORKSPACES ' + JSON.stringify(data, null, 2));

  // Modal State Handle
  const [modalVisible, setModalVisible] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('');

  useEffect(() => {
    getSpaces();
    console.log(jwt);
  }, []);

  // Navigation Functions
  const navigateToWorkspaceHome = () => {
    navigation.navigate('WorkSpaceHome');
  };
  const navigateToCreateSpace = () => {
    navigation.navigate('CreateWorkSpace');
  };

  // navigate to specific space
  const handleWorkspace = (_id, token) => {
    console.log(_id);
    navigation.navigate('WorkSpace', {
      spaceId: _id,
      jwtToken: token,
    });
  };

  // fetching all spaces
  const getSpaces = async () => {
    if (!jwt) {
      console.log('Token in get Space ' + jwt);
      return;
    }
    try {
      const res = await fetch(`${ROOT_URI_DEV}/user/api/v1/workspaces`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        // console.log('Fetched workspaces:', data); // Debug here
        dispatch(updateAllWorkSpaces(data));
        setIsLoading(false);
      } else if (res.status === 404) {
        Snackbar.show({
          text: data.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FFB800',
          textColor: 'black',
        });
        setIsLoading(true);
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  // Join a Workspace
  const handleJoinWorkspace = async () => {
    if (!jwt) return;

    //workspaceId from the full invite link
    const linkRegex = /\/join\/([a-zA-Z0-9]+)/;
    const match = workspaceId.match(linkRegex);
    console.log(match);
    const extractedWorkspaceId = match ? match[1] : null;

    if (!extractedWorkspaceId) {
      Snackbar.show({
        text: 'Invalid Workspace Link',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF0000',
        textColor: 'white',
      });
      setModalVisible(false);
      return;
    }

    try {
      // Make a POST request to join the workspace using the extracted workspaceId
      const res = await fetch(
        `${ROOT_URI_DEV}/invite/api/v1/join/${extractedWorkspaceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        Snackbar.show({
          text: 'Successfully joined the workspace!',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#00FF00',
          textColor: 'white',
        });
      } else {
        Snackbar.show({
          text: data.message || 'Error joining workspace',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#FF0000',
          textColor: 'white',
        });
      }
    } catch (e) {
      console.log(e);
      Snackbar.show({
        text: 'Failed to join workspace',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF0000',
        textColor: 'white',
      });
    }

    // Reset modal state
    setModalVisible(false);
    setWorkspaceId('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity onPress={navigateToWorkspaceHome}>
          <Image
            source={require('../../assets/images/backlight.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>All Workspaces</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.workSpaceJoinIcon}
              source={require('../../assets/images/adduserlight.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{marginBottom: wp('-17%')}}>
        <View>
          {isLoading ? (
            <View>
              <Text style={styles.noWorkspaceText}>Loading....</Text>
            </View>
          ) : workspaces.length === 0 ? ( // Display "No workspace found" when there are no workspaces
            <View>
              <Text style={styles.noWorkspaceText}>No workspace found</Text>
            </View>
          ) : (
            workspaces.map(workspace => (
              <TouchableOpacity
                key={workspace._id}
                style={styles.workspaceItem}
                onPress={() => handleWorkspace(workspace._id, jwt)}>
                <View style={styles.workspaceContainer}>
                  <Text style={styles.spaceName}>{workspace.workspace}</Text>
                  <View style={styles.container2}>
                    <View style={styles.rowContainer}>
                      <Image
                        style={styles.membersIcon}
                        source={require('../../assets/images/members.png')}
                      />
                      <Text style={styles.members}>
                        {workspace.members.length}
                      </Text>
                    </View>
                    <Text style={styles.channelText}>
                      Channels {workspace.channels.length}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Workspace Link to Join</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Link"
              value={workspaceId}
              placeholderTextColor={`${DARKMODE.black}`}
              onChangeText={text => setWorkspaceId(text)}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={handleJoinWorkspace}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: 'black',
  },
  outContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    width: wp('80%'),
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('13%'),
  },
  workSpaceButton: {
    borderRadius: wp('2%'),
    width: wp('60%'),
    height: hp('6%'),
    marginBottom: wp('-1%'),
    backgroundColor: DARKMODE.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoText: {
    color: 'white',
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Medium',
  },
  hamBtn: {
    width: wp('4%'),
    height: wp('4%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp('3%'),
  },
  noWorkspaceText: {
    fontSize: wp('5%'),
    color: DARKMODE.headerText, // Dark yellow color
    textAlign: 'center',
    marginTop: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  workspaceContainer: {
    width: wp('90%'),
    display: 'flex',
    height: null,
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
    marginTop: wp('5%'),
    backgroundColor: DARKMODE.headerText,
    borderRadius: wp('1%'),
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp('2%'),
  },
  spaceName: {
    fontSize: wp('4.5%'),
    color: DARKMODE.iconColor,
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginBottom: wp('3%'),
    marginTop: wp('2%'),
    fontFamily: 'Poppins-Bold',
  },
  container2: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    padding: wp('2%'),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('2%'),
  },
  membersIcon: {
    width: wp('3%'),
    height: wp('3%'),
    padding: wp('2.3%'),
    tintColor: DARKMODE.iconColor,
    marginHorizontal: wp('1%'),
  },
  members: {
    fontSize: wp('4.2%'),
    color: DARKMODE.iconColor,
    marginRight: wp('5%'),
    fontFamily: 'Poppins-Bold',
  },
  channelText: {
    fontSize: wp('4%'),
    color: DARKMODE.iconColor,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  workSpaceJoinIcon: {
    width: wp('3%'),
    height: wp('3%'),
    padding: wp('3%'),
    tintColor: DARKMODE.iconColor,
    marginLeft: wp('-4%'),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
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
    height: hp('30%'),
  },
  modalText: {
    fontSize: wp('5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
    color: DARKMODE.black,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    height: hp('6%'),
    width: wp('80%'),
    color: DARKMODE.black,
    borderColor: 'gray',
    borderWidth: wp('0.3%'),
    borderRadius: wp('2%'),
    paddingLeft: wp('2.5%'),
    marginBottom: hp('3%'),
    fontFamily: 'Poppins-Medium',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('60%'),
  },
  joinButton: {
    backgroundColor: DARKMODE.black,
    width: wp('25%'),
    height: hp('6%'),
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
  cancelButton: {
    width: wp('25%'),
    height: hp('6%'),
    padding: wp('3%'),
    backgroundColor: DARKMODE.white,
    borderRadius: wp('2%'),
  },
  joinButtonText: {
    textAlign: 'center',
    color: DARKMODE.white,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
  cancelButtonText: {
    textAlign: 'center',
    color: DARKMODE.black,
    fontSize: wp('4%'),
    fontFamily: 'Poppins-Bold',
  },
});

export default ViewWorkSpaces;
