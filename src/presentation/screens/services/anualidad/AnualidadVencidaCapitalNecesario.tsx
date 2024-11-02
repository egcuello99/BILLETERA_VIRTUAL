import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const AnualidadVencidaCapitalNecesario = () => {
  const { user } = useAuthStore();
  const [datos, setDatos] = useState({
    renta: "",
    tasaInteres: "",
    plazo: "",
  });
  const [capital, setCapital] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (name: string, value: string) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const renta = parseFloat(datos.renta);
    const tasaInteresDecimal = parseFloat(datos.tasaInteres) / 100; // Convertir la tasa de interés a decimal
    const plazo = parseInt(datos.plazo) / 12;

    const capitalNecesario =
      renta *
      ((1 - Math.pow(1 + tasaInteresDecimal, -plazo)) / tasaInteresDecimal);

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setCapital(capitalNecesario.toFixed(2));
    }, 2000);
    logMovement("Anualidad Vencida Capital Necesario", user?.id!);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <View className="flex-1 p-4 bg-gray-200">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            La anualidad vencida con capital necesario es un concepto financiero
            que implica el cálculo del capital necesario para obtener una renta
            deseada anual durante un período determinado, teniendo en cuenta una
            tasa de interés específica.
          </Text>
          <Text className="text-lg text-gray-800">
            La fórmula utilizada para calcular el capital necesario es:
          </Text>
          <Text className="text-lg font-bold text-gray-800">
            C = R * ((1 - (1 + i)^-n) / i)
          </Text>
          <Text className="text-lg text-gray-800">Donde:</Text>
          <Text>C = Capital necesario</Text>
          <Text>R = Renta deseada anual</Text>
          <Text>i = Tasa de interés por período (en decimal)</Text>
          <Text>n = Plazo en períodos</Text>
        </ExplicacionFormula>

        <View className="p-10 my-10 bg-white rounded-lg shadow">
          <Text className="block text-xl font-bold text-gray-600 uppercase">
            Renta deseada anual ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.renta}
            placeholder="Ingrese la renta deseada"
            onChangeText={(value) => handleChange("renta", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Tasa de interés (% anual):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.tasaInteres}
            placeholder="Ingrese la tasa de interés"
            onChangeText={(value) => handleChange("tasaInteres", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Plazo en Meses:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.plazo}
            placeholder="Ingrese el plazo en meses"
            onChangeText={(value) => handleChange("plazo", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="p-3 mt-4 bg-indigo-600 rounded-xl"
          >
            <Text className="font-bold text-center text-white">Calcular</Text>
          </TouchableOpacity>
        </View>

        {cargando && (
          <View className="my-10 text-center">
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        )}

        <View className="my-10 text-center">
          {capital && (
            <Text className="text-2xl font-bold text-center">
              El capital necesario es: ${capital}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AnualidadVencidaCapitalNecesario;
