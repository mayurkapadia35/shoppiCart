import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  public user;

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.user = params.id;
        }
      );
  }

}
