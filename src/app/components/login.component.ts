import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";

@Component({
    selector: "login",
    templateUrl: "../views/login.html",
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: any;
    public token: any;
    public identity: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = "Identificate";
        this.user = {
            "email": "",
            "password": "",
            "getHash": "true"
        };
    }

    ngOnInit() {
        console.log("Login cargado");
        this.logout();
        this.redirectIfIdentity();
    }

    redirectIfIdentity(){
        console.log("redirectIfIdentity");
        let identity = this._userService.getIdentity();
        
        if(identity != null && identity.sub){
            this._router.navigate(["/user"]);
        }
    }

    logout(){
        this._route.params.forEach((params: Params) => {
            let logout = +params["id"];

            if(logout == 1){
                localStorage.removeItem("identity");
                localStorage.removeItem("token");

                this.identity = null;
                this.token = null;

                this._router.navigate(["/"]);
            }
        }
        );
    }

    enviarDatos():any{
        
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response;

                if(this.identity.length <= 1){
                    console.log("Error en el servidor");
                }else{
                    if(!this.identity.status){
                        localStorage.setItem("identity", JSON.stringify(this.identity));

                        //Conseguir el token

                        this.user.getHash = null;
                        this._userService.signup(this.user).subscribe(
                            response => {
                                this.token = response;

                                if(this.identity.length <= 1){
                                    console.log("Error en el servidor");
                                }else{
                                    if(!this.identity.status){
                                        localStorage.setItem("token", JSON.stringify(this.token));
                                        //Redireccion a userIntereses
                                        this._router.navigate(["/userIntereses"]);
                                    }
                                }
                            },
                            error => {
                                console.log(<any>error);
                            }
                        );
                    }
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}
