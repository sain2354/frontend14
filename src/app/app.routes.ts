// app.routes.ts
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddSaleComponent } from './add-sale/add-sale.component';

// Definición de las rutas
export const routes: Routes = [
  { path: '', redirectTo: '/add-product', pathMatch: 'full' },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-sale', component: AddSaleComponent } // Asegúrate de que el nombre es correcto
];

// Proveedores de la aplicación
export const appRoutingProviders = [
  provideRouter(routes),
  provideHttpClient()
];
