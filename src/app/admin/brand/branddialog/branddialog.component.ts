import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BrandService} from '../../../Services/brand.service';
import {Router} from '@angular/router';

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

  public brand_id = 0;

  ngOnInit() {
    this.brandForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });

    if (!this.data.status) {
      this.brand_id = this.data.data.brand_id;
      this.brandForm.setValue({
        name: this.data.data.brand_name,
        description: this.data.data.brand_description,
      });
    }
  }

  save() {
    const data = {
      name: this.brandForm.get('name').value,
      description: this.brandForm.get('description').value
    };

    if (this.brand_id > 0) {
      this.brandService.editBrand(data, this.brand_id)
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
      this.brand_id = 0;
    }

    setTimeout(() => {
      this.dialogRef.close(this.output);
    }, 500);
  }

  clear() {
    this.brandForm.reset();
  }
}
