import React, { Component, useState } from 'react';
import { Card, Drawer, message, Result, Statistic, Steps, Image, InputNumber, SelectProps, Popconfirm } from 'antd';
import { Input, Table, Tag, Space, Row, Col, Radio, Divider, Button, Modal, AutoComplete } from 'antd';
import { CalendarOutlined, DeleteFilled, PlusOutlined, PrinterOutlined, SearchOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { API, DataType, Discount, SaleProductInterface, TableMain } from './InterfaceSaleProducts';
import Sale_table from './sale_table';
import { callAPI } from './API';

//--------------------------------------------------------------------------------------------------------
const D = new Date()
const date = D.getDate()
const month = D.getMonth() + 1
const year = D.getFullYear()
const timeHours = D.getUTCHours() + 7
const timeMin = D.getMinutes()
const { Step } = Steps;

//--------------------------------------------------------------------------------------------------------


const columnsSearch = [
	{
		title: "รหัสสินค้า",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "ชื่อสินค้า",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "ราคา",
		dataIndex: "price_sell",
		key: "price_sell",
	},
	{
		title: "limit_amount",
		dataIndex: "limit_amount",
		key: "limit_amount",
	},
	{
		title: "จำนวนที่มี",
		dataIndex: "amount",
		key: "amount",
	},
	{
		title: "สถานะ",
		dataIndex: "status",
		key: "status",
	},

];
//--------------------------------------------------------------------------------------------------------
const columnsTotal = [
	{
		title: 'ลำดับ',
		dataIndex: 'List',

	},
	{
		title: 'สินค้า',
		dataIndex: 'Product',

	},
	{
		title: 'จำนวน',
		dataIndex: 'Amount',

	},
	{
		title: 'ราคาต่อหน่วย(บาท)',
		dataIndex: 'PriceForPiece',

	},
	{
		title: 'ส่วนลด',
		dataIndex: 'Discount',

	},
	{
		title: 'ราคา(บาท)',
		dataIndex: 'Price',
	},

];
//--------------------------------------------------------------------------------------------------------
const steps = [
	{
		title: 'ตรวจสอบรายการ',
		content: <>
			<div>
				<Table
					size='small'
					columns={columnsTotal}
					dataSource={[]}
					pagination={false}
					style={{ width: 900 }}
					title={() => <p style={{ fontSize: 15, textAlign: 'center' }}>รายการสินค้า</p>}
					summary={pageData => {
						let total = 0;

						pageData.forEach(({ Price }) => {
							total = total + Price;
						});

						return (<>
							<Table.Summary.Row style={{ textAlign: 'right' }}>
								<Table.Summary.Cell index={0}></Table.Summary.Cell>
								<Table.Summary.Cell index={1}></Table.Summary.Cell>
								<Table.Summary.Cell index={2}></Table.Summary.Cell>
								<Table.Summary.Cell index={3}><p style={{ fontSize: 20 }}>ราคารวมทั้งสิ้น </p></Table.Summary.Cell>
								<Table.Summary.Cell index={4}><p style={{ color: 'red', fontSize: 20 }}>{total}</p></Table.Summary.Cell>
								<Table.Summary.Cell index={4}><p style={{ fontSize: 20 }}>บาท</p></Table.Summary.Cell>

							</Table.Summary.Row>
						</>);

					}}
				/>


			</div>
		</>,
	},

	{
		title: 'คิดเงิน',
		content: <>
			<Row gutter={[0, 16]} >
				<Card style={{ width: 600 }}>
					<Divider orientation='right' style={{ fontSize: 20 }}>ยอดรวม</Divider>
					<Statistic
						value={"400"}
						precision={1}
						valueStyle={{ color: '#3f8600', fontSize: 40, textAlign: 'center', }}
						suffix="บาท"
					/>
				</Card>
			</Row>
			<Row gutter={[0, 16]}>
				<Card style={{ width: 600 }}>
					<Divider orientation='right' style={{ fontSize: 20 }}>รับเงิน</Divider>
					<Input placeholder="รับเงิน" style={{ height: 40 }} />
				</Card>
			</Row>
		</>,
	},

	{
		title: 'เงินโอน',
		content: <>
			<Image
				width={200}
				src="QRcode"
			/>
		</>,
	},

	{
		title: 'จ่ายเงินเชื่อ',
		content: <>
			<Row gutter={[0, 16]} >
				<Card style={{ width: 600 }}>
					<Divider orientation='right' style={{ fontSize: 20 }}>ยอดค้างชำระ</Divider>
					<Statistic
						value={"0"}
						precision={1}
						valueStyle={{ color: '#3f8600', fontSize: 40, textAlign: 'center', }}
						suffix="บาท"
					/>
				</Card>
			</Row>
			<Row gutter={[0, 16]}>
				<Card style={{ width: 600 }}>
					<Divider orientation='right' style={{ fontSize: 20 }}>ยอดบิลล่าสุด</Divider>
					<Statistic
						value={"400"}
						precision={1}
						valueStyle={{ color: '#3f8600', fontSize: 40, textAlign: 'center', }}
						suffix="บาท"
					/>
				</Card>
			</Row>
			<Row gutter={[0, 16]}>
				<Card style={{ width: 600 }}>
					<Divider orientation='right' style={{ fontSize: 20 }}>ยอดค้างชำระรวม</Divider>
					<Statistic
						value={"400"}
						precision={1}
						valueStyle={{ color: '#3f8600', fontSize: 40, textAlign: 'center', }}
						suffix="บาท"
					/>
				</Card>
			</Row>
		</>,
	},
];
//--------------------------------------------------------------------------------------------------------
const SaleProduct = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisible2, setIsModalVisible2] = useState(false);
	const [isModalResult, setIsModalResult] = useState(false);
	const [isModalResult2, setIsModalResult2] = useState(false);
	const [isModalNewItem, setIsModalNewItem] = useState(false);
	const [current, setCurrent] = React.useState(0);
	const [Bill, setBill] = React.useState(1);
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<SaleProductInterface[]>([]);
	const [barcodeSearch, setBarcodeSearch] = useState('');
	const [options, setOptions] = useState<SelectProps<object>['options']>([]);
	const [searchButton, setSearchButton] = useState(0);
	const [barcode, setBarcode] = useState<string>('');
	const [dataTable, setDataTable] = useState<TableMain>([]);
	const [count, setCount] = useState(1);
	const [total, setTotal] = useState<number>(0);
	const [valuePercent, setValuePercent] = useState<number>(0);
	const [valueBath, setValueBath] = useState<number>(0);
	const [totalAll, setTotalAll] = useState<number>(0);
	const fetchData: API = {
		path: '',
		url: 'http://localhost:8000/api/',
		requestOptions: {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		},
		id: '',
	}
	const discount: Discount = {
		total: 0,
		totalAll: 0,
		valueBath: 0,
		valuePercent: 0,
	}

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
			dataIndex: 'quantity',
			key: 'quantity',
			render: (_: any, record: { key: React.Key }) => (
				<Space size="middle">
					<InputNumber min={1} max={99} defaultValue = {dataTable[0].quantity} onChange={event => ChangeNumber(event, record.key)} style={{ width: 60 }} />
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

	const handleDelete = (key: React.Key) => {
		setDataTable(dataTable.filter((item: { key: React.Key; }) => item.key != key));
	};

	const ChangeNumber = (value: number, key: any) => {
		let newData: DataType = {
			key: key,
			barcode: dataTable[key - 1].barcode,
			name: dataTable[key - 1].name,
			quantity: dataTable[key - 1].quantity,
			price_for_piece: dataTable[key - 1].price_for_piece,
			price_sell: dataTable[key - 1].price_for_piece * value,
		}
		let newItem = [...dataTable];
		newItem[key - 1] = newData;
		setDataTable(newItem);
	}
	const Discount = (value: number) => {
		discount.valueBath = value
		discount.totalAll = total - discount.valueBath
		setValueBath(discount.valueBath);
		setValuePercent((discount.valueBath / total) * 100);
		setTotalAll(discount.totalAll)
	}
	const DiscountPercent = (value: number) => {
		discount.valueBath = (value * total) / 100
		discount.totalAll = total - discount.valueBath
		setValueBath(discount.valueBath);
		setValuePercent(value);
		setTotalAll(discount.totalAll)
	}
	const scanBarcode = async () => {
		fetchData.path = 'products/'
		fetchData.id = barcode
		if (barcode === undefined || barcode === '') {
			console.log('input is null');
		} else {
			const res: DataType = await callAPI(fetchData, count);
			setDataTable([...dataTable, res])
			setCount(count + 1)
		}
	};
	const showDrawer = () => {
		setVisible(true);
	};
	const onCloseDrawer = () => {
		setVisible(false);
	};

	const next = () => {
		setCurrent(1);
	};

	const QRcode = () => {
		setCurrent(2);
	};

	const prev = () => {
		setCurrent(0);
	};

	const next2 = () => {
		setCurrent(3);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const showModal2 = () => {
		setIsModalVisible2(true);
	};
	const handleCancel2 = () => {
		setIsModalVisible2(false);
	};
	const showModalNewItem = () => {
		setIsModalNewItem(true);
	};
	const closeModalNewItem = () => {
		setIsModalNewItem(false);
	};

	const showModalResult = () => {
		setCurrent(0);
		setIsModalResult(true);
		setIsModalVisible(false);
	}
	const showModalResult2 = () => {
		setCurrent(0);
		setIsModalResult2(true);
		setIsModalVisible2(false);
	}

	const handleOkResult = () => {
		setIsModalResult(false);
		setIsModalResult2(false);
	}

	const handleCancelResult = () => {
		setIsModalResult(false);
		setIsModalResult2(false);
	}

	const successNewItem = () => {
		message.success('เพิ่มสินค้าสำเร็จ');
	}
	const changeBill1 = () => {
		setBill(1);
	}
	const changeBill2 = () => {
		setBill(2);
	}

	const handleSearch = (value: string) => {
		setOptions(value ? searchResult(value) : []);
		setBarcodeSearch(value);
	}
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
		setBarcodeSearch(value)
	};
	const search_data_from_id = () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		};

		fetch(`http://localhost:8000/api/products/${barcodeSearch}`, requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res) {
					setData(res);
				} else {
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

	return (
		<div className="body-page">

			<h2>วันที่และเวลา {date}/{month}/{year}  {timeHours}:{timeMin} น.</h2>
			<Row gutter={20}>
				<Col span={6}>
					<Divider orientation="left" >
						รหัสสมาชิก
					</Divider>
					<Input placeholder="รหัสสมาชิก" />
				</Col>
				<Col span={6}>
					<Divider orientation="left" >
						ชื่อสมาชิก
					</Divider>
					<Input placeholder="ชื่อสมาชิก" />
				</Col>
				<Col>
					<Divider orientation="left" orientationMargin="0">
						เลือกชนิดของบิล
					</Divider>
					<Radio.Group defaultValue="a" buttonStyle="solid">
						<Radio.Button value="a" onClick={changeBill1}>บิลเงินสด</Radio.Button>
						<Radio.Button value="b" onClick={changeBill2}>บิลเงินเชื่อ</Radio.Button>
					</Radio.Group>
				</Col>

			</Row>
			<Row align='bottom' gutter={20}>
				<Col span={6}>
					<Divider orientation="left" >รหัสสินค้า</Divider>
					<Input placeholder="รหัสสินค้า" size="large" value={barcode} onChange={event => setBarcode(event.target.value)} onPressEnter={scanBarcode} />
				</Col>
				<Col push={5}>
					<Button shape='round' icon={<SearchOutlined />} size='large' onClick={showDrawer}>ค้นหาสินค้า</Button>
				</Col>
				<Col push={5}>
					<Button shape='round' type='primary' size='large' onClick={showModalNewItem}>
						+ เพิ่มสินค้าใหม่
					</Button>
				</Col>
			</Row>
			<Row gutter={[10, 10]}>
				<Divider orientation="left" >รายการสินค้า</Divider>
				<Table
					columns={columns}
					dataSource={dataTable}
					pagination={false}
					summary={() => {
						let total = 0;
						for (let i in dataTable) {
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
				<Col span={8}></Col>
				<Col span={8}></Col>
				<Col>
					{Bill === 1 && (
						<Button type="primary" style={{ width: 200, height: 70 }} onClick={showModal}><p style={{ fontSize: 30 }}>ชำระเงินสด</p></Button>
					)}
					{Bill === 2 && (
						<Button type="primary" style={{ width: 200, height: 70 }} onClick={showModal2}><p style={{ fontSize: 30 }}>ชำระเงินเชื่อ</p></Button>
					)}

				</Col>
			</Row>

			<Modal visible={isModalVisible} width={800} footer={[]} onCancel={handleCancel}>
				<Divider style={{ fontSize: 30 }}>บิลเงินสด</Divider>
				<Row gutter={[10, 10]}>
					<Col span={1}>
						<SnippetsOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>เลขที่ใบเสร็จ : RB12345678</p>
					</Col>
				</Row>
				<Row gutter={[0, 10]}>
					<Col span={1}>
						<CalendarOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>วันที่ : {date}/{month}/{year}</p>
					</Col>
				</Row>
				<Row gutter={[0, 10]}>
					<Col span={1}>
						<UserOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>ชื่อสมาชิก : นายสมเกียรติ</p>
					</Col>
				</Row>
				<Row>
					<Col span={20} push={1}><div className="steps-content">{steps[current].content}</div> </Col>
				</Row>
				<Row justify='end'>
					<div className="steps-action">
						<Space>
							{current === 0 && (
								<Button type="primary" onClick={() => next()}>
									ชำระเงินสด
								</Button>
							)}
							{current === 0 && (
								<Button type="primary" onClick={() => QRcode()}>
									ชำระเงินโอน
								</Button>
							)}
							{current > 0 && (
								<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
									ย้อนกลับ
								</Button>
							)}
							{current > 0 && (
								<Button type="primary" onClick={(showModalResult)}>
									ชำระเงิน
								</Button>
							)}
						</Space>
					</div>
				</Row>
			</Modal>
			<Modal visible={isModalResult} width={800} footer={[]} onCancel={handleCancelResult}>
				<Result
					status="success"
					title="ชำระเงินเสร็จสิ้น เงินทอน.....บาท"

					extra={[
						<Button type="primary" key="console" onClick={(handleOkResult)}>
							ปริ้นใบเสร็จ
						</Button>,
						<Button key="buy" onClick={(handleOkResult)} >ไม่ปริ้นใบเสร็จ</Button>,
					]}
				/>
			</Modal>

			<Modal visible={isModalVisible2} width={800} footer={[]} onCancel={handleCancel2}>
				<Divider style={{ fontSize: 30 }}>บิลเงินเชื่อ</Divider>
				<Row gutter={[0, 10]}>
					<Col span={1}>
						<SnippetsOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>เลขที่ใบเสร็จ : RB12345678</p>
					</Col>
				</Row>
				<Row gutter={[0, 10]}>
					<Col span={1}>
						<CalendarOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>วันที่ : {date}/{month}/{year}</p>
					</Col>
				</Row>
				<Row gutter={[0, 10]}>
					<Col span={1}>
						<UserOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>ชื่อสมาชิก : นายสมเกียรติ</p>
					</Col>
				</Row>
				<Row>
					<Col span={20} push={1}><div className="steps-content">{steps[current].content}</div> </Col>
				</Row>
				<Row justify='end'>
					<div className="steps-action">
						<Space>
							{current === 0 && (
								<Button type="primary" onClick={() => next2()}>
									ถัดไป
								</Button>
							)}
							{current > 0 && (
								<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
									ย้อนกลับ
								</Button>
							)}
							{current === 3 && (
								<Button type="primary" onClick={(showModalResult2)}>
									ออกใบส่งของ
								</Button>
							)}
						</Space>
					</div>
				</Row>
			</Modal>

			<Modal visible={isModalResult} width={800} footer={[]} onCancel={handleCancelResult}>
				<Result
					status="success"
					title="ชำระเงินเสร็จสิ้น"

					extra={[
						<Button type="primary" key="console" onClick={(handleOkResult)}>
							ปริ้นใบเสร็จ
						</Button>,
						<Button key="buy" onClick={(handleOkResult)} >ไม่ปริ้นใบเสร็จ</Button>,
					]}
				/>
			</Modal>

			<Modal visible={isModalResult2} width={800} footer={[]} onCancel={handleCancelResult}>
				<Result
					icon={<PrinterOutlined />}
					title="การซื้อขายเสร็จสิ้น"
					extra={[
						<Button type="primary" key="console" onClick={(handleOkResult)}>เสร็จสิ้น</Button>,
					]}
				/>
			</Modal>

			<Modal visible={isModalNewItem} width={1000} footer={[]} onCancel={closeModalNewItem} title="เพิ่มสินค้าใหม่">
				<div>
					<Row gutter={[5, 10]}>
						<Col span={6}><Divider orientation='left'>ชื่อสินค้า</Divider></Col>
						<Col span={6}><Divider orientation='left'>ราคาสินค้า</Divider></Col>
					</Row>
					<Row gutter={[5, 10]}>
						<Col span={6}><Input placeholder="ชื่อสินค้า" style={{ height: 40 }} /></Col>
						<Col span={6}><Input placeholder="ราคาของสินค้า" style={{ height: 40 }} /></Col>
						<Col><Button icon={<PlusOutlined />} style={{ height: 40 }} type='primary' onClick={successNewItem}>เพิ่มสินค้า</Button></Col>
					</Row>
				</div>
			</Modal>



			<Drawer size='large' placement="right" onClose={onCloseDrawer} visible={visible}>

				<Row gutter={[10, 15]}>
					<Col span={24} >
						<Radio.Group defaultValue="a" buttonStyle="solid" size="middle">
							<Radio.Button value="a" onClick={changeButtonToState0}>ค้นหาด้วยรหัสสินค้า</Radio.Button>
							<Radio.Button value="b" onClick={changeButtonToState1}>ค้นหาด้วยรหัสชิ้นส่วน</Radio.Button>
							<Radio.Button value="c" onClick={changeButtonToState2}>ค้นหาด้วยชื่อสินค้า</Radio.Button>
						</Radio.Group>
					</Col>
					<Col span={13}>
						{searchButton == 0 && (
							<AutoComplete
								options={options}
								dropdownMatchSelectWidth={252}
								style={{ width: 350 }}
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
								style={{ width: 350 }}
								size="large"
								onSelect={onSelect}
								onSearch={handleSearch}
								placeholder="ค้นหารหัสชิ้นส่วน"
							/>
						)}
						{searchButton == 2 && (
							<AutoComplete
								dropdownMatchSelectWidth={252}
								style={{ width: 350 }}
								size="large"
								options={options}
								onSelect={onSelect}
								onSearch={handleSearch}
								placeholder="ค้นหาชื่อสินค้า"
							/>
						)}

					</Col>
					<Col span={6}>
						<Button icon={<SearchOutlined />} type={"primary"} onClick={search_data_from_id} size="large" >Search</Button>
					</Col>
					<Col span={24}>
						<Table dataSource={[data]} columns={columnsSearch} pagination={false} />
					</Col>
					<Sale_table />
				</Row>
			</Drawer>

		</div>

	);
};
//--------------------------------------------------------------------------------------------------------

export default SaleProduct;
