import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { UserService } from "../services/user.services";

//import { Observable } from "rxjs/Observable";
import "rxjs/package.json";
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';
//import { Response } from '@angular/http';
import { Params } from '@angular/router';

@Injectable()
export class AnimalService {

    public url: string;
    public identity: any;
    public token: any;

    constructor(public http: HttpClient) {
        this.url = GLOBAL.url;
    }

    create(token:any, animal:any, imagenes:any) {
        let json = JSON.stringify(animal);
        let params = "json=" + json + "&authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/animal/new/' + imagenes, params, {headers: headers})
            .pipe(map(res => res));
    }

    animalesUsuario(token:any, page:any) {
        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        if(page == null){
            page = 1;
        }

        return this.http.post(this.url + '/animal/listaUsuario?page=' + page, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Motramos un animal del usuario
    getAnimal(token:any, id:any) {
        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/animal/animal/' + id, params, {headers: headers})
            .pipe(map(res => res));
    }

    editAnimal(token:any, animal:any, id:any) {
        let json = JSON.stringify(animal);
        let params = "json=" + json + "&authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/animal/edit/' + id, params, {headers: headers})
            .pipe(map(res => res));
    }

    getAnimales(token:any, page:any) {
        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        if(page == null){
            page = 1;
        }

        return this.http.post(this.url + '/animal/buscar?page=' + page, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Motramos un animal
    mostrarAnimal(token:any, id:any) {
        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/animal/getAnimal/' + id, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Motramos todos los animales y obtenemos los tipos, razas y provincias sin duplicados
    // todosAnimales(token:any) {
    //     let params = "authorization=" + token;
    //     let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

    //     return this.http.post(this.url + '/animal/todosAnimales', params, {headers: headers})
    //         .pipe(map(res => res));
    // }

    // buscador por filtro de tipo, provinci y nombre
    searchAnimal(token:any, tipo:any, provincia:any, nombre:any, page:any) {
        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/animal/search/' + tipo +  '/' + provincia + '/' + nombre + '/' + page, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Obtenemos los animales favoritos del usuario
    getFavoritos(token:any, email:any, page:any) {

        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        if(page == null){
            page = 1;
        }

        return this.http.post(this.url + '/user/getFavoritos/' + email +  '?page=' + page, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Enviamos los datos para adoptar del animal y el usuario
    adoptar(token:any, animalId:any, email:any){
        let params = "authorization=" + token;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/user/adoptar/' + animalId +  "/" + email, params, {headers: headers})
            .pipe(map(res => res));
    }
}