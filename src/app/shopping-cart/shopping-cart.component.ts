import {Component, OnInit} from '@angular/core';
import {AddToCartService} from '../Services/addToCart.service';
import {environment} from '../../environments/environment';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../Services/product.service';
import {ProductQuantityService} from '../Services/product-quantity.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private addtocartService: AddToCartService,
              private productService: ProductService,
              private productQuantityService: ProductQuantityService) {
  }

  cartProduct: any[];
  public imageUrl = environment.imageUrl;
  flag = false;
  public length: number;

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
              const control = new FormControl(1, [Validators.required, Validators.pattern(/^[0-9]*$/)]);
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

  keyupQty(index: number, originalQuantity: number, category: string) {
    this.manageQuantity(index, originalQuantity, category);
  }

  addQty(index: number, originalQuantity: number, category: string) {
    this.qtyForm.controls['quantity'].value[index]++;
    this.manageQuantity(index, originalQuantity, category);
  }

  removeQty(index: number, originalQuantity: number, category: string) {
    this.qtyForm.controls['quantity'].value[index]--;
    this.manageQuantity(index, originalQuantity, category);
  }

  manageQuantity(index: number, originalQuantity: number, category: string) {
    const textBoxValue = +this.qtyForm.controls['quantity'].value[index];
    setTimeout(() => {
      const updatedValue = this.productQuantityService.checkQuantity(textBoxValue, +originalQuantity, category);
      this.qtyForm.controls['quantity'].value[index] = updatedValue;
    }, 100);
  }

  removeItem(id: number) {
    const data = this.cartProduct;
    const index = data.findIndex(item => item.id === +id);
    data.splice(index, 1);
    this.addtocartService.removeAndSetProductInCart(data);
  }
}
