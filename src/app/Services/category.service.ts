import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategory() {
    return this.http.get(environment.apiUrl + 'category');
  }

  getDataPageWise(index: number, size: number, direction: string, field: string) {
    return this.http.get(environment.apiUrl + 'category/' + index + '/' + size + '/' + direction + '/' + field);
  }
}
