import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { db } from "../../../config/firebase/app"; // Adjust the import as necessary
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthStore } from "../../store/useAuthStore";

export const StatusPrestamoScreen = () => {
  const { user } = useAuthStore(); // Assuming you have an authentication context
  const { top } = useSafeAreaInsets();
  const [loanStatus, setLoanStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoanStatus = async () => {
      if (user) {
        const loansRef = collection(db, "loans");
        const q = query(loansRef, where("userId", "==", user.id)); // Assuming user.id is the user's ID

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const loanData = querySnapshot.docs[0].data(); // Get the first loan record found
          setLoanStatus(loanData);
        } else {
          console.log("No loan records found for this user.");
        }
      }
      setLoading(false);
    };

    fetchLoanStatus();
  }, [user]);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 pt-10 bg-gray-100">
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!loanStatus) {
    return (
      <View className="items-center justify-center flex-1 pt-10 bg-gray-100">
        <Text className="text-lg text-center text-gray-600">
          No hay solicitudes de préstamos para mostrar.
        </Text>
      </View>
    );
  }

  const { status, applicantName, loanAmount } = loanStatus;
  // @ts-ignore
  const statusInfo = loanStatuses[status] || loanStatuses.Pendiente;

  return (
    <View className="items-center justify-center flex-1 pt-10 bg-gray-100">
      <View className="w-11/12 max-w-lg p-5 bg-white rounded-lg shadow-md">
        <Text className="text-lg font-bold text-center text-gray-800">
          {statusInfo.message}
        </Text>
        <Text className="mt-3 text-center text-gray-700 text-md">
          Nombre del solicitante: {applicantName}
        </Text>
        <Text className="mt-2 text-center text-gray-700 text-md">
          Monto solicitado: {loanAmount}€
        </Text>

        <TouchableOpacity
          className="py-2 mt-5 bg-blue-600 rounded-md"
          onPress={() => {
            // Navigate back or perform an action
          }}
        >
          <Text className="font-bold text-center text-white">Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const loanStatuses = {
  Aprobado: {
    message: "¡Felicidades! Tu préstamo ha sido aprobado.",
  },
  Rechazado: {
    message: "Lo sentimos, tu préstamo ha sido rechazado.",
  },
  Pendiente: {
    message: "Tu solicitud está pendiente de revisión.",
  },
};
