import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthStore } from "../store/useAuthStore";
import MainNavigator from "./MainNavigation";
import AuthStackNavigator from "./AuthNavigation";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { status, user } = useAuthStore();
  return (
    <Stack.Navigator>
      {user?.role === "admin" && status === "authenticated" ? (
        <Stack.Screen
          name="Admin"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      ) : user?.role === "user" && status === "authenticated" ? (
        <Stack.Screen
          name="User"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
