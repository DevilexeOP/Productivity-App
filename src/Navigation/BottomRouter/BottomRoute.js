import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductiveRoute from '../ProductiveStack/ProductiveRoute';
import WorkSpaceRoute from '../WorkSpaceStack/WorkSpaceRoute';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DARKMODE} from '../../Config/Colors';
import ProfileRoute from '../ProfileStack/ProfileRoute';

const BottomRouter = createBottomTabNavigator();

const BottomRoute = () => {
  return (
    <BottomRouter.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: DARKMODE.bottomNav,
          height: height,
          position: 'absolute',
          bottom: heightMarginBottom,
          borderRadius: wp('6%'),
          elevation: 8,
          ...styles.navShadow,
          width: wp('100%'),
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
                source={require('../../Assets/images/productive.png')}
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
                source={require('../../Assets/images/workspace.png')}
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
        name="ProfileSpace"
        component={ProfileRoute}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../Assets/images/profile.png')}
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

const screenHeight = Dimensions.get('screen').height;
const height = screenHeight * 0.08;
const heightMarginBottom = screenHeight * 0.0025;

const styles = StyleSheet.create({
  navShadow: {
    shadowColor: DARKMODE.shadowColor, // Customize the shadow color
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.7, // Customize the shadow opacity
    shadowRadius: 4, //
  },
});

export default BottomRoute;
