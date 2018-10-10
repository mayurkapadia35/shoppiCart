import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategory() {
    return this.http.get('http://localhost:3000/api/category/getAllCategory');
  }
}
