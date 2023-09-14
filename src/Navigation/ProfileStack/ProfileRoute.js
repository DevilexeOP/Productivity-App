import {createStackNavigator} from '@react-navigation/stack';
import WorkSpaceHome from '../../Components/Workspace/WorkSpaceHome';
import ProfileHome from "../../Components/ProfileSpace/ProfileHome";

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
