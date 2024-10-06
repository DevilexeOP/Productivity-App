import {createStackNavigator} from '@react-navigation/stack';
import WorkSpaceHome from '../../components/workspace/WorkSpaceHome';
import CreateWorkSpace from '../../components/workspace/CreateWorkSpace';
import ViewWorkSpaces from '../../components/workspace/ViewWorkSpaces';
import WorkSpace from '../../components/workspace/WorkSpace';
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
        name="ViewWorkSpaces"
        component={ViewWorkSpaces}
        options={{
          headerShown: false,
        }}
      />
      <WorkSpaceStack.Screen
        name="WorkSpace"
        component={WorkSpace}
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
