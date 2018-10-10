import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgMaterialModule} from './ngMaterial.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SigninUpComponent } from './signin-up/signin-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './auth-guard/authentication-service';
import {HttpClientModule} from '@angular/common/http';
import {BranddialogComponent} from './admin/brand/branddialog/branddialog.component';
import {BrandService} from './Services/brand.service';
import {CategoryService} from './Services/category.service';
import { ProductDialogComponent } from './admin/product/product-dialog/product-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninUpComponent,
    ProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, BrandService, CategoryService],
  entryComponents: [SigninUpComponent, BranddialogComponent, ProductDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
