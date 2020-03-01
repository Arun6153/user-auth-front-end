import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ImportDataComponent } from './import-data/import-data.component';
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: HomeLayoutComponent
  },
  {
    path: "home/:path",
    component: HomeLayoutComponent,
    children :[
      { path:'', component: ListUsersComponent },
      { path:'edit', component: EditUsersComponent },
      { path:'import', component: ImportDataComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
