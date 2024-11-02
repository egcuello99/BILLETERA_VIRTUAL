import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";
import { ScrollView } from "react-native-gesture-handler";
import { logMovement } from "../../../../actions/movements.actions";
import { useAuthStore } from "../../../store/useAuthStore";

const AnualidadVencidaSemestre = () => {
  const [datos, setDatos] = useState({
    montoDeseado: "",
    tasaInteres: "",
    plazoSemestres: "",
  });

  const [renta, setRenta] = useState("");
  const [cargando, setCargando] = useState(false);

  const { user } = useAuthStore();
  const handleChange = (name: string, value: string) => {
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const montoDeseado = parseFloat(datos.montoDeseado);
    const tasaInteresDecimal = parseFloat(datos.tasaInteres) / 100; // Convertir la tasa de interés a decimal
    const plazoSemestres = parseInt(datos.plazoSemestres);

    // Calcular la renta necesaria
    const rentaNecesaria =
      montoDeseado /
      ((Math.pow(1 + tasaInteresDecimal, plazoSemestres) - 1) /
        tasaInteresDecimal);

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setRenta(rentaNecesaria.toFixed(2));
    }, 2000);
    await logMovement("Anualidad vencida", user?.id!);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-200">
      <View className="flex-1 p-4 bg-gray-200">
        <ExplicacionFormula>
          <Text className="text-lg text-gray-800">
            En las finanzas, una anualidad vencida se refiere a una serie de
            pagos periódicos realizados al final de cada período, donde el
            primer pago se realiza al final del primer período. Estos pagos son
            iguales en cantidad y ocurren al final de cada período.
          </Text>
          <Text className="text-lg text-gray-800">
            La fórmula utilizada para calcular la renta necesaria en una
            anualidad vencida es la siguiente:
          </Text>
          <Text className="text-lg font-bold text-gray-800">
            Renta = M / (((1 + i)^n - 1) / i)
          </Text>
          <Text className="text-lg text-gray-800">Donde:</Text>
          <Text>M: Monto deseado al final del período</Text>
          <Text>i: Tasa de interés por período (en decimal)</Text>
          <Text>n: Plazo en períodos</Text>
        </ExplicacionFormula>

        <View className="p-10 my-10 bg-white rounded-lg shadow">
          <Text className="block text-xl font-bold text-gray-600 uppercase">
            Monto deseado al final del período ($):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.montoDeseado}
            placeholder="Ingrese el monto deseado"
            onChangeText={(value) => handleChange("montoDeseado", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Tasa de interés (% semestral):
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.tasaInteres}
            placeholder="Ingrese la tasa de interés"
            onChangeText={(value) => handleChange("tasaInteres", value)}
            className="w-full p-3 mt-3 border rounded-xl bg-gray-50"
          />

          <Text className="block mt-4 text-xl font-bold text-gray-600 uppercase">
            Plazo en semestres:
          </Text>
          <TextInput
            keyboardType="numeric"
            value={datos.plazoSemestres}
            placeholder="Ingrese el plazo en semestres"
            onChangeText={(value) => handleChange("plazoSemestres", value)}
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
        <View className="my-10">
          {renta && (
            <Text className="text-2xl font-bold text-center">
              La renta necesaria es: ${renta}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default AnualidadVencidaSemestre;
