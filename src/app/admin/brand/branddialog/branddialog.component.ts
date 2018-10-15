import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrandService} from '../../../Services/brand.service';

@Component({
  selector: 'app-branddialog',
  templateUrl: './branddialog.component.html',
  styleUrls: ['./branddialog.component.css']
})
export class BranddialogComponent implements OnInit {

  brandForm: FormGroup;
  public output: any;

  constructor(public dialogRef: MatDialogRef<BranddialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private brandService: BrandService) {
  }

  public id = 0;

  ngOnInit() {
    this.brandForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    if (!this.data.status) {
      this.id = this.data.data.id;
      this.brandForm.setValue({
        name: this.data.data.brand_name,
      });
    }
  }

  save() {
    const data = {
      brand_name: this.brandForm.get('name').value,
    };

    if (this.id > 0) {
      this.brandService.editBrand(data, this.id)
        .subscribe(
          (result) => {
            this.output = result;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.brandService.addBrand(data)
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

  clear() {
    this.brandForm.reset();
  }
}
