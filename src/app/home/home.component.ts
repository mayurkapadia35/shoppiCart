import { Component, OnInit } from '@angular/core';
import {ProductService} from '../Services/product.service';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private prodService: ProductService) {
  }

  public imageValue = '1.jpg';
  public imageArray = ['1.jpg', '2.jpg', '3.png', '4.png'];
  public len = this.imageArray.length;
  public i = 1;
  private value = 'rand';
  private limit = 6;
  public randomData;
  public imageUrl = environment.imageUrl;

  ngOnInit() {
    this.prodService.getRandomData(this.value, this.limit)
      .subscribe(
        (result: any) => {
          this.randomData = result;
        },
        (error) => {
          console.log(error);
        }
      );
    this.changeImage();
  }

  changeImage() {
    setInterval(() => {
      if (this.i === this.len) {
        this.i = 0;
      }
      this.imageValue = this.imageArray[this.i];
      this.i += 1;
    }, 2000);
  }
}
