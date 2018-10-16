import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../Services/category.service';
import {MatSort, PageEvent, Sort} from '@angular/material';

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
  public pageDirection = 'reset';
  public pageActive = 'reset';

  ngOnInit() {

    this.fetchData(this.pageIndex, this.pageSize, this.pageDirection, this.pageActive);
  }

  sortData(event: Sort) {
    this.pageDirection = event.direction;
    this.pageActive = event.active;

    if (this.pageDirection === '') {
      this.pageDirection = 'reset' ;
      this.pageActive = 'reset';
    }
    this.fetchData(this.pageIndex, this.pageSize, this.pageDirection, this.pageActive);
  }

  fetchData(index: number, size: number, direction: string, field: string) {
    const offset = index * size;
    this.categoryService.getDataPageWise(offset, size, direction, field)
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

  changeData (event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData(this.pageIndex, this.pageSize, this.pageDirection, this.pageActive);
  }

}
