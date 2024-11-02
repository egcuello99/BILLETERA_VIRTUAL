import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import ExplicacionFormula from "../../../../components/shared/ExplicacionFormula";
import { logMovement } from "../../../../../actions/movements.actions";
import { useAuthStore } from "../../../../store/useAuthStore";
export const TiempoScreen = () => {
  const { user } = useAuthStore();
  const [ValorFuturo, setValorFuturo] = useState<string>("");
  const [ValorPresente, setValorPresente] = useState<string>("");
  const [tasaInteres, setTasaInteres] = useState<string>("");
  const [tiempoEnDias, setTiempoEnDias] = useState<string>("");
  const [tiempoAnios, setTiempoAnios] = useState<number>(0);
  const [tiempoMeses, setTiempoMeses] = useState<number>(0);
  const [tiempoDias, setTiempoDias] = useState<number>(0);

  const calcularTiempo = () => {
    const i = parseFloat(tasaInteres) / 100;
    const n = parseFloat(ValorPresente);
    const futuro = parseFloat(ValorFuturo);

    const C = (futuro / n - 1) / i;
    const dias = C.toFixed(2);
    setTiempoEnDias(dias);

    const years = Math.floor(parseFloat(dias) / 365);
    const months = Math.floor((parseFloat(dias) % 365) / 30);
    const days = Math.floor((parseFloat(dias) % 365) % 30);

    setTiempoAnios(years);
    setTiempoMeses(months);
    setTiempoDias(days);
    logMovement("Cálculo de Tiempo de Pago", user?.id!);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-5 bg-slate-100"
    >
      <View className="w-full p-5 bg-white rounded-lg shadow">
        <ExplicacionFormula>
          <Text className="mb-4">
            El tiempo (t) se refiere al período de tiempo durante el cual se
            aplica la tasa de interés al capital inicial para calcular los
            intereses ganados o pagados.
          </Text>
          <Text className="mb-2">* VF es el Valor Futuro.</Text>
          <Text className="mb-2">* VP es el Valor Presente.</Text>
          <Text className="mb-2">
            * i es la tasa de interés (o tasa de descuento) en formato decimal.
          </Text>
          <Text className="mb-4">Fórmula: {"C = (VF / VP - 1) / i"}</Text>
        </ExplicacionFormula>
        <Text className="mb-2 text-lg font-bold text-gray-700">
          Valor Futuro (VF):
        </Text>
        <TextInput
          keyboardType="numeric"
          value={ValorFuturo}
          onChangeText={setValorFuturo}
          className="w-full p-3 border rounded-xl bg-gray-50"
        />

        <Text className="mt-4 mb-2 text-lg font-bold text-gray-700">
          Valor Presente (VP):
        </Text>
        <TextInput
          keyboardType="numeric"
          value={ValorPresente}
          onChangeText={setValorPresente}
          className="w-full p-3 border rounded-xl bg-gray-50"
        />

        <Text className="mt-4 mb-2 text-lg font-bold text-gray-700">
          Tasa de Interes (i):
        </Text>
        <TextInput
          keyboardType="numeric"
          value={tasaInteres}
          onChangeText={setTasaInteres}
          className="w-full p-3 border rounded-xl bg-gray-50"
        />

        <Button mode="contained" onPress={calcularTiempo} className="mt-5">
          Calcular
        </Button>
      </View>

      {tiempoEnDias && (
        <View className="w-full p-5 mt-10 text-center bg-white rounded-lg shadow">
          <Text className="text-lg font-bold">
            El tiempo fue de: {tiempoAnios} años, {tiempoMeses} meses y{" "}
            {tiempoDias} días.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
