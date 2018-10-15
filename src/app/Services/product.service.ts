import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getPageWiseData(index: number, size: number, direction: string, field: string) {
    return this.http.get('http://192.168.200.153:4040/api/product/' + index + '/' + size + '/' + direction + '/' + field);
  }

  deleteProduct(id: number) {
    return this.http.delete('http://192.168.200.153:4040/api/product/' + id);
  }

  addProduct(prodData) {
    return this.http.post('http://192.168.200.153:4040/api/product', prodData);
  }

  editProduct(prodData, id: number) {
    return this.http.put('http://192.168.200.153:4040/api/product/' + id, prodData);
  }

}
