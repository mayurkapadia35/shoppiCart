import {Subject} from 'rxjs';

export class AddToCartService {
  private productArray = [];
  productLength = new Subject<any>();

  constructor() {}

  setProductInCart(product: any[]) {
    if (localStorage.getItem('products')) {
      this.productArray = JSON.parse(localStorage.getItem('products'));
      this.productArray.push(product);
    } else {
      this.productArray.push(product);
    }
    localStorage.setItem('products', JSON.stringify(this.productArray));
  }

  getTotalCartProduct() {
    if (localStorage.getItem('products')) {
      const data = JSON.parse(localStorage.getItem('products'));
      this.productLength.next(data.length);
    } else {
      this.productLength.next(0);
    }
  }

  getAllCartProduct() {
    if (localStorage.getItem('products')) {
      const data = JSON.parse(localStorage.getItem('products'));
      return data;
    }
  }

  isProductInCart(id: number) {
    if (localStorage.getItem('products')) {
      const data = JSON.parse(localStorage.getItem('products'));
      const prod_data = data.find(x => x.id === +id);
      if (prod_data) {
        return true;
      } else {
        return false;
      }
    }
  }

}
