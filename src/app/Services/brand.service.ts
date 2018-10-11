import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {}

  addBrand(brandData) {
    return this.http.post('http://192.168.200.153:4040/api/brand/', brandData)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  editBrand(brandData, id: number) {
    return this.http.put('http://192.168.200.153:4040/api/brand/' + id, brandData)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  getAllBrand() {
    return this.http.get('http://192.168.200.153:4040/api/brand/');
  }

  deleteBrand(id: number) {
    return this.http.delete('http://192.168.200.153:4040/api/brand/' + id);
  }

  getBrandPageWise(pageIndex: number, pageSize: number) {
    return this.http.get('http://192.168.200.153:4040/api/brand/' + pageIndex + '/' + pageSize)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }
}
