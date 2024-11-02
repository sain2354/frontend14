import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component'; 
import { provideHttpClient } from '@angular/common/http'; // Importar HttpClientModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideHttpClient(), // Asegúrate de añadir esta línea
    AddProductComponent 
  ],
};
