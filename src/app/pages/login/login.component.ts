import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceFirebaseService } from '../../services/FireBase/service-firebase.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private _firebaseService = inject(ServiceFirebaseService); // Injectamos el servicio para usarlo
  private _router = inject(Router);

  emailInput: string = '';
  passwordInput: string = '';

  ngOnInit(): void {


  }
  
  // Método para registrar un usuario
  registrarse(): void {
    this._router.navigate(['/registrar']);
  }

  // Método para iniciar sesión
  loginUser(): void {
    if (this.emailInput && this.passwordInput) {
      this._firebaseService.loginUser(this.emailInput, this.passwordInput).subscribe(
          (res) => {
            if (res) {
              console.log('Inicio de sesión exitoso:', res);
              this._router.navigate(['/home']); // Redirige al home si el login es exitoso
            }
          },
          (error) => {
            console.error('Email o Contraseña Incorrectas', error);
            // Maneja los errores, como credenciales incorrectas
          }
        );
    } else {
      console.error('Email y contraseña son requeridos');
      alert('Email y contraseña son requeridos');
    }
  }
}
