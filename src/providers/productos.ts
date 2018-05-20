import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { URL_SERVICIOS } from "../config/url.servicios";

@Injectable()
export class ProductosProvider {
  // data: any;
  pagina: number = 0;
  productosv: any[] = [];
  lineas: any[] = [];
  por_categoria: any = [];
  categoriaAux:number=0;

  constructor(public http: Http) {
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_porCatgoria(categoria: number) {
    let promesa = new Promise((resolve, reject) => {
      if(this.categoriaAux==0){
        this.pagina=0;
        this.categoriaAux=categoria;
        this.por_categoria = [];
      }
      if(this.categoriaAux!=categoria){
        this.pagina=0;
        this.categoriaAux=categoria;
        this.por_categoria = [];
      }
      
      let url = URL_SERVICIOS + "/productos/por_tipo/"+categoria+"/" + this.pagina;
      console.log(url);
      this.http
        .get(url)
        .map(res => res.json())
        .subscribe(data => {
          if (data.error) {
          } else {
            
           // let nuevaData = this.agrupar(data.productos, 2);
            this.por_categoria.push(...data.productos);
            this.pagina += 1
            console.log(this.por_categoria);
          }
          resolve();
      
        });

      });
      return promesa;

  }
  cargar_lineas() {
    let url = URL_SERVICIOS + "/lineas";
    this.http
      .get(url)
      .map(res => res.json())
      .subscribe(data => {
        if (data.error) {
        } else {
          this.lineas = data.lineas;
        //  console.log(this.lineas);
        }
      });
  }

  cargar_todos() {
    let promesa = new Promise((resolve, reject) => {
      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;
      this.http
        .get(url)
        .map(res => res.json())
        .subscribe(data => {
          if (data.error) {
          } else {
            let nuevaData = this.agrupar(data.productos, 2);
            this.productosv.push(...nuevaData);
            this.pagina += 1;
          }
          // con el Resolve le dice que ya termino proceso ASICRONO cuando se utiliza una promise
          resolve();
        });
    });
    return promesa;
  }

  private agrupar(arr: any, tamano: number) {
    let nuevoArreglo = [];
    for (let i = 0; i < arr.length; i += tamano) {
      nuevoArreglo.push(arr.slice(i, i + tamano));
    }
    // console.log(nuevoArreglo);
    return nuevoArreglo;
  }
}
