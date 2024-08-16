import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { IUser } from '../../models/user.model';
import { ServiceFirebaseService } from '../../services/FireBase/service-firebase.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule,RouterOutlet],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css',
})
export class RegistrarComponent {
  
  private _firebaseService = inject(ServiceFirebaseService);
  private _router = inject(Router);

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile?: File;  // Almacena el archivo seleccionado

  ngOnInit(): void {

  }

  registrarUser() {
    const newUser: IUser = {
      userId: '', // El ID será asignado por Firebase
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password,
      photoURL: '',
    };

    this._firebaseService.registrarUser(newUser, this.selectedFile).subscribe(
      (res) => {
        if (res) {
          console.log('Usuario registrado:', res);
          this._router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    // Obtiene el archivo del input
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Guarda el archivo seleccionado
      const reader = new FileReader();
      // Configura el evento onload para actualizar la vista previa de la imagen
      reader.onload = () => {
        this.imagePreview = reader.result; // Guarda el resultado (base64) en imagePreview
      };
      // Lee el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  }
  
}
