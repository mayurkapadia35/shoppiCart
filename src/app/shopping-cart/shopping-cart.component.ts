import {Component, OnInit} from '@angular/core';
import {AddToCartService} from '../Services/addToCart.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private addtocartService: AddToCartService) {
  }

  cartProduct: any[];
  public imageUrl = environment.imageUrl;
  flag = false;
  public length: number;
  ngOnInit() {
    this.addtocartService.cartProduct
      .subscribe(
        (result) => {
          if (result.length > 0) {
            this.flag = true;
            this.cartProduct = result;
            this.length = this.cartProduct.length;
          } else {
            this.flag = false;
            this.length = 0;
          }
        },
        (error) => {
          console.log(error);
        }
      );

    this.addtocartService.getAllCartProduct();
  }

  removeItem(id: number) {
    const data = this.cartProduct;
    const index = data.findIndex(item => item.id === +id);
    data.splice(index, 1);
    this.addtocartService.removeAndSetProductInCart(data);
  }
}
