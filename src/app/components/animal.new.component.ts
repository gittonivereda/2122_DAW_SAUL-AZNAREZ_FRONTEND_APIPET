import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { User } from "../models/user";
import { Animal } from "../models/animal";

@Component({
    selector: "animal-new",
    templateUrl: "../views/animal.new.html",
    providers: [UserService, AnimalService]
})

export class AnimalNewComponent implements OnInit {
    public title: string;
    public user: any;
    public animal: any;
    public token: any;
    public identity: any;
    public status: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _animalService: AnimalService
    ) {
        this.title = "Dar en adopción";
        this.user = new User("", "", "", 0, "", "", "","");
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    ngOnInit() {
        let identity = this._userService.getIdentity();
        if(identity == null || !identity.sub || identity == null){
            this._router.navigate(["/login"]);
        }else{
            this.animal = new Animal(0,"","", "", 0, "", "", "", "",0);
            this.user = new User(this.identity.name, this.identity.surname, this.identity.email, this.identity.user.edad, this.identity.user.ciudad, this.identity.user.telefono, this.identity.user.password, "");
        }
    }

    enviarDatos(){
        this._animalService.create(this.token, this.animal).subscribe(
            response => {
                this.status = response;
                if(this.status.status != "error"){
                    this.status = "success";
                    this._router.navigate(["/animalesUser"]);
                }else{
                    this.status = "error";
                    this.animal = new Animal(0,"","", "", 0, "", "", "", "",0);
                }
            }
        );
    }
}