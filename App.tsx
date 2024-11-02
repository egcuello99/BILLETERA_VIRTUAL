import "react-native-gesture-handler";
import MainNavigator from "./src/presentation/navigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./src/presentation/provider/AuthProvider";
import StackNavigator from "./src/presentation/navigation/StackNavigator";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}
