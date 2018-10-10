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
    const header = this.authService.getToken();
    const headers = {
      headers: new HttpHeaders({
        'Authorization': header
      })
    };
    return this.http.post('http://192.168.200.153:4040/api/brand/', brandData, headers)
      .pipe(
        map(
          (response: Response) => {
            return response;
          }
        )
      );
  }

  editBrand(brandData, id: number) {
    const header = this.authService.getToken();
    const headers = {
      headers: new HttpHeaders({
        'Authorization': header
      })
    };
    return this.http.put('http://192.168.200.153:4040/api/brand/' + id, brandData, headers)
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
    const header = this.authService.getToken();
    const headers = {
      headers: new HttpHeaders({
        'Authorization': header
      })
    };
    return this.http.delete('http://192.168.200.153:4040/api/brand/' + id, headers);
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
