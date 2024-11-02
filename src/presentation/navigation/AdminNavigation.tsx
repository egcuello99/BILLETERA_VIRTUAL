import { createStackNavigator } from "@react-navigation/stack";
import { AdminLoadsScreen } from "../screens/loans/AdminLoadsScreen";

export type RootStackParams = {
  AdminLoads: undefined;
};

const Stack = createStackNavigator<RootStackParams>();
function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminLoads"
        component={AdminLoadsScreen}
      />
    </Stack.Navigator>
  );
}

export default AdminNavigator;
