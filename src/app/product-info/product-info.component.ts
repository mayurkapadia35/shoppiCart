import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../Services/product.service';
import {environment} from '../../environments/environment';
import {AddToCartService} from '../Services/addToCart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private addtocartService: AddToCartService,
              private router: Router) {
  }

  private prod_id;
  public image;
  public productName;
  public price;
  public category;
  public brand;
  public Qty;
  private product;
  public buttonFlag = false;
  public imageUrl = environment.imageUrl;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.prod_id = params.id;
          this.buttonFlag = this.addtocartService.isProductInCart(this.prod_id);
          this.productService.getProductById(this.prod_id)
            .subscribe(
              (data: any) => {
                this.product = data;
                this.image = data.product_images;
                this.productName = data.product_name;
                this.price = data.product_price;
                this.category = data.tblcategory.category_name;
                this.brand = data.tblbrand.brand_name;
                this.Qty = data.product_qty;
              },
              (error) => {
                console.log(error);
              }
            );
        }
      );
  }

  AddToCart() {
    this.addtocartService.setProductInCart(this.product);
    this.addtocartService.getTotalCartProduct();
    this.buttonFlag = this.addtocartService.isProductInCart(this.prod_id);
    this.addtocartService.getTotalPrice();
    if (this.buttonFlag === true) {
      this.router.navigate(['shopping_cart']);
    }
  }

  goToCart() {
    this.router.navigate(['shopping_cart']);
  }
}
