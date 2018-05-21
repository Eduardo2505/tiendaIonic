import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { AlertController, Platform, ModalController } from "ionic-angular";
import { Storage } from "@ionic/storage";

import { UsuarioProvider } from "./usuario";
import { LoginPage, CarritoPage } from "../pages/index.paginas";

@Injectable()
export class CarritoProvider {
  items: any[] = [];
  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage,
    private modalCtrl: ModalController,
    private _us: UsuarioProvider
  ) {
    
    this.cargar_storage();
  }

  ver_Carrito() {
    console.log("ver carrrito");
   
    let modal :any;

    if (this._us.token) {
      //mostrar pagina
      modal=this.modalCtrl.create(CarritoPage);
    } else {
      //login
      modal= this.modalCtrl.create(LoginPage);
    }

    modal.present();

    modal.onDidDismiss((abrirCarrito: boolean) => {

      console.log(abrirCarrito);
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present()
      }
    });
  }

  agregar_carrito(item_parametro: any) {
    console.log("Entro aqui ");
    for (let item of this.items) {
      if (item.codigo == item_parametro.codigo) {
        this.alertCtrl
          .create({
            title: "Item existe",
            subTitle: item_parametro.producto + ", ya ese encuentra el carrito",
            buttons: ["OK"]
          })
          .present();

        return;
      }
    }
    this.items.push(item_parametro);
    this.guardar_storage();
  }

  private guardar_storage() {
    if (this.platform.is("cordova")) {
      //dispositivo
      this.storage.set("items", this.items);
    } else {
      //computadora
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready().then(() => {
          this.storage.get("items").then(val => {
            if (val) {
              console.log("Your age is", val);
              this.items = val;
            }
            resolve();
          });
        });
      } else {
        //computadora
        if (localStorage.getItem("items")) {
          this.items = JSON.parse(localStorage.getItem("items"));
        }
        resolve();
      }
    });

    return promesa;
  }
}
