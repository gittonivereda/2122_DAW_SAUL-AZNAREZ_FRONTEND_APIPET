import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { AnimalService } from "../services/animal.services";
import { Animal } from '../models/animal';

@Component({
    selector: "user",
    templateUrl: "../views/user.html",
    providers: [UserService, AnimalService]
})

export class UserComponent implements OnInit {
    public title: string;
    public token: any;
    public identity: any;
    public animales: Array<any> = [];
    public imagenes: Array<any> = [];
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
        this.getAnimales();
        this.Intereses()
        //this.todosAnimales()
    }

    redirectIfIdentity() {
        let identity = this._userService.getIdentity();

        if (identity == null || !identity.sub || identity == null) {
            this._router.navigate(["/login"]);
        }
    }

    getAnimales() {
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if (!page) {
                page = 1;
            }

            this.loading = "show";

            this._animalService.getAnimales(this.token, page).subscribe(
                response => {
                    this.status = response;
                    console.log(this.status);
                    if (this.status.status == "success") {
                        this.animales = this.status.data;
                        this.loading = "hide";

                        //Total de paginas
                        this.pagesTotal = [];
                        for (let i = 0; i < this.status.total_pages; i++) {
                            this.pagesTotal.push(i);
                        }

                        //Pagina anterios
                        if (page >= 2) {
                            this.pagePrev = (page - 1);
                        } else {
                            this.pagePrev = page;
                        }

                        //Pagina siguiente
                        if (page < this.status.total_pages) {
                            this.pageNext = (page + 1);
                        } else {
                            this.pageNext = page;
                        }
                    }
                }, error => {
                    console.log(<any>error);
                }
            );
        });
    }

    search(tipo = "", provincia = "") {

        if (this.searchString == "" || this.searchString == null || this.searchString == undefined) {
            this.searchString = "vacio";
        }

        if (this.tipo == "" || this.tipo == null || this.tipo == undefined) {
            this.tipo = "vacio";
        }

        if (this.provincia == "" || this.provincia == null || this.provincia == undefined) {
            this.provincia = "vacio";
        }

        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if (!page) {
                page = 1;
            }
        
            this.loading = "show";

            this._animalService.searchAnimal(this.token, this.tipo, this.provincia, this.searchString, page).subscribe(
            response => {
                this.status = response;
                console.log(this.status);
                if (this.status.status == "success") {
                    this.animales = this.status.data;
                        this.loading = "hide";

                        //Total de paginas
                        this.pagesTotal = [];
                        for (let i = 0; i < this.status.total_pages; i++) {
                            this.pagesTotal.push(i);
                        }

                        //Pagina anterios
                        if (page >= 2) {
                            this.pagePrev = (page - 1);
                        } else {
                            this.pagePrev = page;
                        }

                        //Pagina siguiente
                        if (page < this.status.total_pages) {
                            this.pageNext = (page + 1);
                        } else {
                            this.pageNext = page;
                        }
                }else if(this.status.msg == "No hay animales"){
                    this.loading = "hide";
                    this.status = "No hay animales";
                }else{
                    this.loading = "hide";
                    this.status = "error";
                }
            }, error => {
                console.log(<any>error);
            }
            );
        });
    }

    Intereses() {
        this.loading = "show";

            this._userService.getIntereses(this.identity.email).subscribe(
                response => {
                    this.status = response;
                    if(this.status.status == "success"){
                        this.tipo = this.status.data.tipo;
                        this.provincia = this.status.data.provincia;
                        this.search(this.tipo, this.provincia);
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