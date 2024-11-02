import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import ExplicacionFormula from "../../../../components/shared/ExplicacionFormula";
import { logMovement } from "../../../../../actions/movements.actions";
import { useAuthStore } from "../../../../store/useAuthStore";

export const TiempoInteresCompuestoScreen = () => {
  const { user } = useAuthStore();
  const [capital, setCapital] = useState<number>(200000); // Set default capital to 200,000
  const [montoCompuesto, setMontoCompuesto] = useState<number>(237537); // Set default final amount to 237,537
  const [tasaInteres, setTasaInteres] = useState<string>("3.5"); // Set default interest rate to 3.5
  const [periodos, setPeriodos] = useState<string>("");
  const [capitalizacion, setCapitalizacion] = useState<string>("mensual"); // "diario", "mensual", "trimestral", etc.

  const calculatePeriods = () => {
    const i = parseFloat(tasaInteres) / 100; // Convertir a decimal
    const n = (Math.log(montoCompuesto) - Math.log(capital)) / Math.log(1 + i);
    setPeriodos(n.toString());
    logMovement("Cálculo de Tiempo", user?.id!);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="p-5 bg-gray-100"
    >
      <View className="p-5 mb-5 bg-white rounded-lg shadow-md">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            El número de períodos en el contexto del interés compuesto se
            refiere al tiempo necesario para que una inversión o deuda alcance
            un cierto valor futuro, dados un capital inicial, una tasa de
            interés y el monto compuesto final.
          </Text>
          <Text className="mt-3 text-lg text-gray-800">
            Se calcula utilizando la fórmula del interés compuesto:
          </Text>
          <Text className="mt-3 text-lg font-bold text-gray-800">
            n = (ln(VF) - ln(P)) / ln(1 + r)
          </Text>
          <Text className="mt-3 text-lg text-gray-800">Donde:</Text>
          <Text className="mt-2 text-lg text-gray-800">
            n = Número de períodos{"\n"}
            VF = Monto compuesto final{"\n"}P = Capital inicial{"\n"}r = Tasa de
            interés por período (en decimal)
          </Text>
        </ExplicacionFormula>
      </View>

      <View className="p-5 mb-5 bg-white rounded-lg shadow-md">
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Capital inicial:
          </Text>
          <TextInput
            keyboardType="decimal-pad" // Changed to allow decimal input
            placeholder="Capital Inicial"
            value={capital.toString()}
            onChangeText={(value) => setCapital(parseFloat(value))}
            className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
          />
        </View>
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Monto compuesto final:
          </Text>
          <TextInput
            keyboardType="decimal-pad" // Changed to allow decimal input
            placeholder="Monto Compuesto Final"
            value={montoCompuesto.toString()}
            onChangeText={(value) => setMontoCompuesto(parseFloat(value))}
            className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
          />
        </View>
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Tasa de interés (%):
          </Text>
          <TextInput
            keyboardType="decimal-pad" // Changed to allow decimal input
            placeholder="Tasa de Interés"
            value={tasaInteres}
            onChangeText={setTasaInteres} // Directly set the string value
            className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
          />
        </View>
        <View className="mb-4">
          <Text className="text-xl font-bold text-gray-600 uppercase">
            Capitalización:
          </Text>
          <Picker
            selectedValue={capitalizacion}
            onValueChange={(itemValue) => setCapitalizacion(itemValue)}
            className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
          >
            <Picker.Item label="Diario" value="diario" />
            <Picker.Item label="Mensual" value="mensual" />
            <Picker.Item label="Trimestral" value="trimestral" />
            <Picker.Item label="Cuatrimestral" value="cuatrimestral" />
            <Picker.Item label="Semestral" value="semestral" />
            <Picker.Item label="Anual" value="anual" />
          </Picker>
        </View>
        <Button mode="contained" onPress={calculatePeriods}>
          Calcular
        </Button>
      </View>

      {periodos && (
        <View className="w-full p-5 my-5 text-center bg-white rounded-lg shadow">
          <Text className="text-lg text-center">
            El número de períodos es: {periodos} ={" "}
            <Text className="font-bold">
              {Math.round(parseFloat(periodos))}
            </Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
