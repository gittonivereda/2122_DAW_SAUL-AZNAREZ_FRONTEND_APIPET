export class Animal{
    public id: number;
    public nombre: string;
    public tipo: string;
    public raza: string;
    public edad: number;
    public provincia: string;
    public localidad: string;
    public tamanio: string;
    public descripcion: string;
    public userId: number;

    constructor(id: number, nombre: string, tipo: string, raza: string, edad: number, provincia: string, localidad: string, tamanio: string, descripcion: string, userId: number){
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.raza = raza;
        this.edad = edad;
        this.provincia = provincia;
        this.localidad = localidad;
        this.tamanio = tamanio;
        this.descripcion = descripcion;
        this.userId = userId;
    }
}