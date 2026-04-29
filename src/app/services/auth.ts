import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private claveUsuarios = 'usuarios';
  private claveSesion = 'sesion';

  constructor() {}

  obtenerUsuarios(): any[] {
    const datos = localStorage.getItem(this.claveUsuarios);
    return datos ? JSON.parse(datos) : [];
  }

  guardarUsuarios(usuarios: any[]): void {
    localStorage.setItem(this.claveUsuarios, JSON.stringify(usuarios));
  }

  registrarUsuario(usuario: any): { exito: boolean; mensaje: string } {

    const usuarios = this.obtenerUsuarios();

    const existe = usuarios.find(u => u.email === usuario.email);

    if (existe) {
      return { exito: false, mensaje: 'El usuario ya está registrado' };
    }

    usuarios.push(usuario);
    this.guardarUsuarios(usuarios);

    return { exito: true, mensaje: 'Usuario registrado correctamente' };
  }

  iniciarSesion(email: string, contrasenna: string): { exito: boolean; campo?: string; mensaje: string } {
  const usuarios = this.obtenerUsuarios();

  const usuarioPorEmail = usuarios.find(u => u.email === email);
  const usuarioPorPassword = usuarios.find(u => u.password === contrasenna);

  if (!usuarioPorEmail && !usuarioPorPassword) {
    return { exito: false, campo: 'ambos', mensaje: '' };
  }

  if (!usuarioPorEmail) {
    return { exito: false, campo: 'email', mensaje: 'Este correo no está registrado' };
  }

  if (usuarioPorEmail.password !== contrasenna) {
    return { exito: false, campo: 'contrasenna', mensaje: 'Contraseña incorrecta' };
  }

  localStorage.setItem(this.claveSesion, JSON.stringify(usuarioPorEmail));
  return { exito: true, mensaje: 'Inicio de sesión exitoso' };
}

  // iniciarSesion(email: string, contrasenna: string): { exito: boolean; campo?: string; mensaje: string } {
  //   const usuarios = this.obtenerUsuarios();

  //   const usuarioPorEmail = usuarios.find(u => u.email === email);

  //   if (!usuarioPorEmail) {
  //     return { exito: false, campo: 'email', mensaje: 'Este correo no está registrado' };
  //   }

  //   if (usuarioPorEmail.password !== contrasenna) {
  //     return { exito: false, campo: 'contrasenna', mensaje: 'Contraseña incorrecta' };
  //   }

  //   localStorage.setItem(this.claveSesion, JSON.stringify(usuarioPorEmail));
  //   return { exito: true, mensaje: 'Inicio de sesión exitoso' };
  // }


  // iniciarSesion(email: string, contrasenna: string): { exito: boolean; mensaje: string } {

  //   const usuarios = this.obtenerUsuarios();

  //   const usuario = usuarios.find(
  //     u => u.email === email && u.password === contrasenna
  //   );

  //   if (!usuario) {
  //     return { exito: false, mensaje: 'Correo o contraseña incorrectos' };
  //   }

  //   localStorage.setItem(this.claveSesion, JSON.stringify(usuario));

  //   return { exito: true, mensaje: 'Inicio de sesión exitoso' };
  // }

  obtenerSesion(): any {
    const datos = localStorage.getItem(this.claveSesion);
    return datos ? JSON.parse(datos) : null;
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.claveSesion);
  }

  estaAutenticado(): boolean {
    return this.obtenerSesion() !== null;
  }
}