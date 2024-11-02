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

const EvaluacionInversion = () => {
  const [inversion, setInversion] = useState("");
  const [interes, setInteres] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [resultado, setResultado] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();

  const validarCampos = () => {
    if (!inversion || !interes || !periodo) {
      setError("Todos los campos son obligatorios.");
      setVisible(true);
      return false;
    }
    return true;
  };

  const calcularROI = () => {
    if (!validarCampos()) return;

    const inversionValor = parseFloat(inversion);
    const interesValor = parseFloat(interes) / 100;
    const periodoValor = parseInt(periodo);

    const retorno = inversionValor * Math.pow(1 + interesValor, periodoValor);
    const ganancia = retorno - inversionValor;

    setResultado(
      `Retorno Total: $${retorno.toFixed(2)} | Ganancia: $${ganancia.toFixed(
        2
      )}`
    );
    logMovement("Evaluacion de Alternativas de Inversión", user?.id!);
    setInversion("");
    setInteres("");
    setPeriodo("");
    setError("");
  };

  const handleReset = () => {
    setInversion("");
    setInteres("");
    setPeriodo("");
    setResultado("");
    setError("");
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-white" style={{ paddingTop: top }}>
      <Card className="p-4 mb-4 rounded-lg shadow-md">
        <Text className="mb-4 text-2xl font-bold text-center text-blue-600">
          Evaluación de Alternativas de Inversión
        </Text>
        <Text className="mb-2 text-lg text-center">
          Ingresa los detalles de la inversión:
        </Text>
        <TextInput
          className="p-3 mb-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Monto de Inversión (Ej: 1000)"
          value={inversion}
          onChangeText={setInversion}
          keyboardType="numeric"
          style={{ backgroundColor: "#f9f9f9" }}
        />
        <TextInput
          className="p-3 mb-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Tasa de Interés (%) (Ej: 5)"
          value={interes}
          onChangeText={setInteres}
          keyboardType="numeric"
          style={{ backgroundColor: "#f9f9f9" }}
        />
        <TextInput
          className="p-3 mb-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Período (años) (Ej: 10)"
          value={periodo}
          onChangeText={setPeriodo}
          keyboardType="numeric"
          style={{ backgroundColor: "#f9f9f9" }}
        />
        <Button
          mode="contained"
          className="mb-4"
          onPress={calcularROI}
          color="#3b82f6"
          disabled={!inversion || !interes || !periodo}
          contentStyle={{ paddingVertical: 10 }}
        >
          Calcular Retorno
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

export default EvaluacionInversion;
