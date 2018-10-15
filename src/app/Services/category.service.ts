import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategory() {
    return this.http.get('http://192.168.200.153:4040/api/category');
  }

  getDataPageWise(index: number, size: number, direction: string, field: string) {
    return this.http.get('http://192.168.200.153:4040/api/category/' + index + '/' + size + '/' + direction + '/' + field);
  }
}
