import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ipizzas } from 'src/app/interfaces/ipizzas';
import { AuthfirebaseService } from 'src/app/services/firebase/authfirebase.service';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.page.html',
  styleUrls: ['./pizzas.page.scss'],
})
export class PizzasPage implements OnInit {

  listaPizzas!: Ipizzas[];

  constructor(
    private fire:CrudfirebaseService,
    private auth:AuthfirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.fire.getCollection("Pizzas").subscribe((aux) => {
      this.listaPizzas = aux;
      console.log(this.listaPizzas);
    })
  }

  addPizza() {
    this.router.navigate(['/pizzas/add']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.listar();
      event.target.complete();
    }, 2000);
  }

  handleReorder(ev: CustomEvent<any>) {
    ev.detail.complete();
  }

  buscarPizza(event: any) {
    const texto = event.target.value;
    if ( texto && texto.trim() != '' ) {
      this.listaPizzas = this.listaPizzas.filter((aux: any) => {
        return (aux.nombre.toLowerCase().indexOf(texto.toLowerCase()) >- 1);
      })
    } else {
      this.listar();
    }
  }

}
