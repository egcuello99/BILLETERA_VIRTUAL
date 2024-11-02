import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import AmericanAmortization from "./AmericanAmortization";
import FrenchAmortization from "./FrenchAmortization";
import GermanAmortization from "./GermanAmortization";

const App = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <GermanAmortization />
        <FrenchAmortization />
        <AmericanAmortization />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
