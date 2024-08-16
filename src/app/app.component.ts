import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { MainComponent } from './pages/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MainComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;

  private _router = inject(Router);

  ngOnInit(): void {
    this.posicionInicio();
    this.loadLogin();
  }

  loadLogin(): void {
    this._router.events.subscribe((event) => {
      //Cada vez que la navegación finaliza (NavigationEnd), verificamos si la URL es /login
      if (event instanceof NavigationEnd) {
        // Verificar la ruta actual para mostrar u ocultar el header y footer
        this.showHeaderFooter = !(event.url === '/login'|| event.url === '/registrar');
      }
    });
  }

  posicionInicio(){
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Desplazar hacia la parte superior
      }
    });
  }

}
