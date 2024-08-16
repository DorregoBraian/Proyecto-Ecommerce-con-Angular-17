import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category, IProduct } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceApiService {
  private _http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com/products';
  //private baseUrl = 'https://dummyjson.com/products';

  constructor() {}

  //    ------------------------- fakestoreapi --------------------------------

  getAllProducts(): Observable<IProduct[]> {
    //devuelve un lista de observable de productos
    return this._http.get<IProduct[]>(this.baseUrl);
  }

  getProductsById(id: number): Observable<IProduct> {
    //devuelve un observable de productos
    return this._http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  getAllCategory(): Observable<Category[]> {
    //devuelve un lista de observable de categoria
    return this._http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getProductsByCategory(category: string): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this.baseUrl}/category/${category}`);
  }

  getByNombre(nombre: string): Observable<IProduct> {
    //buscar un producto por nombre
    return this._http.get<IProduct>(`${this.baseUrl}/${nombre}`);
  }

  // --------------- dummyjson -------------------------------------

  // Obtener todos los productos
  /* getAllProducts(): Observable<IProduct[]> {
    return this._http
      .get<{ products: any[] }>(this.baseUrl)
      .pipe(map((response) => this.mapProducts(response.products)));
  }

  // Obtener un producto por su ID
  getProductsById(id: number): Observable<IProduct> {
    return this._http
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(map((product) => this.mapProduct(product)));
  }

  // Obtener productos por categoría
  getProductsByCategory(slug: string): Observable<IProduct[]> {
    return this._http
      .get<{ products: any[] }>(`${this.baseUrl}/category/${slug}`)
      .pipe(map((response) => this.mapProducts(response.products)));
  }

  // Buscar un producto por nombre
  getByNombre(nombre: string): Observable<IProduct> {
    return this._http
      .get<{ products: any[] }>(`${this.baseUrl}/search?q=${nombre}`)
      .pipe(map((response) => this.mapProduct(response.products[0])));
  }

  // Mapea un producto para adaptar la categoría al nuevo formato
  private mapProduct(product: any): IProduct {
    return {
      ...product,
      category: this.mapCategory(product.category),
    };
  }

  // Mapea una lista de productos
  private mapProducts(products: any[]): IProduct[] {
    return products.map((product) => this.mapProduct(product));
  }

  // Mapea la categoría al nuevo formato de ICategoria
  private mapCategory(category: string): ICategoria {
    return {
      slug: category.toLowerCase().replace(/ /g, '-'),
      name: this.capitalizeFirstLetter(category),
      url: `https://dummyjson.com/products/category/${category
        .toLowerCase()
        .replace(/ /g, '-')}`,
    };
  }

  // Capitaliza la primera letra de una categoría
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } */
}
