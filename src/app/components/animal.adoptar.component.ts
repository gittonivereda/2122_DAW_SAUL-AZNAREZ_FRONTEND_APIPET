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
}