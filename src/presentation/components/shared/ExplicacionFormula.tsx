import { ReactNode } from "react";
import { View, Text } from "react-native";

const ExplicacionFormula = ({ children }: { children: ReactNode }) => {
  return (
    <View className="bg-indigo-100 p-4 mx-4 rounded-lg border-l-4 border-indigo-500 mb-4">
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <Text key={index} className="text-indigo-900 font-semibold text-base">
            {child}
          </Text>
        ))
      ) : (
        <Text className="text-indigo-900 font-semibold text-base">
          {children}
        </Text>
      )}
    </View>
  );
};

export default ExplicacionFormula;
