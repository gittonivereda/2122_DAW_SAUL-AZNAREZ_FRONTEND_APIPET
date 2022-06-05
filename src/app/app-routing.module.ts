import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { InicioComponent } from './components/inicio';
import { UserComponent } from './components/user.component';
import { UserEditComponent } from './components/user.edit.component';
import { AnimalNewComponent } from './components/animal.new.component';

import { ModuleWithProviders } from '@angular/core';
import { AnimalesUserComponent } from './components/animalesUser.component';
import { AnimalDetailComponent } from './components/animal.detail.component';
import { AnimalEditComponent } from './components/animal.edit.component';
import { AnimalAdoptarComponent } from './components/animal.adoptar.component';
import { UserInteresesComponent } from './components/user.intereses.component';
import { UserInteresesMenuComponent } from './components/user.interesesMenu.component';
import { UserFavoritosComponent } from './components/userFavoritos.component';

const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:id', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user/index', component: UserComponent },
    { path: 'user/index/:page', component: UserComponent },
    { path: 'user', component: UserComponent },
    { path: 'user-edit', component: UserEditComponent },
    { path: 'animal-new', component: AnimalNewComponent },
    { path: 'animalesUser/animal-detail/:id/animal-edit/:id', component: AnimalEditComponent },
    { path: 'animalesUser/index', component: AnimalesUserComponent },
    { path: 'animalesUser/index/:page', component: AnimalesUserComponent },
    { path: 'animalesUser', component: AnimalesUserComponent },
    { path: 'animalesUser/animal-detail/:id', component: AnimalDetailComponent },
    { path: 'animalesUser/index/:page/animal-detail/:id', component: AnimalDetailComponent },
    { path: 'animalesUser/index/:page/animal-detail/:id/animal-edit/:id', component: AnimalEditComponent },
    { path: 'user/animal-adoptar/:id', component: AnimalAdoptarComponent },
    { path: 'user/index/:page/animal-adoptar/:id', component: AnimalAdoptarComponent },
    { path: 'userIntereses', component: UserInteresesComponent },
    { path: 'userInteresesMenu', component: UserInteresesMenuComponent },
    { path: 'userFavoritos', component: UserFavoritosComponent },
    { path: 'userFavoritos/index', component: UserFavoritosComponent },
    { path: 'userFavoritos/index/:page', component: UserFavoritosComponent },
    { path: 'userFavoritos/animal-adoptar/:id', component: AnimalAdoptarComponent },
    { path: '**', component: InicioComponent }
];

// export const appRoutingProviders: any[] = [];
// export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
