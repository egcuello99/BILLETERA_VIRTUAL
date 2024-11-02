import React from "react";
import { View, Text, TextInput, useWindowDimensions } from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/MainNavigation";
import { resetPassword } from "../../../actions/auth.actions"; // Function to reset password

interface Props extends StackScreenProps<RootStackParams, "NewPasswordView"> {}

export default function NewPasswordView({ route, navigation }: Props) {
  const { width } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string; newPassword: string }>({
    defaultValues: { email: "", newPassword: "" },
  });

  const { mutate } = useMutation({
    mutationFn: (formData: { email: string; newPassword: string }) =>
      resetPassword(formData.email, formData.newPassword),
    onError: (error) => {
      Toast.error(error.message, "");
    },
    onSuccess: () => {
      Toast.success("Contraseña restablecida con éxito");
      setTimeout(() => {
        navigation.navigate("LoginScreen");
      }, 2000);
      reset();
    },
  });

  const handleResetPassword = (formData: {
    email: string;
    newPassword: string;
  }) => {
    mutate(formData);
  };

  return (
    <View className="items-center justify-center flex-1 p-5 bg-slate-800">
      <ToastManager width={width * 0.9} position="top" />
      <Text className="mb-4 text-5xl font-black text-white">
        Nueva Contraseña
      </Text>
      <View className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Controller
          control={control}
          name="email"
          rules={{ required: "El email es obligatorio" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-6">
              <Text className="mb-2 text-xl font-medium">Email</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: "#D1D5DB" }}
                className="w-full p-3 border rounded-lg"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email de Registro"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          rules={{ required: "La nueva contraseña es obligatoria" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-6">
              <Text className="mb-2 text-xl font-medium">Nueva Contraseña</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: "#D1D5DB" }}
                className="w-full p-3 border rounded-lg"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nueva Contraseña"
                secureTextEntry
              />
              {errors.newPassword && (
                <Text className="text-red-500">
                  {errors.newPassword.message}
                </Text>
              )}
            </View>
          )}
        />
        <Button
          mode="contained"
          className="w-full p-2 text-white rounded-lg bg-fuchsia-600"
          onPress={handleSubmit(handleResetPassword)}
        >
          Restablecer Contraseña
        </Button>
      </View>
    </View>
  );
}
