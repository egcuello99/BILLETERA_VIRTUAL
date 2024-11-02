import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import {
  Provider as PaperProvider,
  Button,
  Card,
  Snackbar,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const UnidadValorReal = () => {
  const { user } = useAuthStore();
  const [uvr, setUvr] = useState("");
  const [pesos, setPesos] = useState("");
  const [uvrRate, setUvrRate] = useState("");
  const [result, setResult] = useState("");
  const [visible, setVisible] = useState(false);
  const { top } = useSafeAreaInsets();

  const convertToPesos = () => {
    if (!uvr || !uvrRate) {
      setResult("Por favor, ingresa un monto en UVR y el valor de la UVR.");
      setVisible(true);
      return;
    }
    const pesosValue = parseFloat(uvr) * parseFloat(uvrRate);
    setResult(`Equivalente en Pesos: $${pesosValue.toFixed(2)}`);
    logMovement("Cálculo de UVR a Pesos", user?.id!);
    setPesos("");
  };

  const convertToUvr = () => {
    if (!pesos || !uvrRate) {
      setResult("Por favor, ingresa un monto en Pesos y el valor de la UVR.");
      logMovement("Cálculo de Pesos a UVR", user?.id!);
      setVisible(true);
      return;
    }
    const uvrValue = parseFloat(pesos) / parseFloat(uvrRate);
    setResult(`Equivalente en UVR: ${uvrValue.toFixed(6)} UVR`);

    setUvr("");
  };

  const handleReset = () => {
    setUvr("");
    setPesos("");
    setUvrRate("");
    setResult("");
  };

  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 p-4 bg-white" style={{ paddingTop: top }}>
        <Card className="p-4 mb-4 rounded-lg shadow-md">
          <Text className="mb-4 text-2xl font-bold text-center text-blue-600">
            Unidad Valor Real
          </Text>
          <Text className="mb-2 text-lg text-center">
            Ingresa el valor actual de UVR:
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Valor de UVR"
            value={uvrRate}
            onChangeText={setUvrRate}
            keyboardType="numeric"
            style={{ backgroundColor: "#f9f9f9" }}
          />
          <Text className="mb-2 text-lg text-center">
            Convertir de UVR a Pesos:
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Monto en UVR"
            value={uvr}
            onChangeText={setUvr}
            keyboardType="numeric"
            style={{ backgroundColor: "#f9f9f9" }}
          />
          <Button
            mode="contained"
            className="mb-4"
            onPress={convertToPesos}
            color="#3b82f6"
            contentStyle={{ paddingVertical: 10 }}
          >
            Convertir a Pesos
          </Button>

          <Text className="mb-2 text-lg text-center">
            Convertir de Pesos a UVR:
          </Text>
          <TextInput
            className="p-3 mb-4 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Monto en Pesos"
            value={pesos}
            onChangeText={setPesos}
            keyboardType="numeric"
            style={{ backgroundColor: "#f9f9f9" }}
          />
          <Button
            mode="contained"
            className="mb-4"
            onPress={convertToUvr}
            color="#3b82f6"
            contentStyle={{ paddingVertical: 10 }}
          >
            Convertir a UVR
          </Button>

          <TouchableOpacity
            className="p-3 mb-4 border border-blue-500 rounded-lg"
            onPress={handleReset}
          >
            <Text className="text-center text-blue-500">Reiniciar</Text>
          </TouchableOpacity>

          {result && (
            <Text className="mt-4 text-lg text-center text-gray-700">
              {result}
            </Text>
          )}
        </Card>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          action={{
            label: "Cerrar",
            onPress: () => {
              setVisible(false);
            },
          }}
        >
          {result}
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default UnidadValorReal;
