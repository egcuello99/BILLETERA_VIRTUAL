import React, { useEffect, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuthStore } from "../../store/useAuthStore";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/MainNavigation";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatCurrency } from "../../../utils";
import { getUser } from "../../../actions/auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { user, setUser, logout } = useAuthStore();
  const [userData, setUserData] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getOneUser();
    }
  }, [userData]);

  const getOneUser = async () => {
    try {
      if (userData) {
        const data = await getUser(userData);
        if (data) {
          setUser(data as any);
        }
      }
    } catch (error) {
      console.log("Error al obtener los datos del usuario", error);
    }
  };

  const getUserData = async (): Promise<void> => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        setUserData(data.cedula);
      }
    } catch (error) {
      console.log("Error al obtener los datos del usuario", error);
    }
  };

  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <View style={{ paddingTop: top }} className="flex-1 w-full bg-slate-900">
        <View className="flex-row items-center justify-between mx-4 mt-4">
          <Pressable
            onPress={() => navigation.navigate("PerfilScreen")}
            className="flex-row items-center"
          >
            <AntDesign name="user" size={28} color="white" />
            <Text className="ml-2 text-lg font-bold text-violet-300">Hola</Text>
            <Text className="ml-1 text-lg font-bold text-white">
              {user?.name}
            </Text>
          </Pressable>
          <Button onPress={logout} className="p-0">
            <Ionicons name="exit" size={25} color="white" />
          </Button>
        </View>

        <View
          style={{
            height: height * 0.36,
            borderBottomLeftRadius: 140,
            borderBottomRightRadius: 140,
          }}
          className="items-center justify-center bg-slate-600 -z-10"
        >
          <Text className="mb-2 text-lg font-bold text-white">Deposito</Text>
          <Pressable onPress={toggleVisibility} className="mb-2">
            <AntDesign
              name={isVisible ? "eyeo" : "eye"}
              size={24}
              color="white"
            />
          </Pressable>
          <Text className="text-xl font-bold text-white">
            {isVisible ? formatCurrency(user?.saldo!) : "********"}
          </Text>
        </View>
      </View>

      <View className="flex-1 w-full bg-slate-900">
        <View className="flex-row flex-wrap justify-between gap-4 mx-6 mt-8">
          {user?.role === "user" && (
            <View className="w-[40%] bg-gray-800 p-4 items-center justify-center rounded-xl shadow-lg">
              <Pressable
                className="items-center justify-center w-full h-20"
                onPress={() => navigation.navigate("LoanScreen")}
              >
                <MaterialCommunityIcons
                  name="ticket-percent-outline"
                  size={40}
                  color="white"
                />
                <Text className="mt-2 font-semibold text-center text-white">
                  Solicitar Prestamo
                </Text>
              </Pressable>
            </View>
          )}
          {user?.role === "user" && (
            <View className="w-[40%] bg-gray-800 p-4 items-center justify-center rounded-xl shadow-lg">
              <Pressable
                className="items-center justify-center w-full h-20"
                onPress={() => navigation.navigate("StatusPrestamoScreen")}
              >
                <MaterialCommunityIcons
                  name="ticket-percent-outline"
                  size={40}
                  color="white"
                />
                <Text className="mt-2 font-semibold text-center text-white">
                  Estado Prestamo
                </Text>
              </Pressable>
            </View>
          )}
          {user?.role === "admin" && (
            <View className="w-[40%] bg-gray-800 p-4 items-center justify-center rounded-xl shadow-lg">
              <Pressable
                className="items-center justify-center w-full h-20"
                onPress={() => navigation.navigate("AdminLoads")}
              >
                <MaterialCommunityIcons
                  name="ticket-percent-outline"
                  size={40}
                  color="white"
                />
                <Text className="mt-2 font-semibold text-center text-white">
                  Gestionar Prestamos
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
