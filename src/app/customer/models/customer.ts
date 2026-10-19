export interface Customer {
  id?: number;
  customerCode: string;
  customerName: string;
  customerGender: string;
  dob: string;
  age: number | null;
  address: string;
  city: string;
  state: string;
  country: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  createdAt?: string;
  updatedAt?: string;
}