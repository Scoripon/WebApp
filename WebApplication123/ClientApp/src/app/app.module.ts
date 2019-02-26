import { NgModule } from '@angular/core';
import { UserService } from './services/UserService.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchUserComponent } from './fetchUser/fetchUser.component';
import { createUser } from './addUser/createUser.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchUserComponent,
    createUser,
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'fetch-user', component: FetchUserComponent },
      { path: 'register-user', component: createUser },
      { path: 'user/edit/:id_korisnik', component: createUser },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [UserService]
})
export class AppModule {
}
