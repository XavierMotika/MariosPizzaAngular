import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      order works!
    </p>
  `,
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

}
