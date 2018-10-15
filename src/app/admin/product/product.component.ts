import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
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
          this.dataSource = result['rows'];
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
