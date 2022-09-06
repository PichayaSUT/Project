export interface PaymentInterface {
  id?: string;
  discount?: number;
  total?: number;
  receive?: number;
  payment_type?: string;
  status?: string;
  payment_path?: string;
  employee?: number;
  customer_phone_number?: string;
}