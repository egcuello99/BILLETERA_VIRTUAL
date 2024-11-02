import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import ExplicacionFormula from "../../../../components/shared/ExplicacionFormula";
import { Button } from "react-native-paper";
import { logMovement } from "../../../../../actions/movements.actions";
import { useAuthStore } from "../../../../store/useAuthStore";

export const ValorFuturo = () => {
  const { user } = useAuthStore();
  const [capital, setCapital] = useState<string>("");
  const [tasaInteres, setTasaInteres] = useState<string>("");
  const [tiempo, setTiempo] = useState<string>("");
  const [monto, setMonto] = useState<string>("");

  const calcularMonto = (e: any) => {
    e.preventDefault();

    const i = parseFloat(tasaInteres) / 100;
    const n = parseInt(tiempo);
    const C = parseFloat(capital) * Math.pow(1 + i, n);
    setMonto(C.toFixed(2));
    logMovement(`Cálculo de Monto (M) simples`, user?.id!);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-5 mb-5 bg-slate-100"
    >
      <View className="w-full p-5 bg-white rounded-lg shadow ">
        <ExplicacionFormula>
          <Text>
            El monto (M) en el contexto de los intereses compuestos se refiere a
            la cantidad total de dinero que se acumula después de agregar los
            intereses al capital inicial durante un período de tiempo
            determinado.
          </Text>
          <Text>* C es el capital inicial o valor presente.</Text>
          <Text>
            * % es la tasa de interés (o tasa de descuento) formato decimal.
          </Text>
          <Text>* t es el tiempo.</Text>
          <Text>Fórmula: M = C * (1 + i) ^ n</Text>
        </ExplicacionFormula>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">
            Capital (C):
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
            Tasa de interés (%):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={tasaInteres}
            onChangeText={setTasaInteres}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <View className="my-5">
          <Text className="mb-2 text-lg font-bold text-gray-700">Tiempo:</Text>
          <TextInput
            keyboardType="numeric"
            value={tiempo}
            onChangeText={setTiempo}
            className="w-full p-3 border rounded-xl bg-gray-50"
          />
        </View>
        <Button
          className="mb-10 bg-blue-600"
          mode="contained"
          onPress={calcularMonto}
        >
          Calcular
        </Button>
      </View>
      {monto && (
        <View className="w-full p-5 my-5 text-center bg-white rounded-lg shadow">
          <Text className="text-lg font-bold">El Monto fue: ${monto}</Text>
        </View>
      )}
    </ScrollView>
  );
};
