import { Component, OnInit } from '@angular/core';
import {AddToCartService} from '../Services/addToCart.service';

@Component({
  selector: 'app-price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.css']
})
export class PriceDetailComponent implements OnInit {

  constructor(private addtocartService: AddToCartService) { }

  length: number;
  totalprice: number;
  deliveryCharge: number;
  totalPayable: number;
  ngOnInit() {
    this.addtocartService.cartProduct
      .subscribe(
        (result) => {
          const data = result;
          this.length = data.length;
        },
        (error) => {
          console.log(error);
        }
      );

    this.addtocartService.cartTotalPrice
      .subscribe(
        (result) => {
          if (result > 500) {
            this.deliveryCharge = 0;
            this.totalprice = result;
            this.totalPayable = result;
          } else {
            this.deliveryCharge = 40;
            this.totalprice = result;
            this.totalPayable = this.deliveryCharge + this.totalprice;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    this.addtocartService.getAllCartProduct();
    this.addtocartService.getTotalPrice();
  }

}
