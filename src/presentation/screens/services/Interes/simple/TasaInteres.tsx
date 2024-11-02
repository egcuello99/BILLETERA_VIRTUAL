import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import ExplicacionFormula from "../../../../components/shared/ExplicacionFormula";
import { Button } from "react-native-paper";
import { formatter } from "../../../../../utils";
import { logMovement } from "../../../../../actions/movements.actions";
import { useAuthStore } from "../../../../store/useAuthStore";

export const TasaInteresScreen = () => {
  const { user } = useAuthStore();
  const [montoFuturo, setMontoFuturo] = useState<string>("");
  const [capitalInicial, setCapitalInicial] = useState<string>("");
  const [tiempo, setTiempo] = useState<string>("");
  const [tasaInteres, setTasaInteres] = useState<string>("");

  const calcularTasaInteres = () => {
    const futuro = parseFloat(montoFuturo);
    const capital = parseFloat(capitalInicial);
    const t = parseFloat(tiempo);

    const tasa = ((futuro - capital) / (capital * t)) * 100;
    setTasaInteres(tasa.toString());
    logMovement("Cálculo de Tasa de Interés", user?.id!);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-5 mb-5 bg-slate-100"
    >
      <View className="w-full p-5 bg-white rounded-lg shadow">
        <ExplicacionFormula>
          <Text>
            La tasa de interés (i) se calcula como el porcentaje de crecimiento
            del capital inicial (C) hasta el monto futuro (M) en un tiempo
            determinado (t).
          </Text>
          <Text>* M es el monto futuro.</Text>
          <Text>* C es el capital inicial.</Text>
          <Text>* t es el tiempo en meses.</Text>
          <Text>Fórmula: i = ((M - C) / (C * t)) * 100</Text>
        </ExplicacionFormula>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Monto Futuro (M):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={montoFuturo}
            onChangeText={setMontoFuturo}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Capital Inicial (C):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={capitalInicial}
            onChangeText={setCapitalInicial}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Tiempo (t) en meses:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={tiempo}
            onChangeText={setTiempo}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <Button mode="contained" onPress={calcularTasaInteres}>
          Calcular
        </Button>
      </View>
      {tasaInteres && (
        <View className="w-full p-5 my-5 text-center bg-white rounded-lg shadow">
          <Text className="text-lg font-bold">
            La tasa de interés fue: {tasaInteres}%
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
