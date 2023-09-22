import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from 'src/app/components/pizza-list/pizza-list.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import Pizza from 'src/app/models/pizza';
import PizzaService from 'src/app/services/pizza.service';
import OrderLine from 'src/app/models/orderLine';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, PizzaListComponent, FooterComponent],
  template: `
    <div class="results">
      <app-pizza-list
        *ngFor="let pizza of pizzaList"
        [pizza]="pizza"
      ></app-pizza-list>
    </div>
    <app-footer></app-footer>
  `,
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  pizzaList: Pizza[] = [];
  pizzaService: PizzaService = inject(PizzaService);

  constructor() {
    this.pizzaService.getList().then((list) => (this.pizzaList = list));
  }
}
