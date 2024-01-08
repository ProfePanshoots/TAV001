import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Ipizza } from 'src/app/interfaces/ipizza';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  // CREAMOS UN INTANCIA PARA EL TEST
  pizza: Ipizza = {
    nombre: 'Pizza con manjar1111',
    tipo: 'Esquizo'
  }

  constructor(
    private fireService:CrudfirebaseService,
    private router:Router,
    private toast:ToastController
  ) { }

  ngOnInit() {
  }

  async mensajeToast(msj:string) {
    const mensaje = await this.toast.create({
      message: msj,
      duration: 2000,
      position: 'bottom'
    });
    mensaje.present();
  }

  addPizza() {
    this.fireService.createDocument('Pizzas', this.pizza);
    this.mensajeToast("Pizza agregada!");
    this.router.navigate(['pizzas']);
  }

}
