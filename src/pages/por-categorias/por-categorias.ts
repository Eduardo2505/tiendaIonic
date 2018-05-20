import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ProductosProvider  } from "../../providers/index.services";

@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  objetoCagoria:any={};
  proporcategoria: any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _proVer :ProductosProvider) {
    this.objetoCagoria=this.navParams.get('categoria');

    //console.log("Este es el id"+this.objetoCagoria.id);
    this._proVer.cargar_porCatgoria(this.objetoCagoria.id);
    //idCategoria
  }


  siguientePagina( infiniteScroll ) {
    this._proVer.cargar_porCatgoria(this.objetoCagoria.id)
                .then(()=>{
                  infiniteScroll.complete();

                })
  }

  

}
