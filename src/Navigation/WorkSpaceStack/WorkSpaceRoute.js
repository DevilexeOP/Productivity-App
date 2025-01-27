import {createStackNavigator} from '@react-navigation/stack';
import WorkSpaceHome from '../../components/workspace/WorkSpaceHome';
import CreateWorkSpace from '../../components/workspace/CreateWorkSpace';
import AllWorkSpaces from '../../components/workspace/AllWorkSpaces';
import WorkSpaceInfo from '../../components/workspace/WorkSpaceInfo';
import CreateChannel from '../../components/workspace/CreateChannel';
import Channel from '../../components/workspace/Channel';

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
      <WorkSpaceStack.Screen
        name="CreateWorkSpace"
        component={CreateWorkSpace}
        options={{
          headerShown: false,
        }}
      />
      <WorkSpaceStack.Screen
        name="AllWorkSpaces"
        component={AllWorkSpaces}
        options={{
          headerShown: false,
        }}
      />
      <WorkSpaceStack.Screen
        name="WorkSpaceInfo"
        component={WorkSpaceInfo}
        options={{
          headerShown: false,
        }}
      />
      <WorkSpaceStack.Screen
        name="CreateChannel"
        component={CreateChannel}
        options={{
          headerShown: false,
        }}
      />
      <WorkSpaceStack.Screen
        name="Channel"
        component={Channel}
        options={{
          headerShown: false,
        }}
      />
    </WorkSpaceStack.Navigator>
  );
};

export default WorkSpaceRoute;
