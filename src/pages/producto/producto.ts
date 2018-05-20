import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  pro: any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams.get("producto"))
    this.pro=this.navParams.get("producto");
  }





}
