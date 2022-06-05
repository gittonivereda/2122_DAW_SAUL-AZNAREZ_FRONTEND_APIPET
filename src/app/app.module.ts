import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { InicioComponent } from './components/inicio';
import { UserEditComponent } from './components/user.edit.component';
import { AnimalNewComponent } from './components/animal.new.component';
import { AnimalesUserComponent } from './components/animalesUser.component';
import { AnimalDetailComponent } from './components/animal.detail.component';
import { AnimalEditComponent } from './components/animal.edit.component';
import { UserComponent } from './components/user.component';
import { AnimalAdoptarComponent } from './components/animal.adoptar.component';
import {UserInteresesComponent} from './components/user.intereses.component';
import {UserInteresesMenuComponent} from './components/user.interesesMenu.component';
import { UserFavoritosComponent } from './components/userFavoritos.component';

//import { routing, appRoutingProviders } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    UserEditComponent,
    AnimalNewComponent,
    AnimalesUserComponent,
    AnimalDetailComponent,
    AnimalEditComponent,
    UserComponent,
    AnimalAdoptarComponent,
    UserInteresesComponent,
    UserInteresesMenuComponent,
    UserFavoritosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
//    routing
  ],
  providers: [ 
  //  appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
