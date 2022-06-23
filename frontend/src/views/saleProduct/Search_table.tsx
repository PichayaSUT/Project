import { useEffect, useState } from "react";
import { SaleProductInterface } from "./InterfaceSaleProducts"
import { AutoComplete, Button, Col, Divider, Input, Radio, Row, SelectProps, Table } from "antd";
import { DashboardFilled, SearchOutlined } from "@ant-design/icons";

export function Search_table(){
	const [data , setData] = useState<SaleProductInterface[]>([]);
	const [value , setValue] = useState('');
	const [options, setOptions] = useState<SelectProps<object>['options']>([]);
	const [searchButton, setSearchButton] = useState(0);
	
	const handleSearch = (value: string) => {
		setOptions(value ? searchResult(value) : []);
		setValue(value);		
	};
	const changeButtonToState1 = () => {
		setSearchButton(1);
	}
	const changeButtonToState2 = () => {
		setSearchButton(2);
	}
	const changeButtonToState0 = () => {
		setSearchButton(0);
	}
	const onSelect = (value: string) => {
		console.log('onSelect', value);
		setValue(value)
	};
	const search_data_from_id = () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		};
		
		fetch(`http://localhost:8000/api/products/${value}`, requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if(res){
					setData(res);
					console.log(data);
				}else{
					console.log("id not found");
					
				}	
			});
	};
	const searchResult = (query: string) =>
  	new Array(5)
   .join('.')
   .split('.')
   .map((_, idx) => {
		const category = `${query}${idx}`;
		return {
	  value: category,
	  label: (
		<div
		 style={{
		   display: 'flex',
		   justifyContent: 'space-between',
		 }}
		>
		 <span>
		  	{' '}
		  	<a
		  	 href={`https://s.taobao.com/search?q=${query}`}
		  	 target="_blank"
		  	 rel="noopener noreferrer"
		  	>
		  	 {category}
		  	</a>
		 </span>
		 <span>{getRandomInt(200, 100)} results</span>
		</div>
	  ),
	 };
   });

	function getRandomInt(max: number, min: number = 0) {
		return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
	};

	

	const columns = [
		{
			title: "รหัสสินค้า",
			dataIndex : "id",
			key : "id",
		},
		{
			title: "ชื่อสินค้า",
			dataIndex : "name",
			key : "name",
		},
		{
			title: "ราคา",
			dataIndex : "price_sell",
			key : "price_sell",
		},
		{
			title: "limit_amount",
			dataIndex : "limit_amount",
			key : "limit_amount",
		},
		{
			title: "จำนวนที่มี",
			dataIndex : "amount",
			key : "amount",
		},
		{
			title: "สถานะ",
			dataIndex : "status",
			key : "status",
		},

	];

	return(
		<div>
			<Row gutter = {[10,15]}>
				<Col span={24} >
					<Radio.Group defaultValue="a" buttonStyle="solid" size="middle">
						<Radio.Button value="a" onClick={changeButtonToState0}>ค้นหาด้วยรหัสสินค้า</Radio.Button>
						<Radio.Button value="b" onClick={changeButtonToState1}>ค้นหาด้วยรหัสชิ้นส่วน</Radio.Button>
						<Radio.Button value="c" onClick={changeButtonToState2}>ค้นหาด้วยชื่อสินค้า</Radio.Button>
					</Radio.Group>	
				</Col>
				<Col span = {13}>
					{searchButton == 0 && (
						<AutoComplete
						options={options}
						dropdownMatchSelectWidth={252}
						style={{ width: 350}}
						size="large"
						onSelect={onSelect}
						onSearch={handleSearch}
						placeholder="ค้นหารหัสสินค้า"
						/>   
					)}
					{searchButton == 1 && (
						<AutoComplete
						options={options}
						dropdownMatchSelectWidth={252}
						style={{ width: 350}}
						size="large"
						onSelect={onSelect}
						onSearch={handleSearch}
						placeholder="ค้นหารหัสชิ้นส่วน"
						/>   
					)}
					{searchButton == 2 && (
						<AutoComplete
						dropdownMatchSelectWidth={252}
						style={{ width: 350}}
						size="large"
						options={options}
						onSelect={onSelect}
						onSearch={handleSearch}
						placeholder = "ค้นหาชื่อสินค้า"
						/>   
					)}
				
				</Col>
				<Col span = {6}>
					<Button icon={<SearchOutlined />} type={"primary"} onClick={search_data_from_id} size="large" >Search</Button>
				</Col>
				<Col span = {24}>
					<Table  dataSource={[data]} columns = {columns} pagination={false}/>
				</Col>
				
			</Row>	
		</div>
	)
}

