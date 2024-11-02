import React, { PropsWithChildren, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../navigation/MainNavigation";
import { useAuthStore } from "../store/useAuthStore";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { status, checkSession } = useAuthStore();

  // useEffect(() => {
  //   checkSession();
  // }, []);
  // useEffect(() => {
  //   checkSession();
  // }, [status, checkSession]);

  useEffect(() => {
    if (status !== "checking") {
      if (status === "authenticated") {
        navigation.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      }
    }
  }, [status, navigation]);

  return <>{children}</>;
};
