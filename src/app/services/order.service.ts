import AuthenticationService from './auth.service';
import Order from '../models/oder';

const address: string = '192.168.1.112:8080';

class OrderService {
  static async saveOrder(pOrder: Order): Promise<boolean> {
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
