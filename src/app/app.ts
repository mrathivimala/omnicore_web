import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerForm } from './customer/customer-form/customer-form';

@Component({
  imports: [RouterOutlet,CustomerForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('omnicore_web');
}
