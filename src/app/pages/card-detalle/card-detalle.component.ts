import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceApiService } from '../../services/Api Service/service-api.service';
import { IProduct } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ServiceLocalStorageService } from '../../services/LocalStorage/service-local-storage.service';
import { FormsModule } from '@angular/forms';
import { ServiceFirebaseService } from '../../services/FireBase/service-firebase.service';

@Component({
  selector: 'app-card-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-detalle.component.html',
  styleUrl: './card-detalle.component.css',
})
export class CardDetalleComponent implements OnInit {
  private _router = inject(Router);
  private _apiServices = inject(ServiceApiService); // Injecto la API
  private _firebaseService = inject(ServiceFirebaseService); // injecto Firebase
  private _localStorageService = inject(ServiceLocalStorageService); // Injecto la Servico de localStorage

  producto: IProduct | undefined; // Variable para almacenar el producto
  imageSrc: string = 'Corazon-1.png';
  listaCarrito: [number, number][] = [];
  cantidad: number = 0;
  idProducto: number = 0;
  userId: string | null = null; // Variable para almacenar el ID del usuario logueado
  mostrarInfo = [{ expanded: false }, { expanded: false }, { expanded: false }];

  ngOnInit(): void {
    // Obtener el usuario autenticado
    this._firebaseService.getAuthenticatedUser().subscribe((user) => {
      if (user) {
        // Verifica si hay un usuario autenticado
        this.userId = user ? user.uid : null; // Almacena el ID del usuario
        this.cargarCarrito();

        // Verificar el estado inicial del favorito
        if (this.userId && this._localStorageService.getFavoritos(this.userId).includes(this.idProducto)) {
          this.imageSrc = 'Corazon-2.gif';
        }
      }
    });
    this.loadProduct();
  }

  cargarCarrito(): void {
    if (this.userId) {
      // Verifica que userId no sea null o undefined
      this.listaCarrito = this._localStorageService.getCarrito(this.userId);
    } else {
      console.error(
        'User ID es null o undefined. No se puede cargar el carrito.'
      );
      // Aquí puedes manejar el caso en el que no hay un usuario autenticado
    }
  }

  agregarAlCarrito(productoId: number, cantidad: number): void {
    // Verifica si el usuario está logueado
    if (this.userId) {
      // Si el userId es válido, permite agregar el producto al carrito
      this._localStorageService.agregarAlCarrito(
        this.userId,
        productoId,
        cantidad
      );
      this.cargarCarrito(); // Recargar el carrito para mostrar los cambios
      alert('Producto agregado al carrito');
    } else {
      // Si no hay un userId, muestra un mensaje o redirige al login
      alert('Debes iniciar sesión para agregar productos al carrito.');
      this._router.navigate(['/login']);
    }
  }

  eliminarProducto(productoId: number): void {
    if (this.userId) {
      // Verifica que userId no sea null o undefined
      this._localStorageService.eliminarPorId(this.userId, productoId);
      this.cargarCarrito(); // Recargar el carrito para mostrar los cambios
    } else {
      console.error(
        'User ID es null o undefined. No se puede eliminar el producto.'
      );
      // Aquí puedes manejar el caso en el que no hay un usuario autenticado
    }
  }

  loadProduct(): void {
    // Obtén la URL actual y extrae los parámetros
    const urlTree = this._router.parseUrl(this._router.url);
    const params = urlTree.root.children['primary']?.segments;

    // Verifica si hay un parámetro 'id' y llama a la API
    if (params && params.length > 0) {
      const id = parseInt(params[params.length - 1].path, 10); // Último segmento de la URL como ID
      this._apiServices.getProductsById(id).subscribe((data: IProduct) => {
        this.idProducto = data.id;
        this.producto = data;
        console.log(data);
        console.log(data.id);
      });
    } else {
      console.error('ID de producto no encontrado en la URL.');
    }
  }
  
  meGusta(): void {
    if (this.userId) { // Asegurarse de que el usuario esté autenticado
      // Alternar el estado de favorito en el local storage
      this._localStorageService.toggleFavorito(this.userId, this.idProducto);
  
      // Cambiar la imagen del botón de corazón
      if (this.imageSrc === 'Corazon-1.png') {
        this.imageSrc = 'Corazon-2.gif';
      } else {
        this.imageSrc = 'Corazon-1.png';
      }
    } else {
      alert('Debes iniciar sesión para marcar como favorito.');
      this._router.navigate(['/login']);
    }
  }

  onCantidadChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.cantidad = parseInt(inputElement.value, 10);
    console.log('Nuevo valor de cantidad:', this.cantidad);
  }

  toggleInfo(index: number) {
    this.mostrarInfo[index].expanded = !this.mostrarInfo[index].expanded;
  }
}
