export default class OrderLine {
  pizza: string;
  quantity: number;
  price: number;

  constructor(pizza: string, quantity: number, price: number) {
    (this.pizza = pizza), (this.quantity = quantity), (this.price = price);
  }
}
