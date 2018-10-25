import {Component, OnInit} from '@angular/core';
import {AddToCartService} from '../Services/addToCart.service';
import {environment} from '../../environments/environment';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

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
  public qtyInput = 1;

  qtyForm: FormGroup;

  ngOnInit() {
    this.addtocartService.cartProduct
      .subscribe(
        (result) => {
          if (result.length > 0) {
            this.qtyForm = new FormGroup({
              'quantity': new FormArray([])
            });
            this.flag = true;
            this.cartProduct = result;
            this.length = this.cartProduct.length;
            result.forEach((product) => {
              const control = new FormControl(product.product_qty);
              (<FormArray>this.qtyForm.get('quantity')).push(control);
            });
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

  save(id: number) {
    console.log('individul id' + this.qtyForm.value.quantity[id]);
  }

  checkQty(id: number) {
    if (this.qtyForm.value.quantity[id] === null) {
      this.qtyForm.value.forEach((part, index, theArray) => {
        index = 1;
      });
    }
  }

  keyupQty(id: number) {
    if (this.qtyForm.value.quantity[id] > 2) {

      this.qtyForm.controls.quantity[id].value = 2;
    }
  }

  removeItem(id: number) {
    const data = this.cartProduct;
    const index = data.findIndex(item => item.id === +id);
    data.splice(index, 1);
    this.addtocartService.removeAndSetProductInCart(data);
  }
}
