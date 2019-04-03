// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserSettingsComponent } from './home/userSettings/userSettings.component';
import { EditUserComponent } from './home/userSettings/editUser/editUser.component';
import { LoginComponent } from './login/login.component';

// Services
import { UserService } from './_services/user.service';
import { UserAuthenticationService } from './_services/user-authentication.service';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './_guards/auth.guard';

// Routes setup
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // Routes that are protected
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: UserSettingsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to login
    { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    UserSettingsComponent,
    LoginComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  // Ovde se registruju servisi
  providers: [UserService, UserAuthenticationService, AlertService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
