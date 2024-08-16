import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Router, RouterOutlet } from '@angular/router';
import { IProduct } from '../../models/product.model';
import { ServiceApiService } from '../../services/Api Service/service-api.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet,CardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private _apiServices = inject(ServiceApiService);  // Injectamos el servicio para usarlo
  private _router = inject(Router);

  productList: IProduct[] = [];         // lista de productos
  carouselProducts: IProduct[] = [];    // Lista de productos para el carrusel
  favoritosList: IProduct[] = [];    // Lista de productos para el carrusel
  selectedMoneda: string = ''; // Moneda por defecto

  ngOnInit(): void {
    this.loadProducts();
    console.log(this.carouselProducts);
  }

  loadProducts(): void {
    this._apiServices.getAllProducts().subscribe((data: IProduct[]) => {
      this.productList = data;
      this.selectRandomCarousel(3);
      this.selectRandomProducts(8);
      console.log(data);
    });
  }


  // Función para seleccionar 3 productos aleatorios
  selectRandomCarousel(numbre:number): void {
    const shuffled = this.productList.sort(() => 0.5 - Math.random());
    this.carouselProducts = shuffled.slice(0, numbre); 
    
  }
  selectRandomProducts(numbre:number): void {
    const shuffled = this.productList.sort(() => 0.5 - Math.random());
    this.favoritosList = shuffled.slice(0, numbre); 
    
  }

  detalleProducto(id:number): void{
    console.log(id);
    this._router.navigate(['/tienda', id]);
  }

}
