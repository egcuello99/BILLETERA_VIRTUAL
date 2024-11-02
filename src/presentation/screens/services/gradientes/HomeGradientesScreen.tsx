import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../../../navigation/MainNavigation";

export const HomeGradienteScreen = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-slate-800">
      <View className="bg-fuchsia-600 p-2">
        <Text className="text-center text-white font-bold text-lg">
          Gradiente Aritmetico
        </Text>
      </View>
      <View>
        <Text className="text-justify p-2 text-white">
          El Gradiente Aritmético es similar a las anualidades en el sentido que
          son pagos realizados en intervalos de tiempo iguales, la diferencia es
          que el valor de los pagos se va incrementando o disminuyendo en cada
          periodo. La variación del valor de los pagos es constante
        </Text>
        <View className="flex-col">
          <Button
            mode="contained"
            className="bg-purple-700 my-2 mx-2 text-white"
            onPress={() => navigation.navigate("GradienteValorPresente")}
          >
            <Text className="text-md font-bold text-white">Valor Presente Aritmetico</Text>
          </Button>
          {/* <Button
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
          </Button> */}
        </View>
      </View>
    </View>
  );
};
