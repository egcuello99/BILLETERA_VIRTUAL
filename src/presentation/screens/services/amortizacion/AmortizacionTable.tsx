import React from "react";
import { View, Text, FlatList } from "react-native";

interface TableRow {
  period: number;
  totalPayment: string;
  interest: string;
  capitalPayment: string;
  remainingPrincipal: string;
}

interface AmortizationTableProps {
  data: TableRow[];
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ data }) => {
  return (
    <View className="p-6 bg-white rounded-lg shadow-lg">
      <Text className="mb-4 text-lg font-semibold text-gray-800">
        Tabla de Amortización
      </Text>

      <View className="flex flex-row justify-between mb-2">
        <Text className="font-semibold text-gray-600">Período</Text>
        <Text className="font-semibold text-gray-600">Pago Total</Text>
        <Text className="font-semibold text-gray-600">Intereses</Text>
        <Text className="font-semibold text-gray-600">Capital</Text>
        <Text className="font-semibold text-gray-600">Saldo</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.period.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-gray-700">{item.period}</Text>
            <Text className="text-gray-700">{item.totalPayment}</Text>
            <Text className="text-gray-700">{item.interest}</Text>
            <Text className="text-gray-700">{item.capitalPayment}</Text>
            <Text className="text-gray-700">{item.remainingPrincipal}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AmortizationTable;
