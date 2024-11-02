import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";
import { ServicesScreen } from "../screens/services/ServicesScreen";
import { MovementScreen } from "../screens/movements/MovementScreen";

const Tab = createBottomTabNavigator();

export const BotonTabsNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: theme.colors.background,
          shadowColor: "transparent",
          shadowOpacity: 0,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          position: "absolute",
        },
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Movimientos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="menufold" size={size} color={color} />
          ),
        }}
        component={MovementScreen}
      />
      <Tab.Screen
        name="Servicios"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="design-services" size={size} color={color} />
          ),
        }}
        component={ServicesScreen}
      />
    </Tab.Navigator>
  );
};
