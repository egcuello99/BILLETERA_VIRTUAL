import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../../../config/firebase/app";
import { logMovement } from "../../../actions/movements.actions";
import { useAuthStore } from "../../store/useAuthStore";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export const AdminLoadsScreen = () => {
  const [loads, setLoads] = useState<any[]>([]);
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();
  console.log(user);

  useEffect(() => {
    getLoads();
  }, []);

  const getLoads = async () => {
    const querySnapshot = await getDocs(collection(db, "loans"));
    setLoads(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleApprove = async (load: any) => {
    try {
      const roundedLoanAmount = Math.round(load.loanAmount);

      const loanRef = doc(db, "loans", load.id);
      await updateDoc(loanRef, {
        status: "Aprobado",
        approvedLoanAmount: roundedLoanAmount,
      });

      const userRef = doc(db, "users", load.userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newBalance = (userData.saldo || 0) + roundedLoanAmount;
        await updateDoc(userRef, { saldo: newBalance });
        Alert.alert(
          "Éxito",
          `Préstamo aprobado correctamente por ${roundedLoanAmount}. Nuevo saldo del usuario: ${newBalance}`
        );
        await logMovement("Aprobación de préstamo ", user?.id!);
      } else {
        Alert.alert("Error", "Usuario no encontrado.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un error al aprobar el préstamo.");
    }
  };

  const handleReject = async (load: any) => {
    try {
      const loanRef = doc(db, "loans", load.id);
      await updateDoc(loanRef, { status: "Rechazado" });
      Alert.alert("Préstamo rechazado.");
      await logMovement("Rechazo de préstamo ", "");
    } catch (error) {
      Alert.alert("Error", "Hubo un error al rechazar el préstamo.");
    }
  };

  // const handleChangeStatus = async (load: any) => {
  //   try {
  //     const loanRef = doc(db, "loans", load.id);
  //     await updateDoc(loanRef, {
  //       status: load.status === "Pendiente" ? "Aprobado" : "Pendiente",
  //     });
  //     Alert.alert("Estado cambiado correctamente.");
  //   } catch (error) {
  //     Alert.alert("Error", "Hubo un error al cambiar el estado.");
  //   }
  // };

  return (
    <ScrollView style={[{ paddingTop: top }]}>
      <Text className="mt-4 mb-6 text-2xl italic font-bold text-center text-gray-800">
        Solicitudes de Préstamos
      </Text>

      {loads.length === 0 ? (
        <Text className="text-lg text-center text-gray-600">
          No hay solicitudes de préstamos.
        </Text>
      ) : (
        loads.map((load) => {
          const roundedLoanAmount = Math.round(load.loanAmount);

          return (
            <View
              key={load.id}
              className="p-4 m-3 bg-white rounded-lg shadow-md"
            >
              <Text className="text-lg font-semibold text-gray-700">
                {load.applicantName}
              </Text>
              <Text className="text-gray-500">
                Monto solicitado: {roundedLoanAmount}
              </Text>
              <Text className="text-gray-500">
                Tipo de préstamo: {load.loanType}
              </Text>
              <Text className="text-gray-500">
                Tasa de interés: {load.interestRate}%
              </Text>
              <Text className="text-gray-500">Años: {load.years}</Text>
              <Text className="text-gray-500">
                Cuota mensual: {load.monthlyPayment}
              </Text>
              <Text className="text-gray-500">
                Estado: {load.status || "Pendiente"}
              </Text>

              {load.status === "Aprobado" ? (
                <Text className="mt-4 font-semibold text-green-600">
                  Préstamo Aprobado
                </Text>
              ) : (
                <View className="flex-row justify-between mt-4">
                  <TouchableOpacity
                    onPress={() => handleApprove(load)}
                    className="p-2 bg-green-500 rounded-lg"
                  >
                    <Text className="font-semibold text-white">Aprobar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleReject(load)}
                    className="p-2 bg-red-500 rounded-lg"
                  >
                    <Text className="font-semibold text-white">Rechazar</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => handleChangeStatus(load)}
                    className="p-2 bg-blue-500 rounded-lg"
                  >
                    <Text className="font-semibold text-white">
                      {load.status === "Pendiente"
                        ? "Cambiar a Aprobado"
                        : "Pendiente"}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
};
