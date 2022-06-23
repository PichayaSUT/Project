import { useState } from "react";
import { API, DataType } from "./InterfaceSaleProducts";

export async function callAPI(api: API, count: number): Promise<any> {
	if (api.path === 'products/') {
		const response = await fetch(`${api.url}${api.path}${api.id}`, api.requestOptions)
		const data = await response.json()
		const dataTemp: DataType = {
			key: count,
			barcode: data.id,
			name: data.name,
			quantity: 1,
			price_for_piece: data.price_sell,
			price_sell: data.price_sell,
		}
		return dataTemp
	}
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