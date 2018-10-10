import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient) {}

  public brandData;
  addBrand(brandData) {
    return this.http.post('http://localhost:3000/api/brand/addBrand', brandData)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  editBrand(brandData, brand_id: number) {
    return this.http.post('http://localhost:3000/api/brand/editBrand/' + brand_id, brandData)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  getAllBrand() {
    return this.http.get('http://localhost:3000/api/brand/getAllBrand/');
  }

  deleteBrand(id: number) {
    return this.http.delete('http://localhost:3000/api/brand/deleteBrandById/' + id);
  }


  getTotalBrand() {
    return this.http.get('http://localhost:3000/api/brand/getTotalBrand');
  }

  getBrandPageWise(pageIndex: number, pageSize: number) {
    return this.http.get('http://localhost:3000/api/brand/getBrandPageWise/' + pageIndex + '/' + pageSize)
      .pipe(
        map(
          (response: Response) => {
            this.brandData = response;
            return response;
          }
        )
      );
  }
}
