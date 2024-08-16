import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceApiService } from '../../services/Api Service/service-api.service';
import { ServiceFirebaseService } from '../../services/FireBase/service-firebase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private _apiService = inject(ServiceApiService);
  private _router = inject(Router);
  private _firebaseService = inject(ServiceFirebaseService); // Inyectamos el servicio Firebase

  nombreProducto: string = ''; // Variable para almacenar el nombre del producto
  menuVisible: boolean = false;
  isLoggedIn: boolean = false;
  userPhotoURL: string | null = null; // URL de la imagen de perfil
  modoOsc = false; // Propiedad para controlar el estado del modo oscuro

  ngOnInit() {
    this.buscarUsuario();

  }

  buscarUsuario(): void{
    this._firebaseService.getAuthenticatedUser().subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        console.log('Usuario autenticado:', user.uid);
        // Obtener los datos del usuario desde Firestore
        this._firebaseService.getUserData(user.uid).subscribe(
          (userData) => {
            console.log('Datos del usuario obtenidos:', userData);
            if (userData && userData.photoURL) {
              this.userPhotoURL = userData.photoURL;
              console.log('URL de la imagen de perfil:', this.userPhotoURL);
            } else {
              this.userPhotoURL = 'Perfil.gif';
              console.log('No se encontró photoURL, asignando imagen por defecto:',this.userPhotoURL);
            }
          },
          (error) => {
            console.error('Error al obtener datos del usuario:', error);
            this.userPhotoURL = 'Perfil.gif';
          }
        );
      } else {
        console.log('No hay usuario autenticado, asignando imagen por defecto');
        this.userPhotoURL = 'Perfil.gif';
      }
    });
  }


  buscarProducto(): void {
    if (this.nombreProducto) {
      this._apiService
        .getByNombre(this.nombreProducto)
        .subscribe((producto) => {
          if (producto) {
            this._router.navigate(['/tienda', this.nombreProducto]);
          } else {
            alert('Producto no encontrado');
          }
        });
    }
  }

  toggleMenu(event: Event): void {
    event.preventDefault(); // Previene la navegación predeterminada
    this.menuVisible = !this.menuVisible; // Alterna la visibilidad del menú
  }

  logout(): void {
    this._firebaseService.logoutUser().subscribe(() => {
      this.isLoggedIn = false;
      this.menuVisible = false; // Oculta el menú al cerrar sesión
      this._router.navigate(['home']);
    });
  }

  closeMenu(): void {
    this.menuVisible = false; // Cierra el menú cuando el cursor sale de él
  }

  // Método para redirigir al carrito
  redirigirAlCarrito(): void {
    this._firebaseService.getAuthenticatedUser().subscribe((user) => {
      if (user) {
        // Si el usuario está autenticado, redirige al carrito
        this._router.navigate(['/carrito']);
      } else {
        // Si no está autenticado, redirige al login
        this._router.navigate(['/login']);
      }
    });
  }

  // Método para alternar entre modo claro y oscuro
  modoOscuro() {
    const body = document.body; // Obtén una referencia al elemento body
    body.classList.toggle('dark-mode'); // Alterna la clase 'dark-mode' en el body
    this.modoOsc = body.classList.contains('dark-mode'); // Actualiza el estado del modo oscuro
    console.log('Modo Oscuro');
  }
}
