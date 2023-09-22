import AuthenticationService from './auth.service';
import Order from '../models/oder';
import { Injectable } from '@angular/core';
import OrderLine from '../models/orderLine';

const address: string = '192.168.1.112:8080';

@Injectable({
  providedIn: 'root',
})
class OrderService {
  private orderLines: OrderLine[] = [];

  clear() {
    this.orderLines = [];
  }

  getOrderLines() {
    return this.orderLines;
  }

  removeLine(index: number, line: OrderLine) {
    if (line.quantity !== 0) {
      this.orderLines.splice(index, 1, line);
    } else {
      this.orderLines.splice(index, 1);
    }
  }

  addLine(line: OrderLine) {
    this.orderLines.push(line);
  }

  async saveOrder(pOrder: Order): Promise<boolean> {
    console.log(pOrder);
    return fetch('http://' + address + '/order/add', {
      method: 'POST',
      body: JSON.stringify(pOrder),
      headers: {
        'Content-Type': 'application/json',
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((ok) => ok.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default OrderService;
