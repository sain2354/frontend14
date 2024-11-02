import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private apiUrl = 'https://www.backend12.somee.com/api/ventas'; // Update the API URL as needed

  constructor(private http: HttpClient) {}

  registerSale(saleData: any): Observable<any> {
    return this.http.post(this.apiUrl, saleData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // You may add other methods like getSales, deleteSale, etc., as needed.
}
