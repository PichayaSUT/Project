import { DeleteFilled, SearchOutlined } from "@ant-design/icons";
import { Input, InputNumber, Space, Table, Row, Col, Button, Popconfirm, PageHeader } from "antd";
import Item from "antd/lib/list/Item";
import React, { Key } from "react";
import { useState } from "react";
import { API, DataType, SaleProductInterface } from "./InterfaceSaleProducts";
import { callAPI } from "./API";
const Sale_table = () => {
	const [barcode, setBarcode] = useState('');
	const [dataTable, setDataTable] = useState<any>([]);
	const [count, setCount] = useState(1);
	const [total, setTotal] = useState<number>(0);
	const [valuePercent, setValuePersent] = useState<number>(0);
	const [valueBath, setValueBath] = useState<number>(0);
	const [totalAll, setTotalAll] = useState<number>(0);
	const fetchData : API = {
		path : 'products/',
		url : 'http://localhost:8000/api/',
		requestOptions : {
			method : "GET",
			headers: {
				"Content-Type": "application/json"
			},
		},
		id : '',
	}
	const handleDelete = (key: React.Key) => {
		setDataTable(dataTable.filter((item: { key: React.Key; }) => item.key != key));
	};

	const ChangeNumber = (value: number, key: any) => {
		let newData = {
			key: key,
			barcode: dataTable[key - 1].barcode,
			name: dataTable[key - 1].name,
			price_for_piece: dataTable[key - 1].price_for_piece,
			price_sell: dataTable[key - 1].price_for_piece * value,
		}
		let newItem = [...dataTable];
		newItem[key - 1] = newData;
		setDataTable(newItem);
	}
	const Discount = (value: number) => {
		setValuePersent((value / total) * 100);
		setValueBath(value);
		setTotalAll(total - valueBath)
	}
	const DiscountPercent = (value: number) => {
		setValueBath((value * total) / 100);
		setValuePersent(value);
		setTotalAll(total - valueBath)
	}
	const scanBarcode = async () => {
		fetchData.id = barcode;
		//const res = await callAPI(fetchData);
		//console.log(res);
		
				/* if (res) {
					let newData: DataType = {
						key: count,
						barcode: res.id,
						name: res.name,
						price_for_piece: res.price_sell,
						price_sell: res.price_sell,
					} */
	};

	const columns = [

		{
			title: 'รหัสสินค้า',
			dataIndex: 'barcode',

		},
		{
			title: 'สินค้า',
			dataIndex: 'name',

		},
		{
			title: 'จำนวน',
			dataIndex: 'Amount',
			render: (_: any, record: { key: React.Key }) => (
				<Space size="middle">
					<InputNumber min={1} max={99} defaultValue={1} onChange={event => ChangeNumber(event, record.key)} style={{ width: 60 }} />
				</Space>
			),
		},
		{
			title: 'ราคาต่อหน่วย(บาท)',
			dataIndex: 'price_for_piece',

		},
		{
			title: 'ราคา(บาท)',
			dataIndex: 'price_sell',
			key: 'price_sell',

		},
		{
			title: 'operation',
			dataIndex: 'operation',

			render: (_: any, record: { key: React.Key }) => (
				<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
					<a>Delete</a>
				</Popconfirm>
			)
		},
	];
	return (
		<Row>
			<Col>
				<Input placeholder="รหัสสินค้า" size="large" value={barcode} onChange={event => setBarcode(event.target.value)} />
			</Col>
			<Col >
				<Button icon={<SearchOutlined />} type={"primary"} onClick={scanBarcode} size="large" >Search</Button>
			</Col>
			<Col>
				<Table
					columns={columns}
					dataSource={dataTable}
					pagination={false}
					summary={() => {
						let total = 0;

						for (let i in dataTable) {
							console.log(dataTable[i].price_sell);
							total += dataTable[i].price_sell;
						}
						setTotal(total);
						return (
							<>
								<Table.Summary.Row>
									<Table.Summary.Cell colSpan={4} index={1}>
										ยอดรวม
									</Table.Summary.Cell>
									<Table.Summary.Cell index={2}>
										{total}
									</Table.Summary.Cell>
									<Table.Summary.Cell index={3}>
										บาท
									</Table.Summary.Cell>
								</Table.Summary.Row>
								<Table.Summary.Row>
									<Table.Summary.Cell colSpan={4} index={1}>
										ส่วนลด
									</Table.Summary.Cell>
									<Table.Summary.Cell index={2}>
										<InputNumber
											defaultValue={0}
											value={valueBath}
											min={0}
											max={total}
											formatter={value => ` ${value} บาท`}
											onChange={Discount}
										/>
										<InputNumber
											min={0}
											value={valuePercent}
											max={100}
											formatter={value => `${value} %`}
											onChange={DiscountPercent}
										/>
									</Table.Summary.Cell>
									<Table.Summary.Cell index={3}>
										บาท
									</Table.Summary.Cell>
								</Table.Summary.Row>
								<Table.Summary.Row>
									<Table.Summary.Cell colSpan={4} index={1}>
										ยอดรวมทั้งหมด
									</Table.Summary.Cell>
									<Table.Summary.Cell index={2}>
										{totalAll}
									</Table.Summary.Cell>
									<Table.Summary.Cell index={3}>
										บาท
									</Table.Summary.Cell>
								</Table.Summary.Row>
							</>
						);
					}}
				/>
			</Col>

		</Row>

	)
}

export default Sale_table;