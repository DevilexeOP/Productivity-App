import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DARKMODE} from '../../Config/Colors';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import Config from 'react-native-config';

const WorkSpaceHome = ({navigation}) => {
  const [token, setToken] = useState('');
  const [recentWorkspace, setRecentWorkSpace] = useState([]);
  const [spaceId, setSpaceId] = useState('');
  const fetchToken = async () => {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      setToken(jwt);
    }
    return jwt;
  };

  // getting recent workspace limit 1 or 2
  const getRecentWorkspace = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await fetch(
        `${Config.ROOT_URL}/user/api/v1/workspace/latest`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      data.forEach(item => {
        setSpaceId(item._id);
      });
      if (response.ok) {
        setRecentWorkSpace([...data]);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const jwt = await fetchToken();
        if (jwt) {
          await getRecentWorkspace();
        }
      };
      fetchData();
    }, [token]),
  );

  // navigation
  const navigateToCreate = () => {
    navigation.navigate('CreateWorkSpace', {
      jwt: token,
    });
  };
  const navigateToView = () => {
    navigation.navigate('AllWorkSpaces', {
      jwt: token,
    });
  };
  const navigateToWorkspace = () => {
    console.log(token + ' Navigate fnc ');
    navigation.navigate('WorkSpaceInfo', {
      spaceId: spaceId,
      jwtToken: token,
      title: recentWorkspace.title,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outContainer}>
        <TouchableOpacity
          onPress={() => {
            showMessage({
              message: 'Come back later , Under Development !',
              type: 'info',
              icon: 'info',
              position: 'top',
              duration: 3000,
              backgroundColor: DARKMODE.headerText,
            });
          }}>
          <Image
            source={require('../../Assets/images/hamdark.png')}
            alt="Back"
            style={styles.hamBtn}
          />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Recent Activity</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.activityContainer}>
          {recentWorkspace.length > 0 && (
            <>
              {recentWorkspace.map((space, index) => (
                <TouchableOpacity key={index} onPress={navigateToWorkspace}>
                  <View style={styles.workspaceContainer}>
                    <Text style={styles.spaceName}>{space.workspace}</Text>
                    <View style={styles.container2}>
                      <View style={styles.rowContainer}>
                        <Image
                          style={styles.membersIcon}
                          source={require('../../Assets/images/members.png')}
                        />
                        <Text style={styles.members}>
                          {space.members.length}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer1}>
        <TouchableOpacity
          style={styles.workSpaceButton}
          onPress={() => {
            navigateToCreate();
          }}>
          <Text style={styles.todoText}>Add Workspace</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer2}>
        <TouchableOpacity
          style={styles.viewSpaceButton}
          onPress={() => {
            navigateToView();
          }}>
          <Text style={styles.todoText}>View Workspaces</Text>
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
    fontWeight: '600',
    marginVertical: hp('5%'),
    color: DARKMODE.headerText,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('-12%'),
  },
  workspaceContainer: {
    width: wp('90%'),
    display: 'flex',
    height: null,
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
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('14%'),
  },
  workSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: DARKMODE.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSpaceButton: {
    borderRadius: 10,
    width: wp('60%'),
    height: hp('6%'),
    backgroundColor: DARKMODE.secondaryButtons,
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
    marginHorizontal: wp('4%'),
  },
  activityContainer: {
    display: 'flex',
    padding: wp('5%'),
  },
  item: {
    backgroundColor: DARKMODE.headerText,
    padding: wp('4%'),
    borderRadius: 8,
    marginBottom: hp('2%'),
    shadowColor: DARKMODE.headerText,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 3,
    elevation: 5,
  },
  workspaceText: {
    color: DARKMODE.black,
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  projectText: {
    color: DARKMODE.white,
    fontSize: wp('5%'),
    textAlign: 'right',
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
});

export default WorkSpaceHome;
