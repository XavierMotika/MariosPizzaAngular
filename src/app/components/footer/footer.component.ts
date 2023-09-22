import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import OrderService from 'src/app/services/order.service';
import OrderLine from 'src/app/models/orderLine';
import Order from 'src/app/models/oder';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Total : {{ getTotal() }} €</h1>
      <button type="button" (click)="sendOrder()">Valider</button>
    </div>
  `,
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  orderService: OrderService = inject(OrderService);
  total: number = 0;
  constructor() {}

  getTotal() {
    let newTotal: number = 0;
    this.orderService
      .getOrderLines()
      .forEach(
        (line: OrderLine) => (newTotal = newTotal + line.quantity * line.price)
      );
    this.total = newTotal;
    return this.total;
  }

  sendOrder() {
    if (this.total !== 0) {
      let id: string | null = localStorage.getItem('id');
      if (id !== null) {
        let newOrder: Order = new Order(
          id,
          this.orderService.getOrderLines(),
          this.total
        );
        console.log(JSON.stringify(newOrder));
        this.orderService
          .saveOrder(newOrder)
          .then((ok) =>
            ok ? (this.orderService.clear(), (this.total = 0)) : null
          );
      }
    }
  }
}
