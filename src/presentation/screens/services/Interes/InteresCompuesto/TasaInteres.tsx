import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import ExplicacionFormula from "../../../../components/shared/ExplicacionFormula";
import { logMovement } from "../../../../../actions/movements.actions";
import { useAuthStore } from "../../../../store/useAuthStore";

export const TasaInteresCompuestoScreen = () => {
  const { user } = useAuthStore();
  const [capital, setCapital] = useState<string>("");
  const [montoCompuesto, setMontoCompuesto] = useState<string>("");
  const [periodos, setPeriodos] = useState<string>("");
  const [unidadTiempo, setUnidadTiempo] = useState<string>("anios"); // "anios", "meses", "trimestres"
  const [tasaInteres, setTasaInteres] = useState<string>("");

  const convertirPeriodosAnios = (periodos: number, unidad: string): number => {
    switch (unidad) {
      case "meses":
        return periodos / 12;
      case "trimestres":
        return periodos / 4;
      default:
        return periodos;
    }
  };

  const calcularTasaInteres = () => {
    const periodosEnAnios = convertirPeriodosAnios(
      parseFloat(periodos),
      unidadTiempo
    );
    const tasa =
      Math.pow(
        parseFloat(montoCompuesto) / parseFloat(capital),
        1 / periodosEnAnios
      ) - 1;
    setTasaInteres(tasa.toFixed(3));
    logMovement("Cálculo de Tasa de Interés", user?.id!);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-5 mb-5 bg-slate-100"
    >
      <View className="w-full p-5 bg-white rounded-lg shadow ">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            La "Tasa de Interés" se refiere al porcentaje aplicado a un capital
            inicial para determinar el crecimiento de dicho capital en un
            período determinado.
          </Text>
          <Text className="mt-3 text-lg text-gray-800">
            La tasa de interés se puede calcular utilizando la fórmula del
            interés compuesto:
          </Text>
          <Text className="mt-3 text-lg font-bold text-gray-800">
            i = (MC / C) ^ (1 / n) - 1
          </Text>
        </ExplicacionFormula>
      </View>
      <View className="p-5 my-10 bg-white rounded-lg shadow">
        <View className="my-2">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Capital inicial:
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Capital Inicial"
            value={capital.toString()}
            onChangeText={(value) => setCapital(value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-2">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Monto compuesto final:
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Monto Compuesto Final"
            value={montoCompuesto.toString()}
            onChangeText={(value) => setMontoCompuesto(value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-2">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Periodos:
          </Text>
          <TextInput
            keyboardType="numeric"
            placeholder="Nro periodos"
            value={periodos.toString()}
            onChangeText={(value) => setPeriodos(value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-2">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Unidad de tiempo:
          </Text>
          <Picker
            selectedValue={unidadTiempo}
            onValueChange={(itemValue) => setUnidadTiempo(itemValue)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          >
            <Picker.Item label="Años" value="anios" />
            <Picker.Item label="Meses" value="meses" />
            <Picker.Item label="Trimestres" value="trimestres" />
          </Picker>
        </View>
        <Button mode="contained" onPress={calcularTasaInteres}>
          Calcular
        </Button>
      </View>
      {tasaInteres && (
        <View className="w-full p-5 my-5 text-center bg-white rounded-lg shadow">
          <Text className="text-lg font-bold">
            La tasa de interés es: {tasaInteres}%
          </Text>
          <Text className="text-lg">
            La tasa de interés es: {(parseFloat(tasaInteres) * 100).toFixed(2)}%
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
