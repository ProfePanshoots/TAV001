import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ipizzas } from 'src/app/interfaces/ipizzas';
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
    })
  }

  addPizza() {
    this.router.navigate(['/pizzas/add']);
  }

}
