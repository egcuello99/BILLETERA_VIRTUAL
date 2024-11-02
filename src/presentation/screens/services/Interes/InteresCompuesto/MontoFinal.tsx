import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import ExplicacionFormula from "../../../../components/shared/ExplicacionFormula";
import { logMovement } from "../../../../../actions/movements.actions";
import { useAuthStore } from "../../../../store/useAuthStore";

export const MontoFuturoScreen = () => {
  const { user } = useAuthStore();
  const [cargando, setCargando] = useState(false);
  const [capital, setCapital] = useState<string>("250000"); // Set default capital
  const [interesRate, setInteresRate] = useState<string>("2"); // Set default interest rate
  const [compoundingPeriod, setCompoundingPeriod] = useState<string>("mensual");
  const [timeperiodo, setTimeperiodo] = useState<string>("8"); // Set default time period
  const [resultado, setResultado] = useState<string>("");

  const calcularCapitalizacion = () => {
    const capitalFloat = parseFloat(capital);
    const interesFloat = parseFloat(interesRate) / 100;
    const tiempoFloat = parseFloat(timeperiodo);

    const accumulatedAmount =
      capitalFloat * Math.pow(1 + interesFloat, tiempoFloat);
    setResultado(`El monto final es: $${accumulatedAmount.toFixed(2)}`);
    logMovement("Cálculo de Monto Futuro", user?.id!);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-5 mb-5 bg-slate-100"
    >
      <View className="w-full p-5 bg-white rounded-lg shadow">
        <ExplicacionFormula>
          <Text className="mb-5">
            La capitalización es el proceso de acumular el capital en un
            determinado tiempo, en función de la tasa de interés y el periodo de
            capitalización.
          </Text>
          <Text className="mb-5">
            El cálculo del monto acumulado se realiza utilizando la fórmula:
          </Text>
          <Text className="mb-5">
            Monto compuesto (MC) = Capital inicial (C) * (1 + Tasa de interés
            (i)) ^ Tiempo (n)
          </Text>
        </ExplicacionFormula>

        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Capital inicial:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={capital}
            onChangeText={setCapital}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Tasa de interés mensual (%):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={interesRate}
            onChangeText={setInteresRate}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Capitalización:
          </Text>
          <Picker
            selectedValue={compoundingPeriod}
            onValueChange={(itemValue) => setCompoundingPeriod(itemValue)}
            className="w-full p-3 border rounded-xl bg-gray-50"
          >
            <Picker.Item label="Diario" value="diario" />
            <Picker.Item label="Mensual" value="mensual" />
            <Picker.Item label="Trimestral" value="trimestral" />
            <Picker.Item label="Cuatrimestral" value="cuatrimestral" />
            <Picker.Item label="Semestral" value="semestral" />
            <Picker.Item label="Anual" value="anual" />
          </Picker>
        </View>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Tiempo (meses):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={timeperiodo}
            onChangeText={setTimeperiodo}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <Button mode="contained" onPress={calcularCapitalizacion}>
          Calcular
        </Button>
      </View>
      {resultado && (
        <View className="w-full p-5 my-5 text-center bg-white rounded-lg shadow">
          <Text className="text-lg font-bold">{resultado}</Text>
        </View>
      )}
    </ScrollView>
  );
};
