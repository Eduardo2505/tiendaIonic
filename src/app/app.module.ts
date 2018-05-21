import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule } from "@angular/http";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { IonicStorageModule } from '@ionic/storage';


import {
  ProductosProvider,
  CarritoProvider,
  UsuarioProvider
} from "../providers/index.services";
import {
  CarritoPage,
  CategoriasPage,
  LoginPage,
  OrdenesPage,
  OrdenesDetallesPage,
  PorCategoriasPage,
  ProductoPage,
  TabsPage
} from "../pages/index.paginas";

import { ImagenPipe } from "../pipes/imagen/imagen";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ImagenPipe,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallesPage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage
  ],
  imports: [BrowserModule,
            HttpModule,
            IonicStorageModule.forRoot(),
            IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallesPage,
    PorCategoriasPage,
    ProductoPage,
    TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
