import { Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MainComponent } from './pages/main/main.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { BlogComponent } from './pages/blog/blog.component';
import { CardDetalleComponent } from './pages/card-detalle/card-detalle.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';

export const routes: Routes = [
    { path: 'home', component: MainComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'tienda/:id', component: CardDetalleComponent },
    { path: 'home/:name', component: CardDetalleComponent },
    { path: 'acerca-de', component: AcercaDeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegistrarComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
