import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RootStackParams } from "../../navigation/MainNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { UserRegister } from "../../../domain/entities/user";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "../../components/ui/ErrorMessage";
import ToastManager, { Toast } from "toastify-react-native";
import { authRegisters } from "../../../actions/auth.actions";

interface Props extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({ navigation }: Props) => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const [showExpDatePicker, setShowExpDatePicker] = useState(false);
  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserRegister>({
    defaultValues: {
      name: "",
      cedula: "",
      email: "",
      telefono: "",
      fechaExpedicion: "",
      fechaNacimiento: "",
      genero: "",
      password: "",
      saldo: 100000,
    },
  });

  const onSubmit = async (formData: UserRegister) => {
    try {
      await authRegisters(formData);
      Toast.success("Registro exitoso!");
      navigation.pop();
    } catch (error: any) {
      Toast.error(error.message, "");
      console.log(error);
    }
  };

  const onExpDateChange = (event: any, selectedDate?: Date) => {
    setShowExpDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue("fechaExpedicion", formattedDate);
    }
  };

  const onBirthDateChange = (event: any, selectedDate?: Date) => {
    setShowBirthDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue("fechaNacimiento", formattedDate);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={{ paddingTop: top }}
      className="flex-1 bg-gray-200"
    >
      <View className="justify-center flex-1 mx-5 mb-2">
        <ToastManager width={width * 0.9} position="top" />
        <Text className="my-2 text-4xl font-extrabold text-center text-purple-900">
          Registro
        </Text>

        <View className="mt-5">
          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Nombre Completo
          </Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                placeholder="Ingresa tu nombre"
                className="mb-2 bg-white"
                outlineColor="purple"
                activeOutlineColor="purple"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          {/* Campo Cédula */}
          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Cédula
          </Text>
          <Controller
            control={control}
            name="cedula"
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                placeholder="Ingresa tu cédula"
                keyboardType="numeric"
                className="mb-2 bg-white"
                outlineColor="purple"
                activeOutlineColor="purple"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.cedula && (
            <ErrorMessage>{errors.cedula.message}</ErrorMessage>
          )}
          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Correo
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                placeholder="Ingresa su correo"
                keyboardType="email-address"
                className="mb-2 bg-white"
                outlineColor="purple"
                activeOutlineColor="purple"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Telefono
          </Text>
          <Controller
            control={control}
            name="telefono"
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                placeholder="Ingresa el telefono"
                keyboardType="number-pad"
                className="mb-2 bg-white"
                outlineColor="purple"
                activeOutlineColor="purple"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.telefono && (
            <ErrorMessage>{errors.telefono.message}</ErrorMessage>
          )}

          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Fecha de Expedición de la Cédula
          </Text>
          <TouchableOpacity
            onPress={() => setShowExpDatePicker(true)}
            className="mb-2"
          >
            <Controller
              control={control}
              name="fechaExpedicion"
              render={({ field: { value } }) => (
                <TextInput
                  mode="outlined"
                  placeholder="Selecciona la fecha de expedición"
                  value={value}
                  editable={false}
                  className="bg-white"
                  outlineColor="purple"
                  activeOutlineColor="purple"
                />
              )}
            />
          </TouchableOpacity>
          {errors.fechaExpedicion && (
            <ErrorMessage>{errors.fechaExpedicion.message}</ErrorMessage>
          )}
          {showExpDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onExpDateChange}
              maximumDate={new Date()}
            />
          )}
          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Fecha de Nacimiento
          </Text>
          <TouchableOpacity
            onPress={() => setShowBirthDatePicker(true)}
            className="mb-2"
          >
            <Controller
              control={control}
              name="fechaNacimiento"
              render={({ field: { value } }) => (
                <TextInput
                  mode="outlined"
                  placeholder="Selecciona tu fecha de nacimiento"
                  value={value}
                  editable={false}
                  className="bg-white"
                  outlineColor="purple"
                  activeOutlineColor="purple"
                />
              )}
            />
            {errors.fechaNacimiento && (
              <ErrorMessage>{errors.fechaNacimiento.message}</ErrorMessage>
            )}
          </TouchableOpacity>
          {showBirthDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onBirthDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Género
          </Text>
          <Controller
            control={control}
            name="genero"
            render={({ field: { onChange, value } }) => (
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
              </Picker>
            )}
          />

          <Text className="mb-1 text-xl font-bold text-purple-900 text-start">
            Password
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                mode="outlined"
                placeholder="Password"
                className="mb-2 bg-white"
                outlineColor="purple"
                activeOutlineColor="purple"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          <Button
            mode="contained"
            className="py-2 mt-5 bg-violet-900"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-lg text-white">Registrarse</Text>
          </Button>
        </View>
        <Button onPress={() => navigation.pop()}>
          <Text className="text-violet-600">¿Tienes cuenta? Ingresa</Text>
        </Button>
      </View>
    </ScrollView>
  );
};
