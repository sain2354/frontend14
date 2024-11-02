import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { AppComponent } from './app/app.component'; 
import { provideHttpClient } from '@angular/common/http'; // Importar HttpClientModule

const production = false; // Cambia a true en producción
if (production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Asegúrate de añadir esto aquí también
    // No agregues provideForms, solo necesitas FormsModule en los componentes
  ]
}).catch(err => console.error(err));
