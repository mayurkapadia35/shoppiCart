import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {ProductDialogComponent} from './product-dialog/product-dialog.component';
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['category_id', 'brand_id',
    'product_name', 'product_description', 'product_qty', 'product_price', 'product_images', 'isDeleted', 'issoldout', 'actions'];
  public dataSource;
  public pageIndex = 0;
  public pageSize = 5;
  public len;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private prodService: ProductService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.fetchData(this.pageIndex, this.pageSize);
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
      this.fetchData(this.pageIndex, this.pageSize);
    }, 500);
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.fetchData(this.pageIndex, this.pageSize);
  }

  fetchData(index: number, size: number) {
    const pageIndex = index * size;
    this.prodService.getPageWiseData(pageIndex, size)
      .subscribe(
        (result) => {
          this.len = result['count'];
          this.dataSource = new MatTableDataSource(result['rows']);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {
      status: 'Add'
    };

    const productDialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);

    productDialogRef.afterClosed()
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );

  }

}
