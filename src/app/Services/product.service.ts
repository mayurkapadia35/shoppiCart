import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getPageWiseData(index: number, size: number) {
    return this.http.get('http://192.168.200.153:4040/api/product/' + index + '/' + size);
  }

  deleteProduct(id: number) {
    return this.http.delete('http://192.168.200.153:4040/api/product/' + id);
  }

}