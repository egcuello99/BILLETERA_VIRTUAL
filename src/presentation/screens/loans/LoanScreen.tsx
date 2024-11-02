import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { formatCurrency } from "../../../utils";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase/app";
import { useAuthStore } from "../../store/useAuthStore";

export const LoanScreen = () => {
  const { user } = useAuthStore();
  const [capital, setCapital] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [growthRate, setGrowthRate] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [loanType, setLoanType] = useState("simple");
  const [hasPendingLoan, setHasPendingLoan] = useState(false);

  useEffect(() => {
    const checkPendingLoan = async () => {
      if (user) {
        const loansRef = collection(db, "loans");
        const q = query(
          loansRef,
          where("userId", "==", user.id),
          where("status", "==", "Pendiente")
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setHasPendingLoan(true); // User has a pending loan
        }
      }
    };

    checkPendingLoan();
  }, [user]);

  // @ts-ignore
  const logMovement = async (description) => {
    try {
      await addDoc(collection(db, "movements"), {
        userId: user?.id,
        description,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error logging movement:", error);
    }
  };

  const calculateLoan = () => {
    const P = parseFloat(capital);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(years);
    const g = parseFloat(growthRate) / 100;
    const n = t * 12;

    let totalAmount: number;
    let monthlyPaymentValue: number | null = null;

    if (loanType === "simple") {
      totalAmount = P * (1 + r * t);
      monthlyPaymentValue = totalAmount / n;
    } else if (loanType === "compuesto") {
      totalAmount = P * Math.pow(1 + r, t);
      monthlyPaymentValue = totalAmount / n;
    } else if (loanType === "compuesto_continuo") {
      totalAmount = P * Math.exp(r * t);
      monthlyPaymentValue = totalAmount / n;
    } else if (loanType === "gradiente") {
      if (r === g) {
        totalAmount = P * (1 + r) * t;
      } else {
        totalAmount = P * ((Math.pow(1 + r, t) - Math.pow(1 + g, t)) / (r - g));
      }
      monthlyPaymentValue = totalAmount / n;
    } else if (loanType === "amortizacion") {
      const monthlyRate = r / 12;
      monthlyPaymentValue =
        (P * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1);
      totalAmount = monthlyPaymentValue * n;
    }

    // @ts-ignore
    setResult(totalAmount);
    setMonthlyPayment(monthlyPaymentValue);
  };

  const submitLoanApplication = async () => {
    try {
      await addDoc(collection(db, "loans"), {
        applicantName,
        email,
        loanAmount: result,
        loanType,
        interestRate,
        years,
        monthlyPayment: monthlyPayment,
        timestamp: new Date(),
        userId: user?.id,
        status: "Pendiente", // Set the initial status to "Pendiente"
      });

      // Log the movement for submitting the loan application
      await logMovement(`Solicitud de préstamo enviada por ${applicantName}.`);

      Alert.alert("Éxito", "Solicitud de préstamo enviada exitosamente");
    } catch (error) {
      console.error("Error al enviar la solicitud de préstamo:", error);
      Alert.alert("Error", "Hubo un error al enviar la solicitud");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20, backgroundColor: "#f8f9fa" }}
    >
      <Text className="mb-6 text-2xl font-bold text-center text-gray-800">
        Calculadora de Préstamo
      </Text>

      {hasPendingLoan ? (
        <View className="p-4 mb-4 bg-yellow-100 border border-yellow-400 rounded-md">
          <Text className="text-lg text-center text-yellow-800">
            Ya tienes una solicitud de préstamo pendiente. No puedes realizar
            otra hasta que se procese.
          </Text>
        </View>
      ) : (
        <>
          {/* Capital Input */}
          <View className="mb-4">
            <Text className="text-lg text-gray-700">
              Capital Inicial (USD):
            </Text>
            <TextInput
              value={capital}
              onChangeText={setCapital}
              keyboardType="numeric"
              className="p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el monto del préstamo"
            />
          </View>

          {/* Interest Rate Input */}
          <View className="mb-4">
            <Text className="text-lg text-gray-700">Tasa de Interés (%):</Text>
            <TextInput
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
              className="p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Ingrese la tasa de interés"
            />
          </View>

          {/* Years Input */}
          <View className="mb-4">
            <Text className="text-lg text-gray-700">Duración (Años):</Text>
            <TextInput
              value={years}
              onChangeText={setYears}
              keyboardType="numeric"
              className="p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Ingrese los años del préstamo"
            />
          </View>

          {/* Loan Type Selection */}
          <View className="mb-4">
            <Text className="mb-2 text-lg text-gray-700">Tipo de Interés:</Text>
            <RadioButton.Group
              onValueChange={(value) => setLoanType(value)}
              value={loanType}
            >
              <View className="flex-row items-center mb-2">
                <RadioButton value="simple" />
                <Text>Interés Simple</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <RadioButton value="compuesto" />
                <Text>Interés Compuesto</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <RadioButton value="compuesto_continuo" />
                <Text>Interés Compuesto Continuo</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <RadioButton value="gradiente" />
                <Text>Interés Gradiente</Text>
              </View>
              <View className="flex-row items-center mb-2">
                <RadioButton value="amortizacion" />
                <Text>Amortización</Text>
              </View>
            </RadioButton.Group>
          </View>

          {/* Growth Rate Input for Gradient Interest */}
          {loanType === "gradiente" && (
            <View className="mb-4">
              <Text className="text-lg text-gray-700">
                Tasa de Crecimiento (%):
              </Text>
              <TextInput
                value={growthRate}
                onChangeText={setGrowthRate}
                keyboardType="numeric"
                className="p-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Ingrese la tasa de crecimiento"
              />
            </View>
          )}

          {/* Calculate Button */}
          <Pressable
            onPress={calculateLoan}
            className="p-4 mt-4 bg-blue-600 rounded-md"
          >
            <Text className="text-lg font-bold text-center text-white">
              Calcular
            </Text>
          </Pressable>

          {/* Result Display */}
          {result !== null && (
            <View className="mt-6">
              <Text className="text-xl font-bold text-center text-gray-800">
                Total a Pagar: {formatCurrency(result)}
              </Text>
            </View>
          )}

          {monthlyPayment !== null && (
            <View className="mt-2">
              <Text className="text-xl font-bold text-center text-gray-800">
                Pago Mensual: {formatCurrency(monthlyPayment)}
              </Text>
            </View>
          )}

          {/* Applicant Info */}
          <View className="mb-4">
            <Text className="text-lg text-gray-700">
              Nombre del Solicitante:
            </Text>
            <TextInput
              value={applicantName}
              onChangeText={setApplicantName}
              className="p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Ingrese su nombre"
            />
          </View>

          <View className="mb-4">
            <Text className="text-lg text-gray-700">Email:</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Ingrese su email"
              keyboardType="email-address"
            />
          </View>

          {/* Submit Button */}
          <Pressable
            onPress={submitLoanApplication}
            className="p-4 mt-4 bg-green-600 rounded-md"
          >
            <Text className="text-lg font-bold text-center text-white">
              Enviar Solicitud
            </Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
};
