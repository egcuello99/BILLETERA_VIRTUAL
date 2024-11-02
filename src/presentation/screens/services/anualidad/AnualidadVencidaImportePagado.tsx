import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const AnualidadVencidaImportePagado = () => {
  const [enganche, setEnganche] = useState("");
  const [pagoMensual, setPagoMensual] = useState("");
  const [plazoMeses, setPlazoMeses] = useState("");
  const [importePagado, setImportePagado] = useState("");
  const [cargando, setCargando] = useState(false);
  const { user } = useAuthStore();

  const handleChange = (name: string, value: string) => {
    if (name === "enganche") {
      setEnganche(value);
    } else if (name === "pagoMensual") {
      setPagoMensual(value);
    } else if (name === "plazoMeses") {
      setPlazoMeses(value);
    }
  };

  const handleSubmit = () => {
    const engancheValue = parseFloat(enganche);
    const pagoMensualValue = parseFloat(pagoMensual);
    const plazoMesesValue = parseFloat(plazoMeses);

    // Calcular el importe pagado
    const tasaInteres = 0.3 / 12; // Tasa de interés mensual
    const importePagadoCalc =
      pagoMensualValue *
      ((1 - Math.pow(1 + tasaInteres, -plazoMesesValue)) / tasaInteres);

    const importeTotal = engancheValue + importePagadoCalc;

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setImportePagado(importeTotal.toFixed(2));
    }, 2000);
    logMovement("Anualidad Vencida Importe Pagado", user?.id!);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <View className="flex-1 p-4 bg-gray-200">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            En el contexto de las finanzas personales y la adquisición de bienes
            de consumo duraderos, como automóviles o viviendas, a menudo se
            utiliza la anualidad vencida con importe pagado para calcular el
            importe total que se habrá pagado al finalizar el período de
            financiamiento, teniendo en cuenta un enganche inicial, pagos
            mensuales y una tasa de interés fija.
          </Text>
          <Text className="text-lg text-gray-800">
            La fórmula utilizada para calcular el importe pagado es:
          </Text>
          <Text className="text-lg font-bold text-gray-800">
            IP = A * ((1 - (1 + i)^-n) / i) + E
          </Text>
          <Text className="text-lg text-gray-800">Donde:</Text>
          <Text>IP = Importe Pagado</Text>
          <Text>A = Pago mensual</Text>
          <Text>i = Tasa de interés por período (en decimal)</Text>
          <Text>n = Plazo en períodos</Text>
          <Text>E = Enganche</Text>
        </ExplicacionFormula>

        <View className="p-10 my-10 bg-white rounded-lg shadow">
          <Text className="block text-xl font-bold text-gray-600 uppercase">
            Enganche ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={enganche}
            placeholder="Ingrese el enganche"
            onChangeText={(value) => handleChange("enganche", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Pago mensual ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={pagoMensual}
            placeholder="Ingrese el pago mensual"
            onChangeText={(value) => handleChange("pagoMensual", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Plazo en meses:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={plazoMeses}
            placeholder="Ingrese el plazo en meses"
            onChangeText={(value) => handleChange("plazoMeses", value)}
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
          {importePagado && (
            <Text className="text-2xl font-bold text-center">
              El importe pagado es: ${importePagado}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AnualidadVencidaImportePagado;
