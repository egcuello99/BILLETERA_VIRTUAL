import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { RootStackParams } from "../../navigation/MainNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { UserLogin } from "../../../domain/entities/user";
import { useAuthStore } from "../../store/useAuthStore";
import * as LocalAuthentication from "expo-local-authentication"; // Importación para autenticación biométrica
import ToastManager, { Toast } from "toastify-react-native";

interface Props extends StackScreenProps<RootStackParams, "LoginScreen"> {}

export const LoginScreen = ({ navigation }: Props) => {
  const login = useAuthStore((state) => state.login);
  const authenticateWithBiometrics = useAuthStore(
    (state) => state.authenticateWithBiometrics
  );
  const status = useAuthStore((state) => state.status);
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      cedula: "",
      password: "",
    },
  });

  // Vigila el estado de autenticación y navega si está autenticado
  useEffect(() => {
    if (status === "authenticated") {
      navigation.replace("HomeScreen"); // Cambia a la pantalla Home o principal
    }
  }, [status, navigation]);

  const onSubmit = async (formData: UserLogin) => {
    try {
      const success = await login(formData);
      if (success) {
        Toast.success("Login exitoso");
      } else {
        Toast.error("Credenciales incorrectas", "");
      }
    } catch (error: any) {
      Toast.error(error.message, "");
    }
  };

  // Función para manejar la autenticación biométrica
  const handleBiometricAuth = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Usa tu huella para ingresar",
        fallbackLabel: "Usar contraseña",
      });

      if (biometricAuth.success) {
        await authenticateWithBiometrics(); // Cambia el estado de autenticación
        Toast.success("Huella verificada. Ingresando...");
      } else {
        Toast.error("No se pudo verificar la huella", "");
      }
    } catch (error) {
      Toast.error("Error con la autenticación biométrica", "");
    }
  };

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-slate-800">
      <ToastManager
        width={width * 0.9}
        style={{
          borderRadius: 10,
          padding: 10,
          margin: 10,
        }}
        position="top"
      />
      <View className="items-center justify-center flex-1">
        <Text className="text-5xl font-bold text-white uppercase">
          Billetera
        </Text>
      </View>
      <View className="items-center py-4 mx-7">
        <Controller
          control={control}
          name="cedula"
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              keyboardType="number-pad"
              placeholder="Cédula"
              className="w-full rounded bg-purple-50"
              value={value}
              onChangeText={onChange}
              outlineColor="purple"
              activeOutlineColor="purple"
            />
          )}
        />
        {errors.cedula && <ErrorMessage>{errors.cedula.message}</ErrorMessage>}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{ marginTop: 5 }}
              mode="outlined"
              keyboardType="number-pad"
              placeholder="Password"
              className="w-full rounded bg-purple-50"
              value={value}
              onChangeText={onChange}
              outlineColor="purple"
              secureTextEntry={true}
              activeOutlineColor="purple"
            />
          )}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          className="w-full py-1 my-2 font-bold text-white bg-pink-600 rounded"
        >
          Ingresar
        </Button>

        {/* Botón para autenticación biométrica */}
        <Button
          onPress={handleBiometricAuth}
          mode="contained"
          className="w-full py-1 my-2 font-bold text-white bg-green-600 rounded"
        >
          Ingresar con Huella
        </Button>

        <Button onPress={() => navigation.navigate("RegisterScreen")}>
          <Text className="text-white">¿No tienes cuenta? Regístrate</Text>
        </Button>
        <Button onPress={() => navigation.navigate("ForgotPasswordView")}>
          <Text className="text-white">Restablecer Password</Text>
        </Button>
      </View>
    </View>
  );
};
