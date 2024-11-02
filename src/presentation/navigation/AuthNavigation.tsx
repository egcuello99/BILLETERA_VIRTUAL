import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";

import ForgotPasswordView from "../screens/auth/ForgotPasswordView";
import NewPasswordView from "../screens/auth/NewPasswordView";

export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ConfirmAccountView: undefined;
  RequesCodeView: undefined;
  ForgotPasswordView: undefined;
  NewPasswordView: undefined;
};
const Stack = createStackNavigator<RootStackParams>();

const AuthStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="LoginScreen"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="RegisterScreen"
      component={RegisterScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="ForgotPasswordView"
      component={ForgotPasswordView}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="NewPasswordView"
      component={NewPasswordView}
    />
  </Stack.Navigator>
);

export default AuthStackNavigator;
