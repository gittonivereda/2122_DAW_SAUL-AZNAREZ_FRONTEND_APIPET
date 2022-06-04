import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { Animal } from '../models/animal';

@Component({
    selector: "animal-detail",
    templateUrl: "../views/animal.detail.html",
    providers: [UserService, AnimalService]
})

export class AnimalDetailComponent implements OnInit {
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
        this.title = "Animal";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        
    }

    ngOnInit() {
        console.log("Login cargado");
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
}