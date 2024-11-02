import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/MainNavigation";

export const ServicesScreen = () => {
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParams>["navigation"]>();

  return (
    <ScrollView style={{ paddingTop: top }} className="flex-1 bg-slate-900">
      <Text className="my-4 text-lg font-bold text-center text-white">
        Servicios
      </Text>
      <View className="flex-row flex-wrap items-center justify-center flex-1 m-2 my-2">
        <Card
          className="m-2 w-[45%] "
          onPress={() => navigation.navigate("HomeInteresSimple")}
        >
          <Card.Title title="Interes Simple" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen aqui</Text>
          </Card.Content>
        </Card>

        <Card
          className="m-2 w-[45%] "
          onPress={() => navigation.navigate("HomeInteresCompuesto")}
        >
          <Card.Title title="Interes Compuesto" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>

        <Card
          className="m-2 w-[45%] "
          onPress={() => navigation.navigate("HomeGradienteAritmeticoScreen")}
        >
          <Card.Title title="Gradiente Aritmetico" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>

        <Card className="m-2 w-[45%] "
        onPress={() => navigation.navigate("HomeGradienteGeometricoScreen")}
        >
        
          <Card.Title title="Gradiente Geometrico" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
        <Card
          className="m-2 w-[45%]"
          onPress={() => navigation.navigate("HomeAmortizacion")}
        >
          <Card.Title title="Amortización" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
        <Card
          className="m-2 w-[45%]"
          onPress={() => navigation.navigate("HomeAnualidades")}
        >
          <Card.Title title="Anualidades" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
        <Card
          className="m-2 w-[45%]"
          onPress={() => navigation.navigate("UnidadValorReal")}
        >
          <Card.Title title="Unidad Valor Real" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
        <Card
          className="m-2 w-[45%]"
          onPress={() => navigation.navigate("EvaluacionAlternativasInversion")}
        >
          <Card.Title title="Evaluación de Alternativas de Inversión" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
        <Card
          className="m-2 w-[45%]"
          onPress={() => navigation.navigate("Bonos")}
        >
          <Card.Title title="Bonos" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
        <Card
          className="m-2 w-[45%]"
          onPress={() => navigation.navigate("Inflacion")}
        >
          <Card.Title title="Inflación" />
          <Card.Content>
            <Text style={{ marginBottom: 10 }}>Imagen Aqui</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};
