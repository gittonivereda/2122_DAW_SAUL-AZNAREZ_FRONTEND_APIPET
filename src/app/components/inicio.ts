import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'inicio',
    templateUrl: "../views/inicio.html"
})
export class InicioComponent implements OnInit {
    public title: string;

    constructor(
        // private _route: ActivatedRoute,
        // private _router: Router
    ) {
        this.title = "Inicio";
    }

    ngOnInit() {
        console.log("inicio.component cargado");
        //extraer parametros de la url

    }


}
