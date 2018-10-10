import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
  PageEvent, Sort
} from '@angular/material';
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

  public displayedColumns: string[] = ['brand_name', 'actions'];
  public dataSource;
  public len = 0;
  public pageIndex = 0;
  public pageSize = 5;
  public id = 0;
  public brandData;
  public singleRecord: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.fetchData(this.pageIndex, this.pageSize);
  }

  fetchData(index: number, size: number) {
    const pageIndex = index * size;
    this.brandService.getBrandPageWise(pageIndex, size)
      .subscribe(
        (data: any) => {
          this.len = data['count'];
          this.brandData = data['rows'];
          this.dataSource = new MatTableDataSource(data['rows']);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  sortData(event: Sort) {
    console.log(event.direction);
    console.log(event.active);
  }

  deleteBlog(id: number) {
    this.brandService.deleteBrand(id)
      .subscribe(
        (data: any) => {
          if (data.Status) {
            this.snackBar.open(data.Status, 'close', {
              duration: 2000
            });
          }
        }
      );
    setTimeout(() => {
      this.fetchData(this.pageIndex, this.pageSize);
    }, 500);
  }

  editBlog(id: number) {
    this.id = id;
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

    if (this.id > 0) {
      const index = this.brandData.findIndex(item => item.id === this.id);
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
          if (result.Status) {
            this.snackBar.open(result.Status, 'Close', {
              duration: 3000
            });

            if (result.Status === 'Added Successfully') {
              this.fetchData(this.pageIndex, this.pageSize);
            } else if (result.Status === 'Updated succesfully') {
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
    this.id = 0;
  }

}
