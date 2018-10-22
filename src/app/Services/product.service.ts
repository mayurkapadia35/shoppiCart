import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getPageWiseData(index: number, size: number, direction: string, field: string) {
    return this.http.get(environment.apiUrl + 'product/' + index + '/' + size + '/' + direction + '/' + field);
  }

  deleteProduct(id: number) {
    return this.http.delete(environment.apiUrl + 'product/' + id);
  }

  addProduct(prodData) {
    return this.http.post(environment.apiUrl + 'product', prodData);
  }

  editProduct(prodData, id: number) {
    return this.http.put(environment.apiUrl + 'product/' + id, prodData);
  }

  getRandomData(value: string, limit: number) {
    return this.http.get(environment.apiUrl + 'product/' + value + '/' + limit);
  }

  getProductById(id: number) {
    return this.http.get(environment.apiUrl + 'product/' + id);
  }

}
