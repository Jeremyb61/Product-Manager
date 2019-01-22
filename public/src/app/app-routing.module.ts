import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'productlist', component: ProductlistComponent},
  { path: '', component: HomeComponent},
  { path: 'create', component: CreateComponent},
  { path: 'home', component: HomeComponent},
  { path: 'edit/:id', component: EditComponent}
];

@NgModule({
//   declarations: [HomeComponent, ProductlistComponent, CreateComponent, EditComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
