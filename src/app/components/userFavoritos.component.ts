import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { Animal } from '../models/animal';

@Component({
    selector: "userFavoritos",
    templateUrl: "../views/userFavoritos.html",
    providers: [UserService, AnimalService]
})

export class UserFavoritosComponent implements OnInit {
    public title: string;
    public animal: any;
    public token: any;
    public identity: any;
    public status: any;
    public loading: any;
    public animales: Array<any> | undefined;
    public pagesTotal: any;
    public pageNext: any;
    public pagePrev: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _animalService: AnimalService
    ) {
        this.title = "Tus favoritos";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        console.log("Favoritos cargado");
        this.redirectIfIdentity();
        this.getFavoritos();
    }

    redirectIfIdentity(){
        let identity = this._userService.getIdentity();
        
        if(identity == null || !identity.sub || identity == null){
            this._router.navigate(["/login"]);
        }
    }

    getFavoritos(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if(!page){
                page = 1;
            }

            this.loading = "show";

            this._animalService.getFavoritos(this.token, this.identity.email, page).subscribe(
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
    
    favorito(){
            this._userService.newFavoritos(this.identity.email, this.animal.id).subscribe(
                response => {
                    this.status = response;
                    if(this.status.msg == "El animal ya esta en favoritos"){
                        this.status = "El animal ya esta en favoritos";
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
}