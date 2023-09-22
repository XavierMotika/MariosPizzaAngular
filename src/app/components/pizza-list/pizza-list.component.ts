import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Pizza from 'src/app/models/pizza';
import OrderLine from 'src/app/models/orderLine';
import OrderService from 'src/app/services/order.service';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="box">
      <div class="pizzaItem">
        <img src="{{ getUrl(pizza.image) }}" />
        <div class="details">
          <h1>{{ pizza.name }}</h1>
          <p>{{ pizza.description }}</p>
        </div>
      </div>
      <div class="bottom">
        <h2>Prix : {{ getPrice(pizza.price) }}</h2>
        <div class="buttons">
          <button type="button" (click)="removeOne()">-</button>
          <h3>Quantité : {{ quantity }}</h3>
          <button type="button" (click)="addOne()">+</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent {
  @Input() pizza!: Pizza;

  quantity: number = 0;
  orderLine: OrderLine;
  orderService: OrderService = inject(OrderService);
  constructor() {
    this.orderLine = new OrderLine('', 0, 0);
  }

  getUrl(src: string) {
    return '../assets/pizza/' + src;
  }
  getPrice(price: number) {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  removeOne() {
    if (this.quantity > 0) {
      this.quantity = this.quantity - 1;
      this.orderLine.quantity = this.quantity;
    }
    this.setId();
    console.log(this.orderLine);
    this.quantity === 0
      ? localStorage.removeItem(this.pizza.id)
      : localStorage.setItem(this.pizza.id, JSON.stringify(this.orderLine));
    this.checkOrderLines(this.pizza.id);
  }

  addOne() {
    if (this.quantity < 10) {
      this.quantity = this.quantity + 1;
      this.orderLine.quantity = this.quantity;
    }
    this.setId();
    console.log(this.orderLine);
    localStorage.setItem(this.pizza.id, JSON.stringify(this.orderLine));
    this.checkOrderLines(this.pizza.id);
  }

  setId() {
    if (this.orderLine.pizza === '') {
      this.orderLine.pizza = this.pizza.id;
    }
    if (this.orderLine.price === 0) {
      this.orderLine.price = this.pizza.price;
    }
  }

  checkOrderLines(id: string) {
    let orderLineIndex: number = this.orderService
      .getOrderLines()
      .findIndex((orderLine) => orderLine.pizza === id);
    if (orderLineIndex !== -1) {
      this.orderService.removeLine(orderLineIndex, this.orderLine);
    } else {
      this.orderService.addLine(this.orderLine);
    }
  }
}
