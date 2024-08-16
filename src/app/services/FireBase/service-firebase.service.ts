import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable, of } from 'rxjs';
import { collection,doc,Firestore,getDoc,setDoc,} from '@angular/fire/firestore';
import {getDownloadURL,ref,Storage,uploadBytes,} from '@angular/fire/storage';
import {Auth,authState,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,User,} from '@angular/fire/auth';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceFirebaseService {
  private firestore = inject(Firestore); // Inyecta Firestore
  private auth = inject(Auth); // Inyecta Auth para autenticación
  private storage = inject(Storage); // Inyecta Firebase Storage

  private userCollection = collection(this.firestore, 'User'); // Observable para seguir el estado del usuario

  
  // Registrar nuevo usuario
  registrarUser(user: IUser, file?: File) {
    // Primero, creamos el usuario en Firebase Authentication
    return from(
      createUserWithEmailAndPassword(this.auth, user.email, user.password).then(
        (credentials) => {
          user.userId = credentials.user.uid; // Asigna el userId generado por Firebase Authentication
          // Si se proporciona un archivo de imagen, lo subimos a Firebase Storage
          if (file) {
            const storageRef = ref(
              this.storage,
              `users/${user.userId}/profile.jpg`
            );
            return uploadBytes(storageRef, file).then(() => {
              // Una vez subida la imagen, obtenemos la URL
              return getDownloadURL(storageRef).then((url) => {
                user.photoURL = url;
                // Guardar los datos del usuario en Firestore usando setDoc para usar el userId como ID del documento
                const userDocRef = doc(this.userCollection, user.userId);
                return setDoc(userDocRef, user);
              });
            });
          } else {
            // Si no hay archivo, solo almacenamos los datos en Firestore usando setDoc
            const userDocRef = doc(this.userCollection, user.userId);
            return setDoc(userDocRef, user);
          }
        }
      )
    ).pipe(
      catchError((error) => {
        // Manejo de errores con alerta
        let errorMessage = 'Error al registrar el usuario.';
        if (error.code === 'auth/weak-password') {
          errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
        } else if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'El email ya está en uso.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'El email no es válido.';
        }
        alert(errorMessage); // Mostrar el mensaje de error
        console.error('Error al registrar el usuario:', error);
        return of(null); // O manejar el error de otra manera
      })
    );
  }

  // Iniciar sesión
  loginUser(email: string, password: string) {
    // Verificar formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('El email no es válido.');
      return of(null); // Retorna observable vacío si el email no es válido
    }

    // Verificar que la contraseña no esté vacía
    if (password.trim() === '') {
      alert('La contraseña no puede estar vacía.');
      return of(null); // Retorna observable vacío si la contraseña está vacía
    }

    // Intentar iniciar sesión
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError((error) => {
        let errorMessage = 'Error al iniciar sesión.';
        if (error.code === 'auth/wrong-password') {
          errorMessage = 'La contraseña es incorrecta.';
        } else if (error.code === 'auth/user-not-found') {
          errorMessage = 'No se encontró un usuario con este email.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'El email no es válido.';
        }
        alert(errorMessage); // Mostrar el mensaje de error
        console.error('Error al iniciar sesión:', error);
        return of(null); // O manejar el error de otra manera
      })
    );
  }

  // Cerrar sesión
  logoutUser() {
    return from(signOut(this.auth));
  }

  // Obtener el usuario autenticado
  getAuthenticatedUser(): Observable<User | null> {
    return authState(this.auth);
  }

  // Obtener datos del usuario desde Firestore
  getUserData(userId: string): Observable<IUser | null> {
    const docRef = doc(this.userCollection, userId);
    //const docRef = doc(this.firestore, `User/${userId}`);
    return from(getDoc(docRef)).pipe(
      map((docSnapshot) => {
        // Verifica si el documento existe
        if (docSnapshot.exists()) {
          console.log('Documento encontrado:', docSnapshot.data());
          return docSnapshot.data() as IUser;
        } else {
          console.log('Documento no encontrado para el userId:', userId);
          return null;
        }
      }),
      catchError((error) => {
        // Maneja cualquier error que ocurra durante la obtención del documento
        console.error('Error al obtener datos del usuario:', error);
        return of(null);
      })
    );
  }
}
