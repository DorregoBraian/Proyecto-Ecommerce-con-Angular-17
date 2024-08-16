import { Component, inject, OnInit } from '@angular/core';
import { Category, IProduct } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { ServiceApiService } from '../../services/Api Service/service-api.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [FormsModule,CardComponent,AppComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent implements OnInit {
  
  private _apiServices = inject(ServiceApiService);  // Injectamos el servicio para usarlo
  private _router = inject(Router);

  productList: IProduct[] = [];    // lista de productos
  
  listCategoria: Category[] = [];    // lista de categoria
  selectedCategoria: string = ''; // Categoria seleccionada

  listMonedas: string[] = ['ARS', 'BOB', 'BRL', 'CLP', 'CNY', 'COP', 'EUR', 'INR', 'JPY', 'KRW', 'MXN', 'PEN', 'PYG', 'RUB', 'UYU','USD', 'VEF']; // Lista de monedas
  selectedMoneda: string = ''; // Moneda por defecto

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this._apiServices.getAllProducts().subscribe((data: IProduct[]) => {
      this.productList = data;
      console.log(data);
    });
  }

  loadCategories(): void {
    this._apiServices.getAllCategory().subscribe((data: Category[]) => {
      this.listCategoria = data;
      console.log(data);
    });
  }

  filterCategory(): void {
    if (this.selectedCategoria) {
      this._apiServices.getProductsByCategory(this.selectedCategoria).subscribe((data: IProduct[]) => {
        this.productList = data;
        console.log(data);
      });
    } else {
      this.selectedCategoria = "CategoriaList";
      this.loadProducts();
    }
  }

  detalleProducto(id:number): void{
    console.log(id);
    this._router.navigate(['/tienda', id]);
  }

}
