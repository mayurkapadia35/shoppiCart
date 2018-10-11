import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../Services/category.service';
import {MatSort, MatTableDataSource, PageEvent} from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }
  public dataSource;
  public displayedColumns: string[] = ['category_name'];
  @ViewChild(MatSort) sort: MatSort;
  public pageIndex = 0;
  public pageSize = 5;
  public len = 0;
  ngOnInit() {

    this.fetchData(this.pageIndex, this.pageSize);
  }

  fetchData(index: number, size: number) {
    const offset = index * size;
    this.categoryService.getDataPageWise(offset, size)
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

  changeData (event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData(this.pageIndex, this.pageSize);
  }

}
