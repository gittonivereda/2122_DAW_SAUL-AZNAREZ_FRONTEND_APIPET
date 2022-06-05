import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { User } from "../models/user";
//import { Response } from '@angular/http';

@Component({
    selector: "user-edit",
    templateUrl: "../views/user.edit.html",
    providers: [UserService]
})

export class UserEditComponent implements OnInit {
    public title: string;
    public user: User;
    public status: any;
    public token: any;
    public identity: any;
    public imagen: any;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.title = "Modificar datos";
        this.user = new User("", "", "", 0, "", "", "","");
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    ngOnInit() {
        let identity = this._userService.getIdentity();
        
        if(identity == null || !identity.sub || identity == null){
            this._router.navigate(["/login"]);
        }else{
            this.user = new User(this.identity.name, this.identity.surname, this.identity.email, this.identity.user.edad, this.identity.user.ciudad, this.identity.user.telefono, this.identity.user.password,"");
            this.obtenerDatos()
        }
    }

    enviarDatos(){

        if((<HTMLInputElement>document.getElementById("password1")).value == "" && (<HTMLInputElement>document.getElementById("password")).value == ""){
            this._userService.update(this.user).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status != "error"){
                        this.status = "success";
                        
                        this._userService.getUser(this.user.email).subscribe(
                            response => {
                                this.status = response;
                                if(this.status.status != "error"){
                                    this.status = "success";
                                    
                                    //Modificamos el localStorage para que se actualicen los nuevos datos
                                    this.identity = this.status.data;
                                    
                                }else{
                                    this.status = "error";
                                    this.user = new User("", "", "", 0, "", "", "","");
                                }
                            },
                            error => {
                                console.log(<any>error);
                            }
                        );
                    }else{
                        this.status = "error";
                        this.user = new User("", "", "", 0, "", "", "","");
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        }else{
            //Comparamos las contraseñas para verificar que sean iguales
            if(this.user.password != (<HTMLInputElement>document.getElementById("password1")).value){
                this.status = "error password";
            }else{
                this._userService.update(this.user).subscribe(
                    response => {
                        this.status = response;
                        if(this.status.status != "error"){
                            this.status = "success";
                            if(this.status.status != "error"){
                            this.status = "success";
                            
                            this._userService.getUser(this.user.email).subscribe(
                                response => {
                                    this.status = response;
                                    if(this.status.status != "error"){
                                        this.status = "success";
                                        
                                        //Modificamos el localStorage para que se actualicen los nuevos datos
                                        this.identity = this.status.data;
                                      
                                    }else{
                                        this.status = "error";
                                        this.user = new User("", "", "", 0, "", "", "","");
                                    }
                                },
                                error => {
                                    console.log(<any>error);
                                }
                            );
                        }else{
                            this.status = "error";
                            this.user = new User("", "", "", 0, "", "", "","");
                        }
                        }else{
                            this.status = "error";
                            this.user = new User("", "", "", 0, "", "", "","");
                        }
                    },
                    error => {
                        console.log(<any>error);
                    }
                );
            }
        }
    }

    // obtenerDatos(){
    //     this._userService.getUser(this.user.email).subscribe(
    //         response => {
    //             this.status = response;
    //             if(this.status.status != "error"){
    //                 this.imagen = this.status.data.imagen;
    //                 this.imagen = this.user.imagen;
    //                 this.imagen = this.imagen.replace(/^data:image\/[a-z]+;base64,/, "");
    //                 this.imagen = this.imagen.replace(/\+/g, '-');

    //                 console.log("hiashas"+this.imagen);
    //                 console.log("ttttttttttttttttt"+this.status.data.imagen);
    //                 console.log("bbbbbbbbbbbbbbbbb"+this.user.imagen);

    //             }else{
    //                 this.status = "error";
    //             }
    //         },
    //         error => {
    //             console.log(<any>error);
    //         }
    //     );
    // }

    obtenerDatos(){
        //obtenemos el usuario
        this._userService.getUser(this.user.email).subscribe(
            //obtenemos la imagen del usuario
            response => {
                this.status = response;
                if(this.status.status != "error"){
                  //convertimos la imagen a base64 para mostrarla en el html
                    // this.imagen = this.status.data.imagen;
                    // this.imagen = this.imagen.replace(/^data:image\/[a-z]+;base64,/, "");
                    // this.imagen = this.imagen.replace(/\+/g, '-');
                    this.user.imagen = this.status.data.imagen;
                    console.log("imagen"+this.user.imagen);
                }else{
                    this.status = "error";
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}