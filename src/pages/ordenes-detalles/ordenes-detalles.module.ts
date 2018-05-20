import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdenesDetallesPage } from './ordenes-detalles';

@NgModule({
  declarations: [
    OrdenesDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdenesDetallesPage),
  ],
})
export class OrdenesDetallesPageModule {}
