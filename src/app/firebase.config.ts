import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp  } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideDatabase } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';
import { environment } from '../environments/environment';
import { getStorage, provideStorage } from '@angular/fire/storage';

/* const firebaseProviders: EnvironmentProviders = importProvidersFrom(
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideDatabase(() => getDatabase()),
); */
const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideDatabase(() => getDatabase()),
  provideStorage(() => getStorage()),
];
export {firebaseProviders};