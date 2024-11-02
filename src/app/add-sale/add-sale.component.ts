import { Component, OnInit } from '@angular/core';
import { SaleService } from '../add-product/services/sale.service';
import { ProductService } from '../add-product/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css'],
  standalone: true, // Asegúrate de que el componente es standalone
  imports: [CommonModule, FormsModule] // Añadir FormsModule aquí
})
export class AddSaleComponent implements OnInit {
  isSaleModalOpen = false;
  clientName = '';
  selectedProduct: number | null = null; // Cambiado a null para mayor claridad
  products: any[] = []; // Array to hold products for the sale
  filteredProducts: any[] = []; // Array to hold filtered products
  saleSuccessMessage = '';

  constructor(private saleService: SaleService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; // Inicializar los productos filtrados con todos los productos
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openSaleModal() {
    this.isSaleModalOpen = true;
  }

  closeSaleModal() {
    this.isSaleModalOpen = false;
    this.resetForm(); // Resetea el formulario al cerrar el modal
  }

  registerSale() {
    if (!this.clientName || !this.selectedProduct) {
      console.warn('Please provide client name and select a product.'); // Warning if data is invalid
      return;
    }
  
    const saleData = {
      clientName: this.clientName, // Use the clientName entered by the user
      selectedProduct: this.selectedProduct, // Use the selected product ID
    };
  
    this.saleService.registerSale(saleData).subscribe(
      (response) => {
        this.saleSuccessMessage = 'Venta registrada exitosamente!';
        this.closeSaleModal();
      },
      (error) => {
        console.error('Error registrando venta:', error);
        console.error('Detalles del error:', error.error); // Additional error details
      }
    );
  }
  

  private resetForm() {
    this.clientName = '';
    this.selectedProduct = null;
    this.saleSuccessMessage = '';
    this.filteredProducts = this.products; // Resetea los productos filtrados al cerrar el modal
  }

  // Método para filtrar productos por categoría
  filterProductsByCategory(categoryId: number): void {
    this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
  }
}
