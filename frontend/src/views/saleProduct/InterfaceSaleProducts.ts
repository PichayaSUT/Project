import { Table } from 'antd';

export interface searchProduct {
  key: React.Key,
  barcode: number,
  name: string,
  priceSell: number,
  amount: number,
  status: string,
}
export interface DataType {
  key: React.Key,
  barcode: number,
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
    },
  },
  id: string,
}
export interface TableSeach extends Array<searchProduct>{}
export interface TableMain extends Array<DataType>{}