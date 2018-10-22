import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductService} from '../Services/product.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  private prod_id;
  public image;
  public productName;
  public price;
  public category;
  public brand;
  public Qty;
  public imageUrl = environment.imageUrl;

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.prod_id = params.id;
          this.productService.getProductById(this.prod_id)
            .subscribe(
              (data: any) => {
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

}
