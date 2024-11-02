import React from "react";
import { View, Text, TextInput, useWindowDimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "../../../domain/entities/user";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Button } from "react-native-paper";
import ToastManager, { Toast } from "toastify-react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/MainNavigation";
import { resetPassword } from "../../../actions/auth.actions";

interface Props
  extends StackScreenProps<RootStackParams, "ForgotPasswordView"> {}

export default function ForgotPasswordView({ navigation }: Props) {
  const { width } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    defaultValues: { email: "", newPassword: "" },
  });

  const { mutate } = useMutation({
    mutationFn: (formData: ForgotPasswordForm) =>
      resetPassword(formData.email, formData.newPassword),
    onError: (error) => {
      Toast.error(error.message, "");
    },
    onSuccess: (data) => {
      if (data) {
        Toast.success("Instrucciones enviadas con éxito");
        navigation.replace("NewPasswordView");
        reset();
      } else {
        Toast.error(
          "No se encontró el usuario con el correo proporcionado",
          ""
        );
      }
    },
  });

  const handleForgotPassword = (formData: ForgotPasswordForm) =>
    mutate(formData);

  return (
    <View className="items-center justify-center flex-1 p-5 bg-slate-800">
      <ToastManager width={width * 0.9} position="top" />
      <Text className="mb-4 text-5xl font-black text-white">
        Reestablecer Contraseña
      </Text>
      <Text className="mb-8 text-2xl font-light text-center text-white">
        ¿Olvidaste tu contraseña? Ingresa tu email{" "}
        <Text className="font-bold text-fuchsia-500">para reestablecerla</Text>
      </Text>
      <View className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Controller
          control={control}
          name="email"
          rules={{
            required: "El Email de registro es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail no válido",
            },
          }}
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
                <ErrorMessage>{errors.email.message}</ErrorMessage>
              )}
            </View>
          )}
        />
        <Button
          mode="contained"
          className="w-full p-2 text-white rounded-lg bg-fuchsia-600"
          onPress={handleSubmit(handleForgotPassword)}
        >
          Verificar Correo
        </Button>
      </View>
    </View>
  );
}
