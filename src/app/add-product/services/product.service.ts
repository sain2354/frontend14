// src/app/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://www.backend12.somee.com/api/productos';

  constructor(private http: HttpClient) {}

  // Cambia el tipo de parámetro a Producto para enviar JSON
  
createProduct(productData: any): Observable<any> {
  return this.http.post(this.apiUrl, productData, {
      headers: { 'Content-Type': 'application/json' },
  });
}


  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
