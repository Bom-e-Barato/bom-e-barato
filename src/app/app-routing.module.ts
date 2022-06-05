import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { HomeComponent } from './home/home.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { SearchComponent } from './search/search.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'product', component: ShowProductComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ad', component: CreateAdComponent },
  { path: 'search', component: SearchComponent },
  { path: 'chat', component: ChatComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },   /* Default routing to HomeComponent */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
