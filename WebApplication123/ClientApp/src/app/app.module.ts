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
import { TablesComponent } from './tables/tables.component';
import { ArticalFormComponent } from './home/userSettings/articalForm/articalForm.component';
import { ArticalTableComponent } from './home/userSettings/articalTable/articalTable.component';
import { UserinfoComponent } from './home/userSettings/userinfo/userinfo.component';

// Services
import { UserService } from './_services/user.service';
import { UserAuthenticationService } from './_services/user-authentication.service';
import { AlertService } from './_services/alert.service';
import { AuthGuard } from './_guards/auth.guard';
import { ProductService } from './_services/product.service';

// DIrectives
import { PaymeTooltipDirective } from './_directives/payme-tooltip.directive';

// Routes setup
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // Routes that are protected
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },
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
    EditUserComponent,
    TablesComponent,
    ArticalFormComponent,
    ArticalTableComponent,
    PaymeTooltipDirective,
    UserinfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  // Ovde se registruju servisi
  providers: [UserService, UserAuthenticationService, AlertService, AuthGuard, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
