import { createStackNavigator } from "@react-navigation/stack";

import { BotonTabsNavigator } from "./BotonTabsNavigator";
import { PerfilScreen } from "../screens/auth/PerfilScreen";
import { HomeInteresSimpleScreen } from "../screens/services/Interes/simple/HomeInteresSimpleScreen";
import { ValorFuturo } from "../screens/services/Interes/simple/ValorFuturo";
import { TasaInteresScreen } from "../screens/services/Interes/simple/TasaInteres";
import { TiempoScreen } from "../screens/services/Interes/simple/Tiempo";
import { HomeInteresCompuestoScreen } from "../screens/services/Interes/InteresCompuesto/HomeInteresCompuesto";
import { MontoFuturoScreen } from "../screens/services/Interes/InteresCompuesto/MontoFinal";
import { TasaInteresCompuestoScreen } from "../screens/services/Interes/InteresCompuesto/TasaInteres";
import { TiempoInteresCompuestoScreen } from "../screens/services/Interes/InteresCompuesto/Tiempo";
import { HomeGradienteGeometricoScreen } from "../screens/services/gradientes/HomeGradienteGeometricoScreen";
import { HomeGradienteScreen } from "../screens/services/gradientes/HomeGradientesScreen";
import ValorPresenteAritmetico from "../screens/services/gradientes/GradienteAritmetico";
import HomeAmortizacion from "../screens/services/amortizacion/HomeAmortizacion";
import HomeAnualidades from "../screens/services/anualidad/HomeAnualidad";
import AnualidadVencida from "../screens/services/anualidad/AnualidadVencida";
import AnualidadVencidaSemestre from "../screens/services/anualidad/AnualidadSemestres";
import AnualidadVencidaCapitalNecesario from "../screens/services/anualidad/AnualidadVencidaCapitalNecesario";
import AnualidadVencidaImportePagado from "../screens/services/anualidad/AnualidadVencidaImportePagado";
import ValorPresentePrestamo from "../screens/services/anualidad/AnualidadValorPresente";
import AnualidadVencidaCapitalizacion from "../screens/services/anualidad/AnualidadVencidaCapitalizacion";
import UnidadValorReal from "../screens/services/unidadvalorreal/UnidadValorReal";
import EvaluacionInversion from "../screens/services/evaluacioninversion/EvaluacionAlternativasInversion";
import CalculoBonos from "../screens/services/bonos/Bonos";
import CalculoInflacion from "../screens/services/inflacion/Inflacion";
import { LoanScreen } from "../screens/loans/LoanScreen";
import { AdminLoadsScreen } from "../screens/loans/AdminLoadsScreen";
import { StatusPrestamoScreen } from "../screens/loans/StatusPrestamo";
import GradienteGeometrico from "../screens/services/gradientes/GradienteGeometrico";

export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ConfirmAccountView: undefined;
  RequesCodeView: undefined;
  ForgotPasswordView: undefined;
  NewPasswordView: undefined;
  TabNavigator: undefined;
  PerfilScreen: undefined;
  HomeInteresSimple: undefined;
  // Interes Simple
  ValorFuturo: undefined;
  TasaInteresScreen: undefined;
  TiempoScreen: undefined;
  // Interes Compuesto
  HomeInteresCompuesto: undefined;
  MontoFuturoCompuesto: undefined;
  TasaInteresCompuesto: undefined;
  TiempoCompuestoScreen: undefined;
  // Gradiente aritmetico
  HomeGradienteAritmeticoScreen: undefined;
  HomeGradienteGeometricoScreen: undefined;
  GradienteValorPresente: undefined;
  GradienteGeometrico: undefined;
  // Amortizacion
  HomeAmortizacion: undefined;
  // Anualidades
  HomeAnualidades: undefined;
  AnualidadVencida: undefined;
  AnualidadSemestres: undefined;
  AnualidadVencidaCapitalNecesario: undefined;
  AnualidadVencidaImportePagado: undefined;
  ValorPresentePrestamo: undefined;
  AnualidadVencidaCapitalizacion: undefined;
  // Unidad Valor Real
  UnidadValorReal: undefined;
  // Evaluacion alternativas de inversion
  EvaluacionAlternativasInversion: undefined;
  // Bonos
  Bonos: undefined;
  // Inflacion
  Inflacion: undefined;
  // Prestamo
  LoanScreen: undefined;
  AdminLoads: undefined;
  StatusPrestamoScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TabNavigator"
        component={BotonTabsNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PerfilScreen"
        component={PerfilScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeInteresSimple"
        component={HomeInteresSimpleScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ValorFuturo"
        component={ValorFuturo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TasaInteresScreen"
        component={TasaInteresScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TiempoScreen"
        component={TiempoScreen}
      />
      {/* Interes Compuesto */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeInteresCompuesto"
        component={HomeInteresCompuestoScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MontoFuturoCompuesto"
        component={MontoFuturoScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TasaInteresCompuesto"
        component={TasaInteresCompuestoScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TiempoCompuestoScreen"
        component={TiempoInteresCompuestoScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeGradienteAritmeticoScreen"
        component={HomeGradienteScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeGradienteGeometricoScreen"
        component={HomeGradienteGeometricoScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GradienteValorPresente"
        component={ValorPresenteAritmetico}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GradienteGeometrico"
        component={GradienteGeometrico}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeAmortizacion"
        component={HomeAmortizacion}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeAnualidades"
        component={HomeAnualidades}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnualidadVencida"
        component={AnualidadVencida}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnualidadSemestres"
        component={AnualidadVencidaSemestre}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnualidadVencidaCapitalNecesario"
        component={AnualidadVencidaCapitalNecesario}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnualidadVencidaImportePagado"
        component={AnualidadVencidaImportePagado}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ValorPresentePrestamo"
        component={ValorPresentePrestamo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AnualidadVencidaCapitalizacion"
        component={AnualidadVencidaCapitalizacion}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UnidadValorReal"
        component={UnidadValorReal}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EvaluacionAlternativasInversion"
        component={EvaluacionInversion}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Bonos"
        component={CalculoBonos}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Inflacion"
        component={CalculoInflacion}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoanScreen"
        component={LoanScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdminLoads"
        component={AdminLoadsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="StatusPrestamoScreen"
        component={StatusPrestamoScreen}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
