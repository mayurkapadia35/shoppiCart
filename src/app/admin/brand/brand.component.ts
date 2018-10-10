import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {BranddialogComponent} from './branddialog/branddialog.component';
import {BrandService} from '../../Services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private brandService: BrandService) {
  }

  public displayedColumns: string[] = ['brand_id', 'brand_name', 'brand_description', 'actions'];
  public dataSource;
  public len = 0;
  public pageIndex = 0;
  public pageSize = 5;
  public brand_id = 0;
  public brandData;
  public singleRecord: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.brandService.getTotalBrand()
      .subscribe(
        (data) => {
          this.len = data[0].totalLength;
        }
      );
    this.fetchData(this.pageIndex, this.pageSize);
  }

  fetchData(index: number, size: number) {
    const pageIndex = index * size;
    this.brandService.getBrandPageWise(pageIndex, size)
      .subscribe(
        (data: any) => {
          this.brandData = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteBlog(brand_id: number) {

    this.brandService.deleteBrand(brand_id)
      .subscribe(
        (data: any) => {
          if (data.Status) {
            this.snackBar.open(data.Status, 'close', {
              duration: 2000
            });
            this.ngOnInit();
          }
        }
      );
  }

  editBlog(brand_id: number) {
    this.brand_id = brand_id;
    this.openDialog();
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.fetchData(this.pageIndex, this.pageSize);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';

    if (this.brand_id > 0) {
      const index = this.brandData.findIndex(item => item.brand_id === this.brand_id);
      this.singleRecord = this.brandData[index];

      dialogConfig.data = {
        data: this.singleRecord
      };
    } else {
      dialogConfig.data = {
        status: 'Add'
      };
    }

    const brandDialogRef = this.dialog.open(BranddialogComponent, dialogConfig);

    brandDialogRef.afterClosed()
      .subscribe(
        (result: any) => {
          if (result.Success) {
            this.snackBar.open(result.Success, 'Close', {
              duration: 1500
            });

            if (result.Success === 'Added Successfully') {
              this.len += 1;
              this.fetchData(this.pageIndex, this.pageSize);
            } else if (result.Success === 'Edited Successfully') {
              this.fetchData(this.pageIndex, this.pageSize);
            }
          } else {
            console.log(result);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    this.brand_id = 0;
  }

}
