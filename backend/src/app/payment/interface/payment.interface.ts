export interface PaymentInterface {
  paymentId: string,
  customer: { name: string, phone: string },
  employee: { name: string, email: string },
  list: DataType[],
  total: number,
  discount: number,
  receive: number,
  paymentType: string,
  paymentStatus: string
}

export interface DataType {
  key: number,
  barcode: string,
  name: string,
  quantity: number,
  priceForPrice: number,
  priceSell: number,
}