import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { Animal } from '../models/animal';

@Component({
    selector: "user",
    templateUrl: "../views/animalesUser.html",
    providers: [UserService, AnimalService]
})

export class AnimalesUserComponent implements OnInit {
    public title: string;
    public user: any;
    public token: any;
    public identity: any;
    public animales: Array<Animal> | undefined;
    public status: any;
    public pagesTotal: any;
    public pageNext: any;
    public pagePrev: any;
    public loading: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _animalService: AnimalService
    ) {
        this.title = "Tus animales";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = {
            "email": "",
            "password": "",
            "getHash": "true"
        };
    }

    ngOnInit() {
        console.log("Login cargado");
        this.redirectIfIdentity();
        this.getAnimalUser();
    }

    redirectIfIdentity(){
        let identity = this._userService.getIdentity();
        
        if(identity == null || !identity.sub || identity == null){
            this._router.navigate(["/login"]);
        }
    }

    getAnimalUser(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if(!page){
                page = 1;
            }

            this.loading = "show";

            this._animalService.animalesUsuario(this.token, page).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status == "success"){
                        this.animales = this.status.data;
                        this.loading = "hide";

                        //Total de paginas
                        this.pagesTotal = [];
                        for(let i = 0; i < this.status.total_pages; i++){
                            this.pagesTotal.push(i);
                        }

                        //Pagina anterios
                        if(page >= 2){
                            this.pagePrev = (page - 1);
                        }else{
                            this.pagePrev = page;
                        }

                        //Pagina siguiente
                        if(page < this.status.total_pages){
                            this.pageNext = (page + 1);
                        }else{
                            this.pageNext = page;
                        }
                    }
                }, error => {
                    console.log(<any>error);
                }
            );
        });
    }
}