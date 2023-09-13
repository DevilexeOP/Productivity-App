import { Image, View , Text } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductiveRoute from '../ProductiveStack/ProductiveRoute';
import WorkSpaceRoute from '../WorkSpaceStack/WorkSpaceRoute';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DARKMODE } from '../../Config/colors';

const BottomRouter = createBottomTabNavigator();

const BottomRoute = () => {
    return (
        <BottomRouter.Navigator
            screenOptions={{
                showIcon: true,
                showLabel: false,
                tabBarActiveTintColor: DARKMODE.headerText,
                tabBarActiveBackgroundColor:DARKMODE.bottomNavActive,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: DARKMODE.bottomNav,
                    height: hp("7.5%"),
                    flexDirection: 'row', // Make sure icons are aligned horizontally
                    justifyContent: 'center', // Center align icons horizontally
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    marginTop:hp('3%'),
                    fontSize: wp('4%'),
                    marginBottom:hp('1.3%'),
                    justifyContent:'center',
                },
            }}
        >
            <BottomRouter.Screen
                name="Productive Space"
                component={ProductiveRoute}
                options={{
                    headerShown: false,
                    tabBarIcon: () => {
                        return (
                            <View>
                                <Image
                                    style={{ width: wp('6%'), height: hp('3%') , padding:wp('4%') }}
                                    source={
                                        require("../../Assets/productive.png")
                                    }
                                />
                            </View>
                        );
                    },
                }}
            />
            <BottomRouter.Screen
                name="Work Space"
                component={WorkSpaceRoute}
                options={{
                    headerShown: false,
                    tabBarIcon: () => {
                        return (
                            <View >
                                <Image
                                    style={{ width: wp('6%'), height: hp('3%') , padding:wp('4%')  }}
                                    source={
                                        require("../../Assets/workspace.png")
                                    }
                                />
                            </View>
                        );
                    },
                }}
            />
        </BottomRouter.Navigator>
    );
};

export default BottomRoute;
