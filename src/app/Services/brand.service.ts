import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {}

  addBrand(brandData) {
    return this.http.post(environment.apiUrl + 'brand/', brandData)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  editBrand(brandData, id: number) {
    return this.http.put(environment.apiUrl + 'brand/' + id, brandData)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  getAllBrand() {
    return this.http.get(environment.apiUrl + 'brand/');
  }

  deleteBrand(id: number) {
    return this.http.delete(environment.apiUrl + 'brand/' + id);
  }

  getBrandPageWise(pageIndex: number, pageSize: number, direction: string, field: string) {
    return this.http.get(environment.apiUrl + 'brand/' + pageIndex + '/' + pageSize + '/' + direction + '/' + field)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }
}
