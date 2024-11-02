import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../../../../navigation/MainNavigation";

export const HomeInteresCompuestoScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-slate-800">
      <View className="bg-fuchsia-600 p-2">
        <Text className="text-center text-white font-bold text-lg">
          Interes Compuesto
        </Text>
      </View>
      <View>
        <Text className="text-justify p-2 text-white">
          El interés compuesto es un tipo de interés que se calcula en función
          del valor presente del activo, lo que puede ser dinero, bienes o
          cualquier otro tipo de activo financiero. En este tipo de interés, el
          interés se aplica a la cantidad acumulada, no a la cantidad inicial.
        </Text>
        <View className="flex-col">
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("MontoFuturoCompuesto")}
          >
            <Text className="text-md font-bold text-white">Valor Futuro</Text>
          </Button>
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("TasaInteresCompuesto")}
          >
            <Text className="text-md font-bold text-white">Tasa Interes</Text>
          </Button>
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("TiempoCompuestoScreen")}
          >
            <Text className="text-md font-bold text-white">Tiempo</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
