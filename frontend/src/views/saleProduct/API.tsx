import { API, DataType, searchProduct, TableSeach } from "./InterfaceSaleProducts";

export async function productID(api: API, count: number): Promise<DataType> {
	return new Promise<DataType>(async (resolve, rejects) => {
		try {
			const response = await fetch(`${api.url}${api.path}${api.id}`, api.requestOptions)
			const data = await response.json()
			const dataTemp: DataType = {
				key: count,
				barcode: data.id,
				name: data.name,
				quantity: 1,
				priceForPrice: data.price_sell,
				priceSell: data.price_sell,
			}
			return resolve(dataTemp)
		} catch (error) {
			return rejects(error)
		}
	})
}

export async function searchFromID(api: API): Promise<TableSeach> {
	return new Promise<TableSeach>(async (resolve, reject) => {
		try {
			const response = await fetch(`${api.url}${api.path}${api.id}`, api.requestOptions)
			const data = await response.json()
			const dataTemp: searchProduct = {
				key: 1,
				barcode: data.id,
				name: data.name,
				amount: data.amount,
				priceSell: data.price_sell,
				status: data.status
			}
			return resolve([dataTemp])
		} catch (error) {
			return reject(error)
		}
	})
}

/* export async function callAPI(api: API){
	if (true) {
		fetch(`${api.url}${api.path}${api.id}`, api.requestOptions)
			.then((response) => response.json())
			.then((res:DataType) => {   
				if (res) {
					console.log(res);
					return res;
				} else {
					console.log("id not found");
				}
			});
	}
} */