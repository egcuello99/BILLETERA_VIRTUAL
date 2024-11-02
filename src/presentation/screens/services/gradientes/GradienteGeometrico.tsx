import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, RadioButton } from "react-native-paper";
import ExplicacionFormula from "../../../components/shared/ExplicacionFormula";

const GradienteGeometrico: React.FC = () => {
  const [tiempo, setTiempo] = useState<string>("");
  const [interes, setInteres] = useState<string>("");
  const [inicial, setInicial] = useState<string>("");
  const [gradiente, setGradiente] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");

  const validar = () => {
    realizarCalculo();
  };

  const realizarCalculo = () => {
    const interesDecimal = parseFloat(interes) / 100;
    const gradienteDecimal = parseFloat(gradiente) / 100;
    let resultado: number;

    resultado = calcularValorPresenteGeometrico(
      parseFloat(inicial),
      interesDecimal,
      parseFloat(tiempo),
      gradienteDecimal
    );

    const resultadoFormateado = resultado.toFixed(2);

    const mensaje =
      `Tiempo(n): ${tiempo} cuotas | Intereses(i): ${interes}% | ` +
      `Monto inicial(P): $${inicial} | Tasa de gradiente geométrico(r): ${gradiente}%\n\n` +
      `El Valor Presente de este problema es: $${resultadoFormateado}`;

    setResultado(mensaje);

    setTiempo("");
    setInteres("");
    setInicial("");
    setGradiente("");
  };

  const calcularValorPresenteGeometrico = (
    inicial: number,
    interes: number,
    tiempo: number,
    gradiente: number
  ): number => {
    if (interes === gradiente) {
      return inicial * tiempo; // Caso especial cuando la tasa de interés es igual a la tasa de gradiente.
    }
    return (
      (inicial / (interes - gradiente)) *
      (1 - Math.pow((1 + gradiente) / (1 + interes), tiempo))
    );
  };

  return (
    <ScrollView className="bg-slate-100 p-5 mb-5">
      <View className="w-full bg-white shadow rounded-lg p-5">
        <ExplicacionFormula>
          <Text className="text-gray-800">
            El Valor Presente Geométrico se utiliza para calcular el valor presente de una serie de pagos que crecen o disminuyen geométricamente en el tiempo. Este concepto es útil en situaciones donde los pagos siguen un patrón de crecimiento o decrecimiento exponencial.
          </Text>
          <Text className="text-gray-800">
            La fórmula para calcular el Valor Presente Geométrico es la siguiente:
          </Text>
          <Text className="text-gray-800 font-bold">
            Valor Presente = (P / (i - r)) * [1 - ((1 + r) / (1 + i))^n]
          </Text>
          <Text className="text-gray-800">
            Donde: P = Monto inicial, i = Tasa de interés, r = Tasa de gradiente geométrico, n = Número de períodos.
          </Text>
        </ExplicacionFormula>
        <View className="my-10 bg-white shadow rounded-lg p-5">
          <Text className="text-xl font-bold mb-3">
            Valor Presente Geométrico
          </Text>
          <View className="mb-4">
            <Text className="uppercase text-gray-600 text-xl font-bold">
              Tiempo
            </Text>
            <TextInput
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              keyboardType="numeric"
              value={tiempo}
              onChangeText={setTiempo}
              placeholder="En meses"
            />
          </View>
          <View className="mb-4">
            <Text className="uppercase text-gray-600 text-xl font-bold">
              Tasa de interés
            </Text>
            <TextInput
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              keyboardType="numeric"
              value={interes}
              onChangeText={setInteres}
              placeholder="0..100"
            />
          </View>
          <View className="mb-4">
            <Text className="uppercase text-gray-600 text-xl font-bold">
              Monto inicial
            </Text>
            <TextInput
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              keyboardType="numeric"
              value={inicial}
              onChangeText={setInicial}
              placeholder="Monto inicial"
            />
          </View>
          <View className="mb-4">
            <Text className="uppercase text-gray-600 text-xl font-bold">
              Tasa de gradiente geométrico
            </Text>
            <TextInput
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              keyboardType="numeric"
              value={gradiente}
              onChangeText={setGradiente}
              placeholder="Tasa de gradiente"
            />
          </View>
          <Button mode="contained" onPress={validar}>
            <Text className="text-white text-center font-bold uppercase">
              Resultado
            </Text>
          </Button>
        </View>
        {resultado ? (
          <View className="bg-white p-3 rounded-md mt-4">
            <Text className="text-center text-xl font-bold uppercase">
              {resultado}
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default GradienteGeometrico;
