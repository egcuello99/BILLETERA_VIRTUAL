import React, { useState } from "react";
import { View } from "react-native";
import AmortizationForm from "./AmortizationForm";
import { calculateFrenchAmortization } from "./AmortizacionHomeScreen";
import AmortizationTable from "./AmortizacionTable";
import { Text } from "react-native-paper";

const FrenchAmortization: React.FC = () => {
  const [data, setData] = useState([]);

  const handleCalculate = (
    principal: number,
    interestRate: number,
    periods: number
  ) => {
    const result = calculateFrenchAmortization(
      principal,
      interestRate,
      periods
    );
    // @ts-ignore
    setData(result);
  };

  return (
    <View className="p-6 rounded-lg bg-gray-50">
      <Text className="mb-4 text-2xl font-bold text-indigo-700">
        Amortización Francesa
      </Text>
      <AmortizationForm
        onCalculate={handleCalculate}
        message="Calculo de Amortizacion Francesa"
      />
      {data.length > 0 && <AmortizationTable data={data} />}
    </View>
  );
};

export default FrenchAmortization;
