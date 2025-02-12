import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// navigator
// Components
import BottomRoute from './BottomRouter/BottomRoute';

const AppStack = createStackNavigator();

const AppRoute = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen
                name="BottomStack"
                component={BottomRoute}
                options={{headerShown: false}}
            />
        </AppStack.Navigator>
    );
};

export default AppRoute;
