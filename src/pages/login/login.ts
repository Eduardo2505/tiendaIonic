import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

import { UsuarioProvider } from "../../providers/index.services";
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  correo: string = "";
  password: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private _us: UsuarioProvider
  ) {}

  ingresar() {
    this._us.ingresarServicios(this.correo, this.password).subscribe(() => {
     console.log("valos>>> "+this._us.activo);
      if ( this._us.activo ) {
        //entro
        console.log("entros "+this._us.activo);
        this.viewCtrl.dismiss(true);
      }else{
        this.viewCtrl.dismiss(false);
      }
    });
  }
}
