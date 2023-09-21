import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <img src="../assets/logo.png" class="img-header" />
      <h1></h1>
    </header>
  `,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {}
