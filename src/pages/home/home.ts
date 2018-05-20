import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos';

import { ProductoPage } from "../producto/producto";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage=ProductoPage;
  
  constructor(public navCtrl: NavController,
              private _proVer : ProductosProvider) {
  }

  siguientePagina( infiniteScroll ) {
    this._proVer.cargar_todos()
                .then(()=>{
                  infiniteScroll.complete();

                })
  }
}
