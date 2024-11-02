export interface User {
  cedula: string;
  email: string;
  fechaExpedicion: string;
  fechaNacimiento: string;
  genero: "M" | "F";
  id: string;
  name: string;
  password: string;
  telefono: string;
  saldo: number;
  role: string;
}

export interface UserLogin {
  cedula: string;
  password: string;
}

export interface UserRegister {
  name: string;
  cedula: string;
  email: string;
  telefono: string;
  fechaExpedicion: string;
  fechaNacimiento: string;
  genero: string;
  password: string;
  saldo: number;
  role: "user" | "admin";
}

export interface ConfirmToken {
  token: string;
}
export interface RequestCodeConfirmation {
  email: string;
}

export interface ForgotPasswordForm {
  email: string;
  newPassword: string;
}
export interface NewPasswordForm {
  password: string;
  password_confirmation: string;
}
export interface UserProfileForm {
  name: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  fechaExpedicion: string;
  genero: string;
  confirmed: boolean;
}
