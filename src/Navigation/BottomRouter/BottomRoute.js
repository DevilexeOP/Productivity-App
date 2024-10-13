import {Image, View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductiveRoute from '../productiveStack/ProductiveRoute';
import WorkSpaceRoute from '../workspaceStack/WorkSpaceRoute';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DARKMODE} from '../../config/Colors';
import ProfileRoute from '../profileStack/ProfileRoute';

const BottomRouter = createBottomTabNavigator();

const BottomRoute = () => {
  return (
    <BottomRouter.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: DARKMODE.bottomNav,
          height: hp('8%'),
          position: 'absolute',
          bottom: hp('0.5%'),
          right: wp('3%'),
          left: wp('3%'),
          borderRadius: wp('2%'),
          elevation: 8,
          ...styles.navShadow,
        },
      }}>
      <BottomRouter.Screen
        name="Productive Space"
        component={ProductiveRoute}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: wp('3%'),
              }}>
              <Image
                source={require('../../assets/images/productive.png')}
                resizeMode="contain"
                style={{
                  width: wp('5%'),
                  height: wp('5%'),
                }}
              />
              <Text
                style={{
                  color: focused
                    ? DARKMODE.bottomNavActive
                    : DARKMODE.bottomNavInActive,
                  fontSize: wp('3%'),
                  fontFamily: 'Poppins-Bold',
                }}>
                Productive Space
              </Text>
            </View>
          ),
        }}
      />
      <BottomRouter.Screen
        name="Work Space"
        component={WorkSpaceRoute}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: wp('5%'),
              }}>
              <Image
                source={require('../../assets/images/workspace.png')}
                resizeMode="contain"
                style={{
                  width: wp('5%'),
                  height: wp('5%'),
                }}
              />
              <Text
                style={{
                  color: focused
                    ? DARKMODE.bottomNavActive
                    : DARKMODE.bottomNavInActive,
                  fontSize: wp('3%'),
                  fontFamily: 'Poppins-Bold',
                }}>
                Work Space
              </Text>
            </View>
          ),
        }}
      />
      <BottomRouter.Screen
        name="Profile"
        component={ProfileRoute}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/images/profile.png')}
                resizeMode="contain"
                style={{
                  width: wp('5%'),
                  height: wp('5%'),
                }}
              />
              <Text
                style={{
                  color: focused
                    ? DARKMODE.bottomNavActive
                    : DARKMODE.bottomNavInActive,
                  fontSize: wp('3%'),
                  fontFamily: 'Poppins-Bold',
                }}>
                Profile Space
              </Text>
            </View>
          ),
        }}
      />
    </BottomRouter.Navigator>
  );
};

const styles = StyleSheet.create({
  navShadow: {
    shadowColor: DARKMODE.shadowColor, // Customize the shadow color
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7, // Customize the shadow opacity
    shadowRadius: 4, //
  },
});

export default BottomRoute;
