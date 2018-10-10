import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../Services/category.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }
  public dataSource;
  public displayedColumns: string[] = ['category_id', 'category_name'];
  @ViewChild(MatSort) sort: MatSort;
  // public pageIndex = 0;
  // public pageSize = 5;

  ngOnInit() {

    this.categoryService.getAllCategory()
      .subscribe(
        (result: any) => {
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.log(error);
        }
      );
  }

}
