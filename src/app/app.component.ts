import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [CommonModule, RouterOutlet], // No necesitas incluir AddProductComponent aquí, solo el RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-management';
}
