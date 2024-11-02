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

const ValorPresenteAritmetico: React.FC = () => {
  const [tiempo, setTiempo] = useState<string>("");
  const [interes, setInteres] = useState<string>("");
  const [inicial, setInicial] = useState<string>("");
  const [gradiente, setGradiente] = useState<string>("");
  const [tipo, setTipo] = useState("creciente");
  const [resultado, setResultado] = useState<string>("");

  const validar = () => {
    realizarCalculo();
  };

  const realizarCalculo = () => {
    const interesDecimal = parseFloat(interes) / 100;
    let resultado: number;

    if (tipo === "creciente") {
      resultado = calcularValorPresenteCreciente(
        parseFloat(inicial),
        interesDecimal,
        parseFloat(tiempo),
        parseFloat(gradiente)
      );
    } else {
      resultado = calcularValorPresenteDecreciente(
        parseFloat(inicial),
        interesDecimal,
        parseFloat(tiempo),
        parseFloat(gradiente)
      );
    }

    const resultadoFormateado = resultado.toFixed(2);

    const mensaje =
      `Tiempo(n): ${tiempo} cuotas | Intereses(i): ${interes}% | ` +
      `Monto inicial(P): $${inicial} | Gradiente(g): $${gradiente} | ` +
      `${tipo === "creciente" ? "Creciente" : "Decreciente"}\n\n` +
      `El Valor Presente de este problema es: $${resultadoFormateado}`;

    setResultado(mensaje);

    setTiempo("");
    setInteres("");
    setInicial("");
    setGradiente("");
  };

  const calcularValorPresenteCreciente = (
    inicial: number,
    interes: number,
    tiempo: number,
    gradiente: number
  ): number => {
    const factorInteres = Math.pow(1 + interes, tiempo);
    const primeraParte = inicial * ((factorInteres - 1) / interes);
    const segundaParte = gradiente * ((factorInteres - 1) / interes - tiempo);

    return primeraParte + segundaParte;
  };

  const calcularValorPresenteDecreciente = (
    inicial: number,
    interes: number,
    tiempo: number,
    gradiente: number
  ): number => {
    const factorInteres = Math.pow(1 + interes, tiempo);
    const primeraParte = inicial * ((factorInteres - 1) / interes);
    const segundaParte = gradiente * ((factorInteres - 1) / interes - tiempo);

    return primeraParte - segundaParte;
  };

  return (
    <ScrollView className="bg-slate-100 p-5 mb-5">
      <View className="w-full bg-white shadow rounded-lg p-5">
        <ExplicacionFormula>
          <Text className="text-gray-800">
            El Valor Presente Aritmético se utiliza para calcular el valor
            presente de una serie de pagos que crecen o disminuyen
            aritméticamente en el tiempo. Este concepto es útil en situaciones
            en las que se espera que los pagos sigan un patrón de crecimiento o
            decrecimiento constante en el tiempo, como por ejemplo, en algunos
            tipos de préstamos o inversiones con pagos regulares.
          </Text>
          <Text className="text-gray-800">
            Las fórmulas para calcular el Valor Presente Aritmético son las
            siguientes:
          </Text>
          <Text className="text-gray-800 font-bold">
            Para gradiente aritmético creciente:
          </Text>
          <Text className="text-gray-800 font-bold">
            Valor Presente = (P * [(1 + i)^n - 1] / i) + g * [((1 + i)^n - 1) /
            i - n]
          </Text>
          <Text className="text-gray-800 font-bold">
            Para gradiente aritmético decreciente:
          </Text>
          <Text className="text-gray-800 font-bold">
            Valor Presente = (P * [(1 + i)^n - 1] / i) - g * [((1 + i)^n - 1) /
            i - n]
          </Text>
          <Text className="text-gray-800">
            Donde: P = Monto inicial o primer pago i = Tasa de interés por
            período, expresada en decimales n = Número de períodos g = Gradiente
            o cambio en los pagos por período
          </Text>
        </ExplicacionFormula>
        <View className="my-10 bg-white shadow rounded-lg p-5">
          <Text className="text-xl font-bold mb-3">
            Valor Presente Aritmético
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
              Gradiente
            </Text>
            <TextInput
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              keyboardType="numeric"
              value={gradiente}
              onChangeText={setGradiente}
              placeholder="Gradiente"
            />
          </View>
          <View className="my-2">
            <Text className="uppercase text-gray-600 text-xl font-bold">
              Tipo de gradiente
            </Text>
            <RadioButton.Group onValueChange={setTipo} value={tipo}>
              <View className="flex-row items-center">
                <RadioButton value="creciente" />
                <Text className="ml-2">Creciente</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton value="decreciente" />
                <Text className="ml-2">Decreciente</Text>
              </View>
            </RadioButton.Group>
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

export default ValorPresenteAritmetico;
