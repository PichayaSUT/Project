
export interface SaleProductInterface {
  ID: number,
  Name: string,
  Price_sell: number,
  Limite_amount: number,
  Amount: number,
  Status: string,

}
export interface DataType {
  key: React.Key,
  barcode: number,
  name: string,
  quantity: number,
  price_for_piece: number,
  price_sell: number,
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

export interface TableMain extends Array<DataType>{}