import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";
import { ActivityIndicator, Button } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const AnualidadVencida = () => {
  const [datos, setDatos] = useState({
    tasaInteres: "",
    numPeriodos: "",
    valorPresente: "",
  });
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);
  const { user } = useAuthStore();
  const handleChange = (name: string, value: string) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const tasaInteresDecimal = parseFloat(datos.tasaInteres) / 100; // Convertir la tasa de interés a decimal
    const numPeriodos = parseInt(datos.numPeriodos) / 12;
    const valorPresente = parseFloat(datos.valorPresente);

    // Calcular el monto de la anualidad vencida
    const montoAnualidad =
      valorPresente *
      ((Math.pow(1 + tasaInteresDecimal, numPeriodos) - 1) /
        tasaInteresDecimal);

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setResultado(montoAnualidad.toFixed(2));
    }, 2000);
    logMovement("Anualidad Vencida", user?.id!);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <View className="flex-1 p-4 bg-gray-200">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            La anualidad vencida es un concepto financiero que se refiere a una
            serie de pagos iguales realizados al final de cada período.
            Matemáticamente, se calcula utilizando la fórmula del valor presente
            de una anualidad.
          </Text>
          <Text className="text-lg text-gray-800">
            La fórmula utilizada para calcular el monto de la anualidad vencida
            es:
          </Text>
          <Text className="text-lg font-bold text-gray-800">
            M = VP * ((1 + i)^n - 1) / i
          </Text>
          <Text className="text-lg text-gray-800">Donde:</Text>
          <Text>M = Monto de la anualidad vencida</Text>
          <Text>VP = Valor presente</Text>
          <Text>i = Tasa de interés por período (en decimal)</Text>
          <Text>n = Número de períodos</Text>
        </ExplicacionFormula>
        <View className="p-10 my-10 bg-white rounded-lg shadow">
          <Text className="block text-xl font-bold text-gray-600 uppercase">
            Tasa de interés (% mensual):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.tasaInteres}
            placeholder="Ingrese Tasa de Interes"
            onChangeText={(value) => handleChange("tasaInteres", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Número de períodos:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.numPeriodos}
            placeholder="Ingrese Numero de Periodos en Meses Años -> Meses"
            onChangeText={(value) => handleChange("numPeriodos", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Valor Presente ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.valorPresente}
            placeholder="Ingrese Valor Presente"
            onChangeText={(value) => handleChange("valorPresente", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Button
            onPress={handleSubmit}
            className="p-3 mt-4 bg-indigo-600 rounded-xl"
          >
            <Text className="font-bold text-center text-white">Calcular</Text>
          </Button>
        </View>

        {cargando && (
          <View className="my-10 text-center">
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        )}

        {resultado && (
          <Text className="mt-10 text-xl font-bold text-center text-gray-800">
            Resultado: {resultado}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AnualidadVencida;
