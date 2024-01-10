import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipizza } from 'src/app/interfaces/ipizza';
import { Ipizzas } from 'src/app/interfaces/ipizzas';
import { ITipo } from 'src/app/interfaces/itipo';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  pizza!: Ipizzas | undefined;
  listaTipo! : ITipo[];

  constructor(
    private fire:CrudfirebaseService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(auxID);
  }

  ionViewWillEnter() {
    this.getPizza(this.getId());
  }

  getId() {
    let url = this.router.url 
    let aux = url.split("/",4)
    let id = aux[3]
    return id
  }

  getPizza(id: string) {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    if (auxID) {
      this.fire.getPizzaById('Pizzas',auxID).subscribe((pizza) => {
        console.log(pizza);
        this.pizza = pizza || {} as Ipizzas;
        if (this.pizza.tipoId) {
          this.fire.getTipoById('Tipo',this.pizza.tipoId).subscribe((tipo) => {
            if (tipo) {
              this.listaTipo = [tipo];
              console.log(this.listaTipo);
            }
          })
        }
      });
    }
  }

  eliminar() {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    if (auxID) {
      this.fire.deleteDocument('Pizzas',auxID);
      this.router.navigate(['/pizzas']);
    }
  }
}
