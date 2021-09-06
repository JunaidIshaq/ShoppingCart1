import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { StringStorage } from 'src/StringStorage';
import { Observable } from 'rxjs';
import { ICart } from '../models/Cart';
import { AddToCartViewModel } from '../models/AddToCartViewModel';
import { ICartDetail } from '../models/CartDetail';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly HEADERS = new HttpHeaders({ 'Content-Type':  'application/json' });
  private http: HttpClient;
  private readonly cartUrl = StringStorage.apiUrl + 'carts';

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCart(customerId: number): Observable<ICart> {
    const url = this.cartUrl + '/' + customerId;
    const cart$ = this.http.get<ICart>(url, { headers: this.HEADERS });
    return cart$;
  }

  addToCart(vm: AddToCartViewModel): Observable<ICart> {
    const cart$ = this.http.post<ICart>(this.cartUrl, vm, { headers: this.HEADERS });
    return cart$;
  }

  updateCartDetail(cartDetail: ICartDetail): Observable<HttpResponse<{}>> {
    const response$ = this.http.put<{}>(this.cartUrl, cartDetail, { headers: this.HEADERS, observe: 'response' });
    return response$;
  }

  deleteCartDetail(cartDetailId: number): Observable<HttpResponse<{}>> {
    const url = this.cartUrl + '/' + cartDetailId;
    const response$ = this.http.delete<{}>(url, { headers: this.HEADERS, observe: 'response' });
    return response$;
  }
}
