import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

//import { Observable } from "rxjs/Observable";
import "rxjs/package.json";
import {map} from 'rxjs/operators';
import { GLOBAL } from './global';
//import { Response } from '@angular/http';

@Injectable()
export class UserService {

    public url: string;
    public identity: any;
    public token: any;

    constructor(public http: HttpClient) {
        this.url = GLOBAL.url;
    }

    signup(user_to_login: any, gethash = null) {
        let json = JSON.stringify(user_to_login);
        let params = "json=" + json + "&gethash=" + gethash;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/login', params, {headers: headers})
            .pipe(map(res => res));
    }

    getIdentity() {
        let identity = localStorage.getItem("identity");

        if (identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        // Convertimos el string a un objeto JSON
        this.identity = JSON.parse(this.identity);
        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem("token")?.replace(/['"]+/g, '');

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    register(user_to_register: any, gethash = null) {
        let json = JSON.stringify(user_to_register);
        let params = "json=" + json + "&gethash=" + gethash;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
console.log(params);
        return this.http.post(this.url + '/user/new', params, {headers: headers})
            .pipe(map(res => res));
    }

    update(user_to_update: any) {
        let json = JSON.stringify(user_to_update);
        let params = "json=" + json + "&authorization=" + this.getToken();
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/user/edit', params, {headers: headers})
            .pipe(map(res => res));
    }

    //Motramos los datos del usuario y su imagen
    getUser(email:any) {
        let params = "authorization=" + this.getToken();
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/user/get/' + email, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Obtenemos los intereses del usuario
    getIntereses(email:any) {
        let params = "authorization=" + this.getToken();
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/user/getIntereses/' + email, params, {headers: headers})
            .pipe(map(res => res));
    }

    //Añadir los intereses del usuario
    newIntereses(tipo:any, provincia:any) {
        let json = JSON.stringify({tipo:tipo, provincia:provincia});
        let params = "json=" + json + "&authorization=" + this.getToken();

        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/user/newIntereses', params, {headers: headers})
            .pipe(map(res => res));
    }
    eliminarIntereses(emailUser:any){
        let params = "authorization=" + this.getToken();
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this.http.post(this.url + '/user/eliminarIntereses/' + emailUser, params, {headers: headers})
            .pipe(map(res => res));
    }
}