import { Injectable } from '@angular/core';
import Pizza from '../models/pizza';
import AuthenticationService from './auth.service';

const address: string = '192.168.1.112:8080';

@Injectable({
  providedIn: 'root',
})
class PizzaService {
  async getList(): Promise<Pizza[]> {
    return fetch('http://' + address + '/pizza/all', {
      headers: { authorization: AuthenticationService.getJwt() },
    })
      .then((pizzas) => pizzas.json())
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default PizzaService;
