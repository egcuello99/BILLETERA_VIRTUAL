import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../../../../navigation/MainNavigation";

export const HomeInteresSimpleScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-slate-800">
      <View className="bg-fuchsia-600 p-2">
        <Text className="text-center text-white font-bold text-lg">
          Interes Simple
        </Text>
      </View>
      <View>
        <Text className="text-justify p-2 text-white">
          El interés simple es una tasa de interés que se aplica a una principal
          que se mantiene constante durante el tiempo en el que se invierte.
        </Text>
        <View className="flex-col">
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("ValorFuturo")}
          >
            <Text className="text-md font-bold text-white">Valor Futuro</Text>
          </Button>
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("TasaInteresScreen")}
          >
            <Text className="text-md font-bold text-white">Tasa Interes</Text>
          </Button>
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("TiempoScreen")}
          >
            <Text className="text-md font-bold text-white">Tiempo</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
