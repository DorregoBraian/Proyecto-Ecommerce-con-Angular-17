import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IProduct } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { ServiceFirebaseService } from '../../services/FireBase/service-firebase.service';
import { ServiceLocalStorageService } from '../../services/LocalStorage/service-local-storage.service';
import { ServiceApiService } from '../../services/Api Service/service-api.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CardComponent,FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent implements OnInit {
  private _apiServices = inject(ServiceApiService);
  private _localStorageService = inject(ServiceLocalStorageService);
  private _firebaseService = inject(ServiceFirebaseService);

  listaCarrito: [number, number][] = []; // formato [ [id, cantidad], [2,5], [8,3], [12,9] ]
  listProductos: IProduct[] = []; // lista de productos
  listFavoritos: IProduct[] = []; // lista de favoritos
  listIds: number[] = [];
  listIdsFavoritos: number[] = [];
  listCantidad: number[] = [];  // Array para almacenar las cantidades de cada producto
  cantidad: number = 0;
  userId: string = ''; // Variable para almacenar el ID del usuario autenticado

  ngOnInit(): void {

    // Obtener el usuario autenticado
    this._firebaseService.getAuthenticatedUser().subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.listaCarrito = this._localStorageService.getCarrito(this.userId);
        this.listIdsFavoritos = this._localStorageService.getFavoritos(this.userId); // Extraer los IDs de la listaDeFavoritos
        this.listIds = this.listaCarrito.map(([idValue]) => idValue); // Extraer los IDs de la listaCarrito
        console.log(this.listIds);
        this.listCantidad = this.listaCarrito.map(([id, cantidad]) => cantidad); // Extraer las cantidades de la listaCarrito
        console.log(this.listCantidad);
        this.loadProducts();
        this.loadProductsFavoritos();
        console.log(this.userId);
      }
    }); 
  }

  loadProducts(): void {
    this.listIds.forEach((id) => {
      this._apiServices.getProductsById(id).subscribe((product) => {
        this.listProductos.push(product);
        console.log(this.listProductos);
      });
    });
    console.log(this.listProductos);
  }

  loadProductsFavoritos(): void {
    this.listIdsFavoritos.forEach((id) => {
      this._apiServices.getProductsById(id).subscribe((product) => {
        this.listFavoritos.push(product);
        console.log(this.listFavoritos);
      });
    });
    console.log("los favoritos son:",this.listProductos);
  }

  restarCantidad(index: number): void {
    if (this.listCantidad[index] > 1) {
      this.listCantidad[index]--;
    }
  }

  sumarCantidad(index: number): void {
    this.listCantidad[index]++;
    this.listCantidad[index] = 0;
  }

  eliminarProducto(productId: number, index: number): void {
    const cantidadAEliminar = this.listCantidad[index];
    const cantidadActual = this.listaCarrito.find(([id]) => id === productId)?.[1] || 0;

    if (cantidadAEliminar > cantidadActual) {
      alert(`No se puede eliminar esa cantidad. Cantidad actual: ${cantidadActual}`);
    } 
    else {
      this._localStorageService.actualizarCantidad(this.userId, productId, cantidadActual - cantidadAEliminar);
      this.listaCarrito = this._localStorageService.getCarrito(this.userId);
      this.listIds = this.listaCarrito.map(([idValue]) => idValue);
      this.listCantidad = this.listaCarrito.map(([, cantidad]) => cantidad);
      this.listProductos = this.listProductos.filter(product => product.id !== productId || cantidadActual - cantidadAEliminar > 0);
    }
  }



}
