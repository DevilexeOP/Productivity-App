import {createStackNavigator} from '@react-navigation/stack';
import ProfileHome from '../../Components/ProfileSpace/ProfileHome';

const ProfileStack = createStackNavigator();

const ProfileRoute = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileRoute;
