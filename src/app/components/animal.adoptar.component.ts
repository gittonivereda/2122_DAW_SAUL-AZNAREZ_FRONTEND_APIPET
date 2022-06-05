import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { Animal } from '../models/animal';

@Component({
    selector: "animal-adoptar",
    templateUrl: "../views/animal.adoptar.html",
    providers: [UserService, AnimalService]
})

export class AnimalAdoptarComponent implements OnInit {
    public title: string;
    public animal: any;
    public token: any;
    public identity: any;
    public status: any;
    public loading: any;
    public animalesFavoritos: Array<any> = [];
    public favoritoONo: boolean = false;
    public mensaje: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _animalService: AnimalService
    ) {
        this.title = "¡Adoptame!";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        
    }

    ngOnInit() {
        console.log("Adoptar cargado");
        this.redirectIfIdentity();
        this.getAnimal();
    }

    redirectIfIdentity(){
        let identity = this._userService.getIdentity();
        
        if(identity == null || !identity.sub || identity == null){
            this._router.navigate(["/login"]);
        }
    }

    getAnimal(){
        let page: number | null = null
        this.loading = "show";
        this._route.params.forEach((params: Params) => {
            let id = params["id"];

            this._animalService.mostrarAnimal(this.token, id).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status == "success"){
                        this.loading = "hide";
                        this.animal = this.status.animal;
                        this.status = "success";

                        this._animalService.getFavoritos(this.token, this.identity.email, page).subscribe(
                            response => {
                                this.status = response;
                                if(this.status.status == "success"){
                                    this.animalesFavoritos = this.status.data;

                                    if(this.animalesFavoritos.length <= 0){
                                        this.favoritoONo = false;
                                    }else{
                                        for(let i = 0; i < this.animalesFavoritos.length; i++){
                                            if(this.animal.id == this.animalesFavoritos[i].id){
                                                this.favoritoONo = true;
                                            }
                                        }
                                    }
                                    this.loading = "hide";
                                }
                            }, error => {
                                console.log(<any>error);
                            }
                        );


                    }else{
                        this.status = "error";
                    }
                    this.loading = "hide";
                },
                error => {
                    this.status = "error";
                    this.loading = "hide";
                    console.log(<any>error);
                }
            );
        });
    }
    
    favorito(){

            this._userService.newFavoritos(this.identity.email, this.animal.id).subscribe(
                response => {
                    this.status = response;
                    window.location.reload();
                    if(this.status.msg == "El animal ya esta en favoritos"){
                        
                        this.status = "El animal ya esta en favoritos";
                        
                    }
                    if(this.status == "error"){
                        this.status = "success";
                    }
                },
                error => {
                    this.status = "error";
                    console.log(<any>error);
                }
            );
    }

    eliminarFavorito(){
        this._userService.eliminarFavorito(this.identity.email, this.animal.id).subscribe(
            response => {
                this.status = response;
                if(this.status.msg == "Animal eliminado de favoritos"){
                    this.status = "Animal eliminado de favoritos";
                    window.location.reload();
                }if(this.status == "error"){
                    this.status = "success";
                }
            },
            error => {
                this.status = "error";
                console.log(<any>error);
            }
        );
    }

    adoptar(){
        this._animalService.adoptar(this.token, this.animal.id, this.identity.email).subscribe(
            response => {
                this.status = response;
                
                    this.mensaje = response;
                
            },
            error => {
                this.status = "error";
                console.log(<any>error);
            }
        );
    }
}