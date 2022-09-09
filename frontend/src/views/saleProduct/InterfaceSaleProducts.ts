export interface Payment {
  paymentId?: string,
  total?: number,
  discount?: number,
  receive?: number,
  paymentType?: string,
  paymentStatus?: string,
  paymentPath?: string,
  customerPhone?: string,
  employeeEmail?: string
}

export interface PaymentJson {
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

export interface SearchCustomer {
  id: number,
  phoneNumber: string,
  firstName: string,
  lastName: string,
  debt: number,
  credit: number
}
export interface SearchProduct {
  key: React.Key,
  barcode: string,
  name: string,
  priceSell: number,
  amount: number,
  status: string,
}
export interface DataType {
  key: React.Key,
  barcode: string,
  name: string,
  quantity: number,
  priceForPrice: number,
  priceSell: number,
}

export interface Discount {
  total: number,
  totalAll: number,
  valueBath: number,
  valuePercent: number,
}

export interface SellList {
  sellList: DataType[]
}

export interface API {
  path: string,
  url: string,
  requestOptions: {
    method: "POST" | "GET" | "DELETE" | "UPDATE",
    headers: {
      "Content-Type": "application/json"
    }
  },
  id: string,
}
export interface ApiWithBody {
  path: string,
  url: string,
  requestOptions: {
    method: "POST" | "GET" | "DELETE" | "UPDATE",
    headers: {
      "Content-Type": "application/json"
    },
    body: string
  },
  id: string,
}
export interface TableSearch extends Array<SearchProduct> { }
export interface TableMain extends Array<DataType> { }