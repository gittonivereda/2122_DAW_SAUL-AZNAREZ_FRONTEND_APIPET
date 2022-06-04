import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";

@Component({
    selector: "user",
    templateUrl: "../views/user.intereses.html",
    providers: [UserService, AnimalService]
})

export class UserInteresesMenuComponent implements OnInit {
    public title: string;
    public token: any;
    public identity: any;
    public status: any;
    public loading: any;
    public tipo: any;
    public provincia: any;



    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _animalService: AnimalService
    ) {
        this.title = "Mis intereses";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        console.log("Intereses cargado");
        this.redirectIfIdentity();

    }

    eliminarIntereses() {
        this.loading = "show";
        this._userService.eliminarIntereses(this.identity.email).subscribe(
            response => {
                this.status = response;
                if (this.status != "success") {
                    if(this.status.msg == 'No hay intereses'){
                        this.status = "No tienes intereses";
                    }else{
                        this.status = "error";
                    }
                } else {
                    this.status = "Intereses eliminados";
                    this.loading = "hide";
                }
            },
            error => {
                this.status = "error";
                console.log(<any>error);
            }
        );
    }

    redirectIfIdentity() {
        let identity = this._userService.getIdentity();

        if (identity == null || !identity.sub || identity == null) {
            this._router.navigate(["/login"]);
        }
    }

    enviarIntereses() {
        this.loading = "show";
        if(this.tipo == "" && this.provincia == "" || this.tipo == null && this.provincia == null){
            this.status = "error, elige un tipo o una provincia";
            console.log(this.status);
            this.loading = "hide";
        }else{
            this._userService.newIntereses(this.tipo, this.provincia).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status == "success"){
                        this.status = "Intereses actualizados";
                        this.loading = "hide";
                        //Redireccion a user
                        this._router.navigate(["/user"]);
                    }
                        this.loading = "hide";
                    
                },
                error => {
                    this.status = "error";
                    this.loading = "hide";
                    console.log(<any>error);
                }
            );
        }
    }
}