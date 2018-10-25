import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {NgMaterialModule} from './ngMaterial.module';
import { AdminComponent } from './admin/admin.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule, MatTableModule, MatSortModule, MatPaginatorModule
} from '@angular/material';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import {AdminAuthGuard} from './auth-guard/adminAuth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BrandComponent } from './admin/brand/brand.component';
import {MainNavComponent} from './admin/main-nav/main-nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BranddialogComponent } from './admin/brand/branddialog/branddialog.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import {ImageZoomModule} from 'angular2-image-zoom';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PriceDetailComponent } from './price-detail/price-detail.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard], children: [
      {path: '', component: AdminDashboardComponent},
      {path: 'brand', component: BrandComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'product', component: ProductComponent}
    ]},
  {path: 'product/:id', component: ProductInfoComponent},
  {path: 'not-found', component: PagenotfoundComponent},
  {path: 'shopping_cart', component: ShoppingCartComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    AdminDashboardComponent,
    PagenotfoundComponent,
    MainNavComponent,
    BrandComponent,
    BranddialogComponent,
    CategoryComponent,
    ProductComponent,
    ProductInfoComponent,
    ShoppingCartComponent,
    PriceDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ImageZoomModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [AdminAuthGuard]
})
export class AppRoutingModule {
}
