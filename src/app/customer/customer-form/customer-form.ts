import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { error } from 'console';
import { Customer } from '../models/customer';

@Component({
  imports: [FormsModule],
  selector: 'app-customer-form',
  styleUrl: './customer-form.css',
  templateUrl: './customer-form.html',
})
export class CustomerForm implements OnInit {
  private customerService = inject(CustomerService);

  customers: Customer[] = [];
  saving = false;
  loading = false;
  message = '';
  errorMessage = '';

  customer: Customer = this.emptyCustomer();

  private emptyCustomer(): Customer {
    return {
      customerCode: '',
      customerName: '',
      customerGender: '',
      dob: '',
      age: null,
      address: '',
      city: '',
      state: '',
      country: '',
      status: 'ACTIVE'
    };
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.customerService.getCustomer().subscribe({
      next: (data) => {
        console.log('Customer API response:', data);
        this.customers = data;
        this.loading = false;
        console.log('Customers assigned:', this.customers);
      },
      error: (error) => {
        console.error('List API failed:', error);
        this.errorMessage = 'Unable to load customers.';
        this.loading = false;
      }
    });
  }

  saveCustomer(form: NgForm): void {
    if (form.invalid || this.saving) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.message = '';
    this.errorMessage = '';

    const payload: Customer = {
      ...this.customer,
      dob: this.formatDate(this.customer.dob)
    };

    this.customerService.saveCustomer(payload).subscribe({
      next: () => {
        this.message = 'Customer saved successfully!';
        this.customer = this.emptyCustomer();
        form.resetForm(this.customer);
        this.saving = false;
        this.loadCustomers();
      },
      error: (error) => {
        console.error('Save API failed:', error);
        this.errorMessage =
          error.error?.message ?? 'Unable to save customer.';
        this.saving = false;
      }
    });
  }

  private formatDate(date: string): string {
    if (!date) return date;

    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }

  clearForm(form: NgForm): void {
    this.customer = this.emptyCustomer();
    form.resetForm(this.customer);
    this.message = '';
    this.errorMessage = '';
  }
}