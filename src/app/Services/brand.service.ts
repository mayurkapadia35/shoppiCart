import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../auth-guard/authentication-service';

@Injectable()
export class BrandService {
  constructor(private http: HttpClient,
              private authService: AuthenticationService) {}

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
    const header = this.authService.getToken();
    const headers = {
      headers: new HttpHeaders({
        'Authorization': header
      })
    };
    return this.http.get('http://192.168.200.153:4040/api/brand/' + pageIndex + '/' + pageSize, headers)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }
}
