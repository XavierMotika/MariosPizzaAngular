import OrderLine from "./orderLine";

export default class Order {
  userId: string;
  totalAmount: number = 0;
  orderLines: Array<OrderLine>;

  constructor(
    pUserId: string,
    orderLines: Array<OrderLine>,
    pTotalAmount: number
  ) {
    this.userId = pUserId;
    this.orderLines = orderLines;
    this.totalAmount = pTotalAmount;
  }
}
