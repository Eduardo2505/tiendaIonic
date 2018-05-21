import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoProvider } from "../../providers/index.services";

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  pro: any={};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private carritoPr :CarritoProvider) {
              
    console.log(this.navParams.get("producto"))
    this.pro=this.navParams.get("producto");
  }





}
