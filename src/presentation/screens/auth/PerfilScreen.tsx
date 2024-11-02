import React from "react";
import { Pressable, TextInput, useWindowDimensions, View } from "react-native";
import { Text, Button } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/MainNavigation";
import { UserProfileForm } from "../../../domain/entities/user";
import ToastManager, { Toast } from "toastify-react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { updateUser } from "../../../actions/auth.actions";

interface Props extends StackScreenProps<RootStackParams, "PerfilScreen"> {}

export const PerfilScreen = ({ navigation }: Props) => {
  const { user, setUser } = useAuthStore();
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      telefono: user?.telefono || "",
      fechaNacimiento: user?.fechaNacimiento || "",
      fechaExpedicion: user?.fechaExpedicion || "",
      genero: user?.genero || "",
      confirmed: false,
    },
  });

  const updatePerfil = async (formData: UserProfileForm) => {
    try {
      await updateUser(user?.id!, formData);
      // @ts-ignore
      setUser({ ...user, ...formData });
      Toast.success("Perfil actualizado correctamente");
      navigation.pop();
    } catch (error) {
      console.log(error);
      Toast.error("Error al actualizar el perfil", "");
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-800">
      <View style={{ paddingTop: top }} className="p-6">
        <ToastManager
          width={width * 0.9}
          style={{ borderRadius: 10, padding: 10, margin: 10 }}
          position="top"
        />
        <View className="absolute mx-4 mt-12">
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="back" size={28} color="white" />
          </Pressable>
        </View>

        <View className="items-center mx-4 mt-5">
          <Text className="text-2xl font-bold text-center text-white">
            Editar Perfil
          </Text>
        </View>

        <View className="mt-10 space-y-5">
          <View>
            <Text className="mb-2 text-sm font-bold text-white uppercase">
              Nombre
            </Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Nombre de usuario es obligatorio" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                  placeholder="Tu Nombre"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text className="mt-2 text-red-500">{errors.name.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-bold text-white uppercase">
              E-mail
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                  placeholder="Tu Email"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={false}
                />
              )}
            />
            {errors.email && (
              <Text className="mt-2 text-red-500">{errors.email.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-bold text-white uppercase">
              Telefono
            </Text>
            <Controller
              control={control}
              name="telefono"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                  placeholder="Tu Teléfono"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.telefono && (
              <Text className="mt-2 text-red-500">
                {errors.telefono.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-bold text-white uppercase">
              Fecha de Nacimiento
            </Text>
            <Controller
              control={control}
              name="fechaNacimiento"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                  placeholder="Fecha de Nacimiento"
                  onChangeText={onChange}
                  value={value}
                  editable={false}
                />
              )}
            />
            {errors.fechaNacimiento && (
              <Text className="mt-2 text-red-500">
                {errors.fechaNacimiento.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-bold text-white uppercase">
              Fecha de Expedición
            </Text>
            <Controller
              control={control}
              name="fechaExpedicion"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                  placeholder="Fecha de Expedición"
                  onChangeText={onChange}
                  value={value}
                  editable={false}
                />
              )}
            />
            {errors.fechaExpedicion && (
              <Text className="mt-2 text-red-500">
                {errors.fechaExpedicion.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-sm font-bold text-white uppercase">
              Género
            </Text>
            <Controller
              control={control}
              name="genero"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderRadius: 5,
                  }}
                  placeholder="Género"
                  onChangeText={onChange}
                  value={value}
                  editable={false}
                />
              )}
            />
            {errors.genero && (
              <Text className="mt-2 text-red-500">{errors.genero.message}</Text>
            )}
          </View>
        </View>

        <View className="mt-8 mb-5">
          <Button
            mode="contained"
            onPress={handleSubmit(updatePerfil)}
            color="blue"
          >
            Actualizar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
