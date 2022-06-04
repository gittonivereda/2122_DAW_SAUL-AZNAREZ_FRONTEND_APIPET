import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { User } from "../models/user";
import { Animal } from "../models/animal";

@Component({
    selector: "animal-edit",
    templateUrl: "../views/animal.new.html",
    providers: [UserService, AnimalService]
})

export class AnimalEditComponent implements OnInit {
    public title: string;
    public user: any;
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
        this.title = "Editar animal";
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    ngOnInit() {
        let identity = this._userService.getIdentity();
        
        if(identity == null || !identity.sub || identity == null){
            this._router.navigate(["/login"]);
        }else{
            this.getAnimal();
        }
    }

    getAnimal(){
        this.loading = "show";
        this._route.params.forEach((params: Params) => {
            let id = params["id"];

            this._animalService.getAnimal(this.token, id).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status == "success"){
                        this.loading = "hide";
                        this.animal = this.status.animal;
                        if(this.animal.userId != this.identity.sub){
                            this._router.navigate(["/user"]);
                        }else{
                            this.status = "success";
                        }
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

    enviarDatos(){
        this.loading = "show";
        this._route.params.forEach((params: Params) => {
            let id = params["id"];
            this._animalService.editAnimal(this.token, this.animal, id).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status != "error"){
                        this.status = "success";
                        this.loading = "hide";
                        this._router.navigate(["/animalesUser"]);
                    }else{
                        this.status = "error";
                        this.loading = "hide";
                        this.animal = new Animal(0,"","", "", 0, "", "", "", "",0);
                    }
                }
            );
        });
    }
}