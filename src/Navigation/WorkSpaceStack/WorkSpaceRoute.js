import { createStackNavigator } from "@react-navigation/stack";
import WorkSpaceHome from "../../Components/Workspace/WorkSpaceHome";
import CreateWorkSpace from "../../Components/Workspace/CreateWorkSpace";
import ViewWorkSpaces from "../../Components/Workspace/ViewWorkSpaces";
import WorkSpace from "../../Components/Workspace/WorkSpace";
import CreateChannel from "../../Components/Workspace/CreateChannel";
import Channel from "../../Components/Workspace/Channel";

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
