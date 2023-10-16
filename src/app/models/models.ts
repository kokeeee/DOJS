export interface UserI{
    username: string,
    correo: string,
    telefono: string,
    uid: string,
    password: string,
    perfil: 'Usuario' | 'Admin'
}
export interface JuegosI{
    id: string;
    nombre: string,
    precio: number,
    descripcion: string,
    plataforma: string,
}