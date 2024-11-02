import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";
import { ActivityIndicator } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const ValorPresentePrestamo = () => {
  const [valorPrestamo, setValorPrestamo] = useState("");
  const [pagoAnual, setPagoAnual] = useState("");
  const [tasaInteres, setTasaInteres] = useState("");
  const [plazoAnios, setPlazoAnios] = useState("");
  const [valorPresente, setValorPresente] = useState("");
  const [cargando, setCargando] = useState(false);
  const { user } = useAuthStore();

  const handleChange = (name: string, value: string) => {
    if (name === "valorPrestamo") {
      setValorPrestamo(value);
    } else if (name === "pagoAnual") {
      setPagoAnual(value);
    } else if (name === "tasaInteres") {
      setTasaInteres(value);
    } else if (name === "plazoAnios") {
      setPlazoAnios(value);
    }
  };

  const handleSubmit = async () => {
    const pagoAnualValue = parseFloat(pagoAnual);
    const tasaInteresDecimal = parseFloat(tasaInteres) / 100;
    const plazoAniosValue = parseInt(plazoAnios) / 12;

    // Calcular el valor presente del préstamo
    const valorPresenteCalc =
      pagoAnualValue *
      ((1 - Math.pow(1 + tasaInteresDecimal, -plazoAniosValue)) /
        tasaInteresDecimal);

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setValorPresente(valorPresenteCalc.toFixed(2));
    }, 2000);
    await logMovement("Anualidad Valor Presente", user?.id!);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <View className="flex-1 p-4 bg-gray-200">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            El valor presente de un préstamo se refiere al valor actual de una
            serie de pagos futuros que se realizarán como parte de un préstamo,
            descontados a una tasa de interés específica. Este concepto es
            importante en las finanzas para determinar el valor actual de los
            flujos de efectivo futuros.
          </Text>
          <Text className="text-lg text-gray-800">
            La fórmula utilizada para calcular el valor presente de un préstamo
            es la siguiente:
          </Text>
          <Text className="text-lg font-bold text-gray-800">
            VP = P * ((1 - (1 + i)^-n) / i)
          </Text>
          <Text className="text-lg text-gray-800">Donde:</Text>
          <Text>VP = Valor Presente</Text>
          <Text>P = Pago anual</Text>
          <Text>i = Tasa de interés por período (en decimal)</Text>
          <Text>n = Plazo en períodos</Text>
        </ExplicacionFormula>

        <View className="p-10 my-10 bg-white rounded-lg shadow">
          <Text className="block text-xl font-bold text-gray-600 uppercase">
            Valor del préstamo ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={valorPrestamo}
            placeholder="Ingrese el valor del préstamo"
            onChangeText={(value) => handleChange("valorPrestamo", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Pago anual ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={pagoAnual}
            placeholder="Ingrese el pago anual"
            onChangeText={(value) => handleChange("pagoAnual", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Tasa de interés (% anual):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={tasaInteres}
            placeholder="Ingrese la tasa de interés"
            onChangeText={(value) => handleChange("tasaInteres", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Plazo en Meses:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={plazoAnios}
            placeholder="Ingrese el plazo en Meses (Años->Meses)"
            onChangeText={(value) => handleChange("plazoAnios", value)}
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

        {valorPresente && (
          <View className="mt-10">
            <Text className="text-xl font-bold text-center text-gray-800">
              Valor del Prestamo: {valorPrestamo}
            </Text>
            <Text className="text-xl font-bold text-center text-gray-800">
              El valor presente del préstamo es: ${valorPresente}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ValorPresentePrestamo;
