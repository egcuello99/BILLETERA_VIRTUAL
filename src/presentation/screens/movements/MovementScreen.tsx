import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../../navigation/AuthNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthStore } from "../../store/useAuthStore";
import { Timestamp } from "firebase/firestore";

export const MovementScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();
  const [movements, setMovements] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para el refresco
  const { user } = useAuthStore(); // Obtener el usuario autenticado

  const fetchMovements = async () => {
    setLoading(true);
    const db = getFirestore();
    const movementsRef = collection(db, "movements");
    const q = query(movementsRef, where("userId", "==", user?.id)); // Filtrar por userId

    try {
      const querySnapshot = await getDocs(q);
      const movementsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovements(movementsData);
    } catch (error) {
      console.error("Error fetching movements:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Finaliza el refresco
    }
  };

  useEffect(() => {
    if (user) {
      fetchMovements();
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovements();
  };

  return (
    <ScrollView
      style={{ paddingTop: top }}
      className="flex-1 bg-slate-900"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text className="mb-4 text-lg font-bold text-center text-white">
        Movimientos
      </Text>
      {loading && (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {movements.length === 0 ? (
        <Text className="text-center text-white">
          No hay movimientos registrados.
        </Text>
      ) : (
        movements.map((movement: any) => (
          <View
            key={movement.id}
            className="flex-row items-center justify-between p-3 mx-2 my-2 bg-white rounded"
          >
            <View>
              <Text className="text-xs text-gray-800">
                {Timestamp.fromMillis(movement.timestamp)
                  .toDate()
                  .toLocaleDateString("es-CO")}
              </Text>
              <Text className="font-semibold text-gray-800">
                {movement.description}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-bold text-red-600">
                {movement.amount}
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};
