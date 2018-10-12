import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrandService} from '../../../Services/brand.service';
import {CategoryService} from '../../../Services/category.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private brandService: BrandService,
              private categoryService: CategoryService) { }
  productForm: FormGroup;
  public brandData: any[];
  public categoryData: any[];

  ngOnInit() {
    this.categoryService.getAllCategory()
      .subscribe(
        (result: any) => {
          this.categoryData = result;
        },
        (error) => {
          console.log(error);
        }
      );

    this.brandService.getAllBrand()
      .subscribe(
        (result: any) => {
          this.brandData = result;
        },
        (error) => {
          console.log(error);
        }
      );

    this.productForm = new FormGroup({
      category_id: new FormControl(null, Validators.required),
      brand_id: new FormControl(null, Validators.required),
      product_name: new FormControl(null, Validators.required),
      product_description: new FormControl(null, Validators.required),
      product_qty: new FormControl(null, Validators.required),
      product_price: new FormControl(null, Validators.required)
    });
  }

  clearAll() {
    this.productForm.reset();
  }

  SaveProduct() {
    this.dialogRef.close(this.productForm.value);
  }

}
