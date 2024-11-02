import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

interface AmortizationFormProps {
  onCalculate: (
    principal: number,
    interestRate: number,
    periods: number
  ) => void;
  message: string;
}

const AmortizationForm: React.FC<AmortizationFormProps> = ({
  onCalculate,
  message,
}) => {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [periods, setPeriods] = useState("");
  console.log(message);

  const { user } = useAuthStore();

  const handleCalculate = async () => {
    const principalValue = parseFloat(principal);
    const interestRateValue = parseFloat(interestRate) / 100;
    const periodsValue = parseInt(periods, 10);
    onCalculate(principalValue, interestRateValue, periodsValue);
    await logMovement(message, user?.id!);
  };

  return (
    <View className="p-6 mb-8 bg-white rounded-lg shadow-lg">
      <Text className="mb-4 text-xl font-semibold text-gray-800">
        Ingrese los Datos de Amortización
      </Text>

      <TextInput
        placeholder="Capital (Principal)"
        keyboardType="numeric"
        value={principal}
        onChangeText={setPrincipal}
        className="px-4 py-3 mb-4 text-gray-700 border border-gray-300 rounded-lg"
      />

      <TextInput
        placeholder="Tasa de interés (%)"
        keyboardType="numeric"
        value={interestRate}
        onChangeText={setInterestRate}
        className="px-4 py-3 mb-4 text-gray-700 border border-gray-300 rounded-lg"
      />

      <TextInput
        placeholder="Número de períodos"
        keyboardType="numeric"
        value={periods}
        onChangeText={setPeriods}
        className="px-4 py-3 mb-4 text-gray-700 border border-gray-300 rounded-lg"
      />

      <TouchableOpacity
        onPress={handleCalculate}
        className="px-5 py-3 bg-indigo-600 rounded-lg shadow-md"
      >
        <Text className="text-lg font-semibold text-center text-white">
          Calcular
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmortizationForm;
