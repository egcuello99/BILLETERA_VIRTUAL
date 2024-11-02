import React, { useState } from "react";
import { View } from "react-native";
import AmortizationForm from "./AmortizationForm";
import { calculateAmericanAmortization } from "./AmortizacionHomeScreen";
import AmortizationTable from "./AmortizacionTable";
import { Text } from "react-native-paper";

const AmericanAmortization: React.FC = () => {
  const [data, setData] = useState([]);

  const handleCalculate = (
    principal: number,
    interestRate: number,
    periods: number
  ) => {
    const result = calculateAmericanAmortization(
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
        Amortización Americana
      </Text>
      <AmortizationForm
        onCalculate={handleCalculate}
        message="Calculo de Amortización Americana"
      />
      {data.length > 0 && <AmortizationTable data={data} />}
    </View>
  );
};

export default AmericanAmortization;
