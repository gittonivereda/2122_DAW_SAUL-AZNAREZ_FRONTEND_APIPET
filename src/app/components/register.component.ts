import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../services/user.services";
import { User } from "../models/user";
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: "register",
    templateUrl: "../views/register.html",
    providers: [UserService]
})

export class RegisterComponent implements OnInit {
    public title: string;
    public user: User;
    public status: any;
    public archivos: any = [];

    public file: any;
    public imageChangedEvent: any = '';
    public croppedImage: any = '';
    public nombreFoto: string = "";

    constructor(
        private _userService: UserService
        
    ) {
        this.title = "Registrate";
        this.user = new User("", "", "", 0, "", "", "", "");
    }

    ngOnInit() {
        console.log("registro.component cargado");
    }
//Enviamos los datos del usuario al servidor
    enviarDatos():any{
        //obtenemos el fichero
        this.user.imagen = this.nombreFoto;

        //Calculamos la edad del usuario
        const convertAge = new Date(this.user.edad);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.user.edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

        //Comparamos las contraseñas para verificar que sean iguales
        if(this.user.password != (<HTMLInputElement>document.getElementById("password1")).value){
            this.status = "error password";
            this.user = new User("", "", "", 0, "", "", "","");
        }else{
            if(this.user.edad < 18){
                this.status = "error edad";
                this.user = new User("", "", "", 0, "", "", "","");
            }else{
                this._userService.register(this.user).subscribe(
                    response => {
                        this.status = response;
                            if(this.status.status != "error"){
                                this.status = "success";
                                this.user = new User("", "", "", 0, "", "", "", "");
                            }else{
                                this.status = "error";
                                this.user = new User("", "", "", 0, "", "", "","");
                            }
                    }
                );
            }
        }
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.nombreFoto = event.target.files[0].name;
    }


    onFileChange(event: any) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.file = file;
          console.log(file);
        }
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        //Usage example:
        var file = this.dataURLtoFile(this.croppedImage, this.nombreFoto);
        console.log(file);
        this.file = file;
    }

    dataURLtoFile(dataurl: any, filename: any) {
 
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
              
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
;
        console.log(new File([u8arr], filename, {type:mime}));
          
        return new File([u8arr], filename, {type:mime});
    }

    imageLoaded() {
    // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
        console.log('fffff')
    }

    save() {
        console.log(this.file);
        // Aqui tienes que enviar el fichero ya a la API
        
    }

    
}
