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

const CalculoInflacion = () => {
  const [montoInicial, setMontoInicial] = useState("");
  const [tasaInflacion, setTasaInflacion] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [resultado, setResultado] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();

  const validarCampos = () => {
    if (!montoInicial || !tasaInflacion || !tiempo) {
      setError("Todos los campos son obligatorios.");
      setVisible(true);
      return false;
    }
    return true;
  };

  const calcularInflacion = async () => {
    if (!validarCampos()) return;

    const inicial = parseFloat(montoInicial);
    const inflacion = parseFloat(tasaInflacion) / 100;
    const periodos = parseInt(tiempo);

    const valorAjustado = inicial * Math.pow(1 + inflacion, periodos);
    setResultado(`Valor ajustado por inflación: $${valorAjustado.toFixed(2)}`);
    await logMovement("Cálculo de Inflación", user?.id!);
    setMontoInicial("");
    setTasaInflacion("");
    setTiempo("");
    setError("");
  };

  const handleReset = () => {
    setMontoInicial("");
    setTasaInflacion("");
    setTiempo("");
    setResultado("");
    setError("");
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-white" style={{ paddingTop: top }}>
      <Card className="p-4 mb-4 rounded-lg shadow-md">
        <Text className="mb-4 text-2xl font-bold text-center text-blue-600">
          Cálculo de Inflación
        </Text>
        <Text className="mb-2 text-lg text-center">
          Ingresa los detalles para calcular el valor ajustado:
        </Text>
        <TextInput
          className="p-3 mb-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Monto Inicial (Ej: 1000)"
          value={montoInicial}
          onChangeText={setMontoInicial}
          keyboardType="numeric"
          style={{ backgroundColor: "#f9f9f9" }}
        />
        <TextInput
          className="p-3 mb-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Tasa de Inflación (%) (Ej: 3)"
          value={tasaInflacion}
          onChangeText={setTasaInflacion}
          keyboardType="numeric"
          style={{ backgroundColor: "#f9f9f9" }}
        />
        <TextInput
          className="p-3 mb-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Tiempo (años) (Ej: 5)"
          value={tiempo}
          onChangeText={setTiempo}
          keyboardType="numeric"
          style={{ backgroundColor: "#f9f9f9" }}
        />
        <Button
          mode="contained"
          className="mb-4"
          onPress={calcularInflacion}
          color="#3b82f6"
          disabled={!montoInicial || !tasaInflacion || !tiempo}
          contentStyle={{ paddingVertical: 10 }}
        >
          Calcular Valor Ajustado
        </Button>

        <TouchableOpacity
          className="p-3 mb-4 border border-blue-500 rounded-lg"
          onPress={handleReset}
        >
          <Text className="text-center text-blue-500">Reiniciar</Text>
        </TouchableOpacity>

        {resultado && (
          <Text className="mt-4 text-lg text-center text-gray-700">
            {resultado}
          </Text>
        )}
        {error && (
          <Text className="mt-2 text-lg text-center text-red-500">{error}</Text>
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
        {error || resultado}
      </Snackbar>
    </SafeAreaView>
  );
};

export default CalculoInflacion;
