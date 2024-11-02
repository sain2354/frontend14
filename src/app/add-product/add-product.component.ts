import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../add-product/services/product.service';
import { HttpHeaders } from '@angular/common/http';

export interface Producto {
  id: number; // Este id puede ser manejado por el backend
  Nombre: string;
  Precio: number;
  CategoriaId: number;
  Imagen: string; // La URL de la imagen
}


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  isModalOpen = false;
  isSaleModalOpen = false; // Modal para ventas
  isProductDropdownOpen = false; // Dropdown para productos
  isSalesDropdownOpen = false; // Dropdown para ventas

  productName = '';
  productPrice: number = 0;
  productCategory: number = 1;
  productImagenUrl: string | null = null; // Solo manejamos la URL de la imagen
  successMessage = '';
  products: { id: number; Nombre: string; Precio: number; CategoriaId: number; Imagen: string }[] = [];
  
  clientName = ''; // Campo para el nombre del cliente
  selectedProduct: number = 0; // Campo para el producto seleccionado
  saleSuccessMessage = ''; // Mensaje de éxito para la venta

  categories: { id: number; name: string }[] = []; // Agregar propiedad para categorías

  constructor(private http: HttpClient, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories(); // Cargar categorías al inicializar el componente
  }

  // Métodos para abrir y cerrar el modal de productos
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.productName = '';
    this.productPrice = 0;
    this.productCategory = 1;
    this.productImagenUrl = null; 
  }

  // Métodos para abrir y cerrar el modal de ventas
  openSaleModal(): void {
    this.isSaleModalOpen = true;
  }

  closeSaleModal(): void {
    this.isSaleModalOpen = false;
    this.clientName = ''; // Resetea el nombre del cliente
    this.selectedProduct = 0; // Resetea el producto seleccionado
  }

  // Cargar productos desde el servicio
  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Producto[]) => {
      console.log('Productos recibidos:', data); // Inspeccionar los datos recibidos
      this.products = data;
    });
  }
  
  

  // Cargar categorías desde un servicio (implementa el servicio según sea necesario)
  loadCategories(): void {
    // Aquí deberías llamar a un servicio que cargue las categorías
    // Ejemplo (descomenta y adapta a tu implementación):
    // this.productService.getCategories().subscribe((data: any[]) => {
    //   this.categories = data;
    // });
  }

  // Filtrar productos por categoría
  filterProductsByCategory(categoryId: number): void {
    console.log('Filtrando productos por categoría con ID:', categoryId);
  }

  // Crear un nuevo producto
// Crear un nuevo producto
createProduct(): void {
  // Verificar que todos los campos requeridos estén completos
  if (this.productName.trim() && this.productPrice > 0 && this.productCategory) {
    const productData: Producto = {
      id: 0, // Este id podría ser manejado por el backend al crear el producto
      Nombre: this.productName,
      Precio: this.productPrice,
      CategoriaId: this.productCategory,
      Imagen: this.productImagenUrl || '', // Enviar la URL de la imagen o una cadena vacía
    };

    // Llamar al servicio para crear el producto
    this.productService.createProduct(productData).subscribe(
      (response: any) => {
        // Manejar la respuesta de éxito
        this.successMessage = `Producto ${this.productName} agregado con éxito.`;
        this.loadProducts(); // Recargar productos para actualizar la lista
        this.closeModal(); // Cerrar el modal
      },
      (error: any) => {
        // Manejar errores
        console.error('Error al crear el producto:', error);
      }
    );
  } else {
    // Mensaje de error si faltan campos
    console.error('Por favor complete todos los campos requeridos.');
  }
}



  // Método para manejar el cambio en la selección de la imagen
onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.productImagenUrl = e.target?.result as string; // Asignar la URL de la imagen
    };

    reader.readAsDataURL(file); // Leer el archivo como URL de datos
  }
}

  // Registrar una nueva venta
  registerSale(): void {
    if (this.clientName.trim() && this.selectedProduct > 0) {
      const payload = {
        cliente: this.clientName,
        productoId: this.selectedProduct,
        precio: this.products.find(product => product.id === this.selectedProduct)?.Precio,
      };
      console.log('Datos de venta:', payload); // Verifica que el payload sea correcto
    }
  }
  // Eliminar un producto
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter((product) => product.id !== id);
      },
      (error: any) => {
        console.log('Error al eliminar el producto:', error);
      }
    );
  }

  // Alternar el dropdown de productos
  toggleProductDropdown(): void {
    this.isProductDropdownOpen = !this.isProductDropdownOpen;
  }

  // Alternar el dropdown de ventas
  toggleSalesDropdown(): void {
    this.isSalesDropdownOpen = !this.isSalesDropdownOpen;
  }
}
