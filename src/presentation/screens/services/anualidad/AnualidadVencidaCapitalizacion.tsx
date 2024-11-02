import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { useTailwind } from "nativewind"; // Import nativewind hook
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";
import { Picker } from "@react-native-picker/picker";
import { ActivityIndicator, Button } from "react-native-paper";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const AnualidadVencidaCapitalizacion = () => {
  const { user } = useAuthStore();
  const [pagoAnual, setPagoAnual] = useState("");
  const [tasaInteresNominal, setTasaInteresNominal] = useState("");
  const [frecuenciaCapitalizacion, setFrecuenciaCapitalizacion] = useState("1");
  const [montoFinal, setMontoFinal] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async () => {
    const pagoAnualValue = parseFloat(pagoAnual);
    const tasaInteresNominalValue = parseFloat(tasaInteresNominal) / 100;
    const frecuenciaCapitalizacionValue = parseInt(frecuenciaCapitalizacion);

    const tasaInteresEfectiva =
      Math.pow(
        1 + tasaInteresNominalValue / frecuenciaCapitalizacionValue,
        frecuenciaCapitalizacionValue
      ) - 1;

    const montoFinalCalc =
      pagoAnualValue *
      ((Math.pow(1 + tasaInteresEfectiva, 20 * frecuenciaCapitalizacionValue) -
        1) /
        tasaInteresEfectiva);

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setMontoFinal(montoFinalCalc.toFixed(2));
    }, 2000);
    await logMovement("Anualidad Vencida Capitalizacion", user?.id!);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <View className="p-5">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            La anualidad vencida con capitalización es un concepto financiero
            que implica el cálculo del monto final en una cuenta después de un
            período determinado, teniendo en cuenta la capitalización de los
            intereses.
          </Text>
          <Text className="text-lg text-gray-800">
            La fórmula utilizada para calcular el monto final en la cuenta
            después de un período de capitalización es:
          </Text>
          <Text className="text-lg font-bold text-gray-800">
            MF = P * ((1 + i/m)^n - 1) / (i/m)
          </Text>
          <Text className="text-lg text-gray-800">Donde:</Text>
          <Text className="pl-8 list-disc">MF = Monto final en la cuenta</Text>
          <Text className="pl-8 list-disc">P = Pago anual</Text>
          <Text className="pl-8 list-disc">
            i = Tasa de interés nominal por período (en decimal)
          </Text>
          <Text className="pl-8 list-disc">
            m = Frecuencia de capitalización por año
          </Text>
          <Text className="pl-8 list-disc">
            n = Número total de períodos de capitalización
          </Text>
        </ExplicacionFormula>

        <TextInput
          className="p-3 my-2 border rounded-xl bg-gray-50"
          placeholder="Ingrese el pago anual"
          keyboardType="numeric"
          value={pagoAnual}
          onChangeText={setPagoAnual}
        />
        <TextInput
          className="p-3 my-2 border rounded-xl bg-gray-50"
          placeholder="Ingrese la tasa de interés nominal"
          keyboardType="numeric"
          value={tasaInteresNominal}
          onChangeText={setTasaInteresNominal}
        />
        <Picker
          selectedValue={frecuenciaCapitalizacion}
          className="p-3 my-2 border rounded-xl bg-gray-50"
          onValueChange={(itemValue) => setFrecuenciaCapitalizacion(itemValue)}
        >
          <Picker.Item label="Anual" value="1" />
          <Picker.Item label="Semestral" value="2" />
          <Picker.Item label="Cuatrimestral" value="4" />
          <Picker.Item label="Mensual" value="12" />
          <Picker.Item label="Diario" value="365" />
        </Picker>
        <Button
          mode="contained"
          onPress={handleSubmit}
          className="bg-indigo-600"
        >
          <Text className="font-bold text-center text-white uppercase">
            Calcular
          </Text>
        </Button>

        {cargando && (
          <View className="mx-5 my-10 text-center">
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        )}
        {montoFinal && (
          <View className="mt-10">
            <Text className="text-lg">
              El monto final en la cuenta después de 20 años es: ${montoFinal}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AnualidadVencidaCapitalizacion;
