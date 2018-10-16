import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {AuthenticationService} from '../../auth-guard/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Orders', cols: 2, rows: 1, icons: 'list_alt', desc: 'Total Orders = 0', link: '/admin/order' },
          { title: 'Category', cols: 2, rows: 1, icons: 'category', desc: 'Total Category = 0', link: '/admin/category' },
          { title: 'Brands', cols: 2, rows: 1, icons: 'branding_watermark', desc: 'Total Brands = 0', link: '/admin/brand' },
          { title: 'Payments', cols: 2, rows: 1, icons: 'payment', desc: 'Total Payments= 0', link: '/admin/payment'},
          { title: 'Product', cols: 2, rows: 1, icons: 'smartphone', desc: 'Total Products = 0', link: '/admin/product'}
        ];
      }

      return [
        { title: 'Orders', cols: 1, rows: 1, icons: 'list_alt', desc: 'Total Orders = 0', link: '/admin/order' },
        { title: 'Category', cols: 1, rows: 1, icons: 'category', desc: 'Total Category = 0', link: '/admin/category' },
        { title: 'Brands', cols: 1, rows: 1, icons: 'branding_watermark', desc: 'Total Brands = 0', link: '/admin/brand' },
        { title: 'Payments', cols: 1, rows: 1, icons: 'payment', desc: 'Total Payments= 0', link: '/admin/payment'},
        { title: 'Product', cols: 1, rows: 1, icons: 'smartphone', desc: 'Total Products = 0', link: '/admin/product'}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
