import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrandService} from '../../../Services/brand.service';
import {CategoryService} from '../../../Services/category.service';
import {ProductService} from '../../../Services/product.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private brandService: BrandService,
              private categoryService: CategoryService,
              private productService: ProductService) { }
  productForm: FormGroup;
  public brandData: any[];
  public output: any;
  public categoryData: any[];
  public files;
  public imageUrl = environment.imageUrl;
  public id = 0;
  public isDeletedArray = [
    { name: '0 Not', value: 0},
    { name: '1 Yes', value: 1},
  ];

  public isSoldOut = [
    { name: 'true', value: 'true'},
    { name: 'false', value: 'false'},
  ];

  public isFeatureProduct = [
    { name: '0', value: 0},
    { name: '1', value: 1},
  ];

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
      product_price: new FormControl(null, Validators.required),
      isDeleted: new FormControl(0, Validators.required),
      issoldout: new FormControl('false', Validators.required),
      product_images: new FormControl(null, Validators.required),
      isFeatureProduct: new FormControl(0, Validators.required)
    });

    if (!this.data.status) {
      this.id = this.data.data.id;
      this.productForm.patchValue({
        category_id: this.data.data.category_id,
        brand_id: this.data.data.brand_id,
        product_name: this.data.data.product_name,
        product_description: this.data.data.product_description,
        product_qty: this.data.data.product_qty,
        product_price: this.data.data.product_price,
        isDeleted: this.data.data.isDeleted,
        issoldout: this.data.data.issoldout,
        isFeatureProduct: this.data.data.isFeatureProduct
      });
      const image = <HTMLInputElement>document.getElementById('profileid');
      image.src = this.imageUrl + '/images/' + this.data.data.product_images;
    }
  }

  previewFile() {
    const preview = <HTMLInputElement>document.getElementById('profile');
    const img = <HTMLInputElement>document.getElementById('profileid');
    const file = preview.files[0];
    const reader = new FileReader();
    this.files = file;
    reader.addEventListener('load', function () {
      img.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  clearAll() {
    this.productForm.reset();
    const img = <HTMLInputElement>document.getElementById('profileid');
    img.src = '';
  }

  SaveProduct() {

    const fd = new FormData();
    fd.append('category_id', this.productForm.get('category_id').value);
    fd.append('brand_id', this.productForm.get('brand_id').value);
    fd.append('product_name', this.productForm.get('product_name').value);
    fd.append('product_description', this.productForm.get('product_description').value);
    fd.append('product_qty', this.productForm.get('product_qty').value);
    fd.append('product_price', this.productForm.get('product_price').value);
    fd.append('product_images', this.files);
    fd.append('isDeleted', this.productForm.get('isDeleted').value);
    fd.append('issoldout', this.productForm.get('issoldout').value);
    fd.append('isFeatureProduct', this.productForm.get('isFeatureProduct').value);

    if (this.id > 0) {
      this.productService.editProduct(fd, this.id)
        .subscribe(
          (result) => {
            this.output = result;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {

      this.productService.addProduct(fd)
        .subscribe(
          (result: any) => {
            this.output = result;
          },
          (error) => {
            console.log(error);
          }
        );
    }
    this.id = 0;
    setTimeout(() => {
      this.dialogRef.close(this.output);
    }, 500);
  }

}
