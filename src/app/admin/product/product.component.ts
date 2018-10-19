import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, PageEvent, Sort} from '@angular/material';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ProductService} from '../../Services/product.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['category_name', 'brand_name',
    'product_name', 'product_description', 'product_qty', 'product_price',
    'product_images', 'isDeleted', 'issoldout', 'isFeatureProduct', 'actions'];
  public dataSource;
  public pageIndex = 0;
  public pageSize = 5;
  public len;
  public id = 0;
  public imageUrl = environment.imageUrl;
  public singleRecord: any[];
  public productData;
  public pageDirective = 'reset';
  public pageActive = 'reset';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private prodService: ProductService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fetchData(this.pageIndex, this.pageSize, this.pageDirective, this.pageActive);
  }

  sortchange(event: Sort) {
    this.pageDirective = event.direction;
    this.pageActive = event.active;

    if (this.pageDirective === '') {
      this.pageDirective = 'reset';
      this.pageActive = 'reset';
    }
    this.fetchData(this.pageIndex, this.pageSize, this.pageDirective, this.pageActive);

  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.fetchData(this.pageIndex, this.pageSize, this.pageDirective, this.pageActive);
  }

  deleteProduct(id: number) {
    this.prodService.deleteProduct(id)
      .subscribe(
        (result: any) => {
          if (result.Status) {
            this.snackBar.open(result.Status, 'Close', {
              duration: 3000
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );

    setTimeout(() => {
      this.fetchData(this.pageIndex, this.pageSize, this.pageDirective, this.pageActive);
    }, 500);
  }

  fetchData(index: number, size: number, direction: string, field: string) {
    const pageIndex = index * size;
    this.prodService.getPageWiseData(pageIndex, size, direction, field)
      .subscribe(
        (result) => {
          this.len = result['count'];
          this.productData = result['rows'];
          this.dataSource = result['rows'];
        },
        (error) => {
          console.log(error);
        }
      );

  }

  editProduct(id: number) {
    this.id = id;
    this.openDialog();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';

    if (this.id > 0) {
      const index = this.productData.findIndex(item => item.id === this.id);
      this.singleRecord = this.productData[index];
      dialogConfig.data = {
        data: this.singleRecord
      };
    } else {
      dialogConfig.data = {
        status: 'Add'
      };
    }

    const productDialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);

    productDialogRef.afterClosed()
      .subscribe(
        (data) => {
          if (data.Status) {
            this.snackBar.open(data.Status, 'Close', {
              duration: 3000
            });
            this.fetchData(this.pageIndex, this.pageSize, this.pageDirective, this.pageActive);
          }
          this.id = 0;
        },
        (error) => {
          console.log(error);
        }
      );

  }

}
