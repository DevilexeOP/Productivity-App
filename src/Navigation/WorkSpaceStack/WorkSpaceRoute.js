import {createStackNavigator} from '@react-navigation/stack';
import WorkSpaceHome from '../../Components/Workspace/WorkSpaceHome';

const WorkSpaceStack = createStackNavigator();

const WorkSpaceRoute = () => {
  return (
    <WorkSpaceStack.Navigator>
      <WorkSpaceStack.Screen
        name="WorkSpaceHome"
        component={WorkSpaceHome}
        options={{
          headerShown: false,
        }}
      />
    </WorkSpaceStack.Navigator>
  );
};

export default WorkSpaceRoute;
