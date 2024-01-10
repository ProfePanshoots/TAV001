import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipizzas } from 'src/app/interfaces/ipizzas';
import { CrudfirebaseService } from 'src/app/services/firebase/crudfirebase.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  pizza!: Ipizzas | undefined;

  constructor(
    private fire:CrudfirebaseService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    // TESTING
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
        //console.log(pizza);
        this.pizza = pizza || {} as Ipizzas;
        this.pizza.id = auxID;
      });
    }
  }

  updatePizza() {
    const auxID = this.activatedRoute.snapshot.paramMap.get('id');
    if (auxID && this.pizza) {
      this.fire.updateDocument('Pizzas',this.pizza,auxID);
      this.router.navigate(['/pizzas'])
    }
  }
}
