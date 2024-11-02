import React from "react";
import { View } from "react-native";
import { Button, Text, Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function HomeAnualidades() {
  const navigation = useNavigation();

  const listComponents = {
    anualidadVencida: { name: "AnualidadVencida", title: "Anualidad Vencida" },
    anualidadSemestres: {
      name: "AnualidadSemestres",
      title: "Anualidad Semestres",
    },
    anualidadvencidacapitalNecesario: {
      name: "AnualidadVencidaCapitalNecesario",
      title: "Capital Necesario",
    },
    anualidadVencidaImportePagado: {
      name: "AnualidadVencidaImportePagado",
      title: "Importe Pagado",
    },
    anualidadvenciaValorPresente: {
      name: "ValorPresentePrestamo",
      title: "Valor Presente",
    },
    anualidadVencidaCapitalizacion: {
      name: "AnualidadVencidaCapitalizacion",
      title: "Capitalización",
    },
  };

  return (
    <View className="justify-center flex-1 p-4 bg-gray-200">
      {/* Buttons container */}
      <View className="items-center justify-center flex-1">
        <Text className="mt-10 mb-4 text-4xl font-bold text-center text-blue-700">
          Anualidades
        </Text>
        {Object.keys(listComponents).map((key) => (
          <Button
            key={key}
            mode="contained"
            className="w-full max-w-xs mb-2 bg-indigo-600 rounded-xl"
            // @ts-ignore
            onPress={() => navigation.navigate(listComponents[key].name)}
          >
            <Text className="font-bold text-white">
              {/* @ts-ignore */}
              {listComponents[key].title}
            </Text>
          </Button>
        ))}
      </View>
    </View>
  );
}
