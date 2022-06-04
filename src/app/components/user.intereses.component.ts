import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { Animal } from '../models/animal';

@Component({
    selector: "user",
    templateUrl: "../views/user.intereses.html",
    providers: [UserService, AnimalService]
})

export class UserInteresesComponent implements OnInit {
    public title: string;
    public token: any;
    public identity: any;
    public animales: Array<Animal> = [];
    public status: any;
    public pagesTotal: any;
    public pageNext: any;
    public pagePrev: any;
    public loading: any;
    public tipo: any;
    public provincia: any;
    public searchString: string = "";
    public allAnimals: any;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _animalService: AnimalService
    ) {
        this.title = "user";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        console.log("Login cargado");
        this.redirectIfIdentity();

    }

    redirectIfIdentity() {
        let identity = this._userService.getIdentity();

        if (identity == null || !identity.sub || identity == null) {
            this._router.navigate(["/login"]);
        }
    }
}