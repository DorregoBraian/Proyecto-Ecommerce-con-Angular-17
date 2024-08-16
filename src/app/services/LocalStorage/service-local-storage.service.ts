import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceLocalStorageService {

  private localStorageKey = 'listCarrito';

  // Método para obtener el carrito de un usuario específico
  getCarrito(userId: string): [number, number][] {
    const carritoKey = `${this.localStorageKey}_${userId}`;
    return JSON.parse(localStorage.getItem(carritoKey) as string) || [];
  }

  // Agrega un producto al carrito del usuario autenticado
  agregarAlCarrito(userId: string, productoId: number, cantidad: number | null): void {
    const carrito = this.getCarrito(userId);

    if (cantidad === null || cantidad <= 0) {
      this.eliminarPorId(userId, productoId);
      return;
    }

    const index = carrito.findIndex(([id]) => id === productoId);
    if (index !== -1) {
      carrito[index][1] += cantidad; // Sumar la cantidad si el producto ya está en el carrito
    } else {
      carrito.push([productoId, cantidad]);
    }

    const carritoKey = `${this.localStorageKey}_${userId}`;
    localStorage.setItem(carritoKey, JSON.stringify(carrito));
  }
  
  // Actualiza el carrito completo de un usuario específico
  actualizarCarrito(userId: string, nuevoCarrito: [number, number | null][]): void {
    const carritoValido = nuevoCarrito.filter(([_, cantidad]) => cantidad !== null && cantidad > 0);
    const carritoKey = `${this.localStorageKey}_${userId}`;
    localStorage.setItem(carritoKey, JSON.stringify(carritoValido));
  }

  // Actualiza la cantidad de un producto en el carrito del usuario autenticado
  actualizarCantidad(userId: string, productoId: number, cantidad: number | null): void {
    const carrito = this.getCarrito(userId);
    const productoIndex = carrito.findIndex(([id]) => id === productoId);

    if (productoIndex !== -1) {
      if (cantidad === null || cantidad <= 0) {
        carrito.splice(productoIndex, 1); // Elimina el producto si la cantidad es 0 o menos
      } else {
        carrito[productoIndex][1] = cantidad; // Actualiza la cantidad
      }
      const carritoKey = `${this.localStorageKey}_${userId}`;
      localStorage.setItem(carritoKey, JSON.stringify(carrito));
    }
  }

  // Eliminar el carrito completo del local storage para un usuario específico
  eliminarCarrito(userId: string): void {
    const carritoKey = `${this.localStorageKey}_${userId}`;
    localStorage.removeItem(carritoKey);
  }

  // Elimina un producto específico del carrito del usuario autenticado
  eliminarPorId(userId: string, productoId: number): void {
    const carrito = this.getCarrito(userId);
    const carritoActualizado = carrito.filter(([id]) => id !== productoId);
    const carritoKey = `${this.localStorageKey}_${userId}`;
    localStorage.setItem(carritoKey, JSON.stringify(carritoActualizado));
  }
}
