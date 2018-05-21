import { Http, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "../config/url.servicios";
import { AlertController, Platform } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class UsuarioProvider {
  token: string;
  id_usuario: string;

  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage
  ) {
    console.log("Hello UsuarioProvider Provider");
  }
  activo(): boolean {
    console.log(this.token);
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  ingresarServicios(usuario: string, contrasena: string) {
    let data = new URLSearchParams();
    data.append("correo", usuario);
    data.append("contrasena", contrasena);
    let url = URL_SERVICIOS + "/login";

    return this.http.post(url, data).map(resp => {
      let data_res = resp.json();
      console.log(data_res);
      if (data_res.error) {
        this.alertCtrl
          .create({
            title: "Error al iniciar",
            subTitle: data_res.mensaje,
            buttons: ["Ok"]
          })
          .present();
      } else {
        this.token = data_res.token;
        this.id_usuario = data_res.id_usuario;
        this.guardar_storage();
      }
    });
  }

  cerrar_session() {
    this.token = null;
    this.id_usuario = null;
    this.guardar_storage();
  }

  private guardar_storage() {
    if (this.platform.is("cordova")) {
      //dispositivo
      if (this.token) {
        this.storage.set("token", this.token);
        this.storage.set("id_usuario", this.id_usuario);
      } else {
        this.storage.remove("token");
        this.storage.remove("id_usuario");
      }
    } else {
      //computadora
      if (this.token) {
        localStorage.setItem("token", this.token);
        localStorage.setItem("id_usuario", this.id_usuario);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready().then(() => {
          this.storage.get("token").then(val => {
            if (val) {
              this.token = val;
            }
          });

          this.storage.get("id_usuario").then(val => {
            if (val) {
              this.id_usuario = val;
            }
            resolve();
          });
        });
      } else {
        //computadora
        if (localStorage.getItem("token")) {
          this.token = localStorage.getItem("token");
        }
        if (localStorage.getItem("id_usuario")) {
          this.token = localStorage.getItem("id_usuario");
        }
        resolve();
      }
    });

    return promesa;
  }
}
