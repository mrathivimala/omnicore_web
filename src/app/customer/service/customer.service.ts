import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    private baseUrl = 'http://localhost:8080/customer';
    private http = inject(HttpClient)

    saveCustomer(customer:Customer):Observable<Customer>{
        return this.http.post<Customer>(this.baseUrl+"/save_customer",customer);
    }

    getCustomer():Observable<Customer[]>{
        return this.http.get<Customer[]>(this.baseUrl+"/list");
    }

}
