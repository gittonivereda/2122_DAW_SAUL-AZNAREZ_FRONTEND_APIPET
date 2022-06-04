export class User{
    public nombre: string;
    public apellidos: string;
    public email: string;
    public edad: number;
    public ciudad: string;
    public password: string;
    public telefono: any;
    public imagen: any;

    constructor(nombre: string, apellidos: string, email: string, edad: number, ciudad: string, telefono: any, password: string, imagen: any){
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.edad = edad;
        this.ciudad = ciudad;
        this.password = password;
        this.telefono = telefono;
        this.imagen = imagen;
    }
}