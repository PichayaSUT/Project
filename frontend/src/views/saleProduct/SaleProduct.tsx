import React, { useEffect, useState } from 'react'
import { Card, Drawer, message, Result, Statistic, Image, InputNumber, SelectProps, Popconfirm } from 'antd'
import { Input, Table, Space, Row, Col, Radio, Divider, Button, Modal, AutoComplete } from 'antd'
import { ApiFilled, CalendarOutlined, PlusOutlined, PrinterOutlined, SearchOutlined, ShoppingCartOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons'
import { API, ApiWithBody, DataType, Discount, PaymentJson, SearchCustomer, TableMain, TableSearch } from './InterfaceSaleProducts'
import { productID, savePaymentToDataBase, savePaymentToJson, searchCustomerPhone, searchFromBarcode, searchFromName } from './API'
import moment from 'moment'
import { uuidGen } from './tool'
//--------------------------------------------------------------------------------------------------------

const SaleProduct = () => {
	const [dateState, setDateState] = useState(moment().format("YYYY/MM/DD HH:mm:ss"))
	useEffect(() => {
		setInterval(() => setDateState(moment().format("YYYY/MM/DD HH:mm:ss")), 1000);
	}, []);
	const [receiveMoney, setReceiveMoney] = useState<number>(0)
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
	const [isModalVisible2, setIsModalVisible2] = useState<boolean>(false)
	const [isModalResult, setIsModalResult] = useState<boolean>(false)
	const [isModalResult2, setIsModalResult2] = useState<boolean>(false)
	const [isModalNewItem, setIsModalNewItem] = useState<boolean>(false)
	const [current, setCurrent] = useState<number>(0)
	const [bill, setBill] = useState<{ bill: number, credit: boolean }>({
		bill: 1,
		credit: true
	})
	const [visible, setVisible] = useState<boolean>(false)
	const [data, setData] = useState<TableSearch>([])
	const [barcode, setBarcode] = useState<string>('')
	const [barcodeSearch, setBarcodeSearch] = useState<string>('')
	const [options, setOptions] = useState<SelectProps<object>['options']>([])
	const [searchButton, setSearchButton] = useState(0)
	const [dataTable, setDataTable] = useState<TableMain>([])
	const [count, setCount] = useState<number>(0)
	const [total, setTotal] = useState<number>(0)
	const [valuePercent, setValuePercent] = useState<number>(0)
	const [valueBath, setValueBath] = useState<number>(0)
	const [totalAll, setTotalAll] = useState<number>(0)
	const [customer, setCustomer] = useState<SearchCustomer>({
		id: 0,
		phoneNumber: "",
		firstName: "",
		lastName: "",
		debt: 0,
		credit: 0
	})
	const [payment, setPayment] = useState<PaymentJson>({
		paymentId: "",
		customer: { name: "", phone: "" },
		employee: { name: "", email: "" },
		list: [],
		total: 0,
		discount: 0,
		receive: 0,
		paymentType: "C",
		paymentStatus: "Y"
	})
	const fetchData: API = {
		path: '',
		url: 'http://localhost:8000/api/',
		requestOptions: {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		},
		id: '',
	}
	const fetchDataWithBody: ApiWithBody = {
		path: '',
		url: 'http://localhost:8000/api/',
		requestOptions: {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			body: ""
		},
		id: '',
	}
	const discount: Discount = {
		total: 0,
		totalAll: 0,
		valueBath: 0,
		valuePercent: 0,
	}

	//------------------------------------------------------------------------------------------------------------------------
	//--------------------------------------------------------------------------------------------------------
	const scanBarcode = async (barcode: string): Promise<void> => {
		fetchData.path = 'products/'
		fetchData.id = barcode
		try {
			if (barcode === undefined || barcode === '') {
				message.warning('ไม่มีรหัสสินค้า')
			} else {
				const res: DataType | void = await productID(fetchData, count)
				checkBarcode(res)
				setBarcode('')
				message.success('เพิ่มสินค้าสำเร็จ')
			}
		} catch (error) {
			message.error('ไม่พบสินค้า')
		}
	}

	const Quantity = (key: any): number => {
		if (dataTable.length === 0) {
			return 0
		} else {
			return dataTable[key].quantity
		}
	}

	const getAmount = (key: any): number => {
		return dataTable[key].amount
	}

	const ChangeNumber = (value: number, key: any): void => {
		let newData: DataType = {
			key: key,
			barcode: dataTable[key].barcode,
			name: dataTable[key].name,
			amount: dataTable[key].amount,
			quantity: value,
			priceForPrice: dataTable[key].priceForPrice,
			priceSell: dataTable[key].priceForPrice * value,
		}
		let newItem = [...dataTable]
		newItem[key] = newData
		setDataTable(newItem)
	}

	const receiveMoneys = (e: any): void => {
		setReceiveMoney(e.target.value)
	}

	const handleDelete = (key: React.Key) => {
		setDataTable(dataTable.filter((item: { key: React.Key }) => item.key !== key))
	}

	const Discount = (value: number): void => {
		discount.valueBath = Number(value.toFixed(2))
		discount.totalAll = Number((total - discount.valueBath).toFixed(0))
		setValueBath(discount.valueBath)
		setValuePercent(Number(((discount.valueBath / total) * 100).toFixed(2)))
		setTotalAll(discount.totalAll)
	}

	const DiscountPercent = (value: number): void => {
		discount.valueBath = Number(((value * total) / 100).toFixed(0))
		discount.totalAll = Number((total - discount.valueBath).toFixed(0))
		setValueBath(discount.valueBath)
		setValuePercent(value)
		setTotalAll(discount.totalAll)
	}

	const searchCustomer = async (value: string): Promise<void> => {
		fetchData.path = 'customer/'
		fetchData.id = value
		try {
			if (value === undefined || value === '') {
				message.warning('ไม่มีรหัสสมาชิก')
				return
			}
			const data: SearchCustomer = await searchCustomerPhone(fetchData)
			if (data) {
				setCustomer(data)
				setPayment({ ...payment, customer: { name: data.firstName, phone: data.phoneNumber } })
				setBill({
					...bill,
					bill: 1,
					credit: false
				})
			}
			console.log(payment);
		} catch (error) {
			message.warning('ไม่พบชื่อสมาชิก')
		}
	}

	const searchDataFromID = async (): Promise<void> => {
		if (searchButton === 0) {
			fetchData.path = 'products/'
			fetchData.id = barcodeSearch
			try {
				if (barcodeSearch === undefined || barcodeSearch === '') {
					throw ''
				}
				const response: TableSearch = await searchFromBarcode(fetchData)
				setData(response)
			} catch (error) {
				message.error('ไม่พบสินค้า')
			}
		} else if (searchButton === 1) {

		} else if (searchButton === 2) {
			fetchData.path = 'products/seachName/'
			fetchData.id = barcodeSearch
			try {
				if (barcodeSearch === undefined || barcodeSearch === '') {
					message.warning('ไม่มีรหัสสินค้า')
				}
				const response: TableSearch = await searchFromName(fetchData)
				setData(response)
			} catch (error) {
				message.error('ไม่พบสินค้า')
			}
		}
	}

	const addCart = async (key: any): Promise<void> => {
		console.log(data);
		const temp: DataType = {
			key: count,
			barcode: data[key].barcode,
			name: data[key].name,
			amount: data[key].amount,
			quantity: 1,
			priceForPrice: data[key].priceSell,
			priceSell: data[key].priceSell
		}

		console.log(temp);
		checkBarcode(temp)
	}

	const checkBarcode = (data: DataType): void => {
		for (let i = 0; i < dataTable.length; i++) {
			if (dataTable[i].barcode === data.barcode) {
				ChangeNumber(dataTable[i].quantity + 1, dataTable[i].key)
				return
			}
		}
		setDataTable([...dataTable, data])
		setCount(count + 1)
		return
	}
	//---------------------------------------------------------------------------------------------------------		
	const showDrawer = (): void => {
		setVisible(true)
	}
	const onCloseDrawer = (): void => {
		setVisible(false)
	}

	const next = (): void => {
		setCurrent(1)
	}

	const QRcode = (): void => {
		setCurrent(2)
	}

	const prev = (): void => {
		setCurrent(0)
	}

	const next2 = (): void => {
		setCurrent(3)
	}

	const showModal = (): void => {
		setIsModalVisible(true)
	}
	const handleCancel = (): void => {
		setIsModalVisible(false)
		setCurrent(0)
	}
	const showModal2 = (): void => {
		setIsModalVisible2(true)
	}
	const handleCancel2 = (): void => {
		setIsModalVisible2(false)
	}
	const showModalNewItem = (): void => {
		setIsModalNewItem(true)
	}
	const closeModalNewItem = (): void => {
		setIsModalNewItem(false)
	}

	const showModalResult = (): void => {
		if (totalAll > receiveMoney) {
			message.warning('เงินไม่พอชำระ', 0.7)
			return
		}
		savePayment()
		setCurrent(0)
		setIsModalResult(true)
		setIsModalVisible(false)
	}

	const savePayment = async (): Promise<void> => {
		try {
			const fileName = uuidGen()
			const newPayment: PaymentJson = {
				customer: payment.customer,
				employee: payment.employee,
				paymentId: fileName,
				list: dataTable,
				total: totalAll,
				discount: discount.valueBath,
				receive: receiveMoney,
				paymentStatus: payment.paymentStatus,
				paymentType: payment.paymentType
			}
			fetchDataWithBody.path = 'payment/savePayment'
			fetchDataWithBody.requestOptions.method = 'POST'
			fetchDataWithBody.requestOptions.body = JSON.stringify(newPayment)
			await savePaymentToDataBase(fetchDataWithBody)
			await savePaymentToJson(fetchDataWithBody)
		} catch (error) {
			console.log(error);
			message.error('ผิดพลาด')
		}
	}

	const showModalResult2 = (): void => {
		savePayment()
		setCurrent(0)
		setIsModalResult2(true)
		setIsModalVisible2(false)
	}

	const handleOkResult = (): void => {
		setIsModalResult(false)
		setIsModalResult2(false)
	}

	const handleCancelResult = (): void => {
		setIsModalResult(false)
		setIsModalResult2(false)
	}

	const successNewItem = (): void => {
		message.success('เพิ่มสินค้าสำเร็จ')
	}
	const changeBill1 = (): void => {
		setBill({
			...bill,
			bill: 1,
			credit: false
		})
		setPayment({
			...payment,
			paymentType: 'C'
		})
	}
	const changeBill2 = (): void => {
		setBill({
			...bill,
			bill: 2,
			credit: false
		})
		setPayment({
			...payment,
			paymentType: 'D',
			paymentStatus: 'N'
		})
	}

	const handleSearch = (value: string): void => {
		setBarcodeSearch(value)
	}
	const changeButtonToState1 = (): void => {
		setSearchButton(1)
	}
	const changeButtonToState2 = (): void => {
		setSearchButton(2)
	}
	const changeButtonToState0 = (): void => {
		setSearchButton(0)
	}
	const onSelect = (value: string): void => {
		setBarcodeSearch(value)
	}
	//-------------------------------------------------------------------------------------------------------------------------
	const columns = [

		{
			title: 'รหัสสินค้า',
			dataIndex: 'barcode',
			width: 40,

		},
		{
			title: 'สินค้า',
			dataIndex: 'name',
			width: 100,

		},
		{
			title: 'จำนวน',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (_: any, record: { key: React.Key }) => (
				<Space size="middle">
					<InputNumber
						min={1}
						max={getAmount(record.key)}
						value={Quantity(record.key)}
						defaultValue={1}
						onChange={event => ChangeNumber(event, record.key)}
						style={{ width: 60 }}
					/>
				</Space>
			),
			width: 20,
		},
		{
			title: 'ราคา:หน่วย',
			dataIndex: 'priceForPrice',
			width: 20,

		},
		{
			title: 'ราคา(บาท)',
			dataIndex: 'priceSell',
			key: 'priceSell',
			width: 50,

		},
		{
			title: 'operation',
			dataIndex: 'operation',
			width: 30,
			render: (_: any, record: { key: React.Key }) => (
				<Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
					<a>Delete</a>
				</Popconfirm>
			)
		},
	]
	//--------------------------------------------------------------------------------------------------------
	const columnsSearch = [
		{
			title: "รหัสสินค้า",
			dataIndex: "barcode",
			key: "barcode",
		},
		{
			title: "ชื่อสินค้า",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "ราคา",
			dataIndex: "priceSell",
			key: "priceSell",
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
		{
			title: "เพิ่มในตะกล้า",
			dataIndex: "เพิ่มในตะกล้า",
			render: (_: any, record: { key: React.Key }) => (
				<Button
					shape='round'
					type='primary'
					icon={<ShoppingCartOutlined />}
					style={{ width: 70, height: 35 }}
					onClick={() => addCart(record.key)}
				>
				</Button>
			)
		}

	]
	//--------------------------------------------------------------------------------------------------------
	const columnsTotal = [
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
		},
		{
			title: 'ราคาต่อหน่วย(บาท)',
			dataIndex: 'priceForPrice',

		},
		{
			title: 'ราคา(บาท)',
			dataIndex: 'priceSell',
			key: 'priceSell',
		},
	]
	//--------------------------------------------------------------------------------------------------------
	const steps = [
		{
			title: 'ตรวจสอบรายการ',
			content: <>
				<div>
					<Table
						size='small'
						columns={columnsTotal}
						dataSource={dataTable}
						pagination={false}
						style={{ width: 900 }}
						title={() => <p style={{ fontSize: 15, textAlign: 'center' }}>รายการสินค้า</p>}
						summary={() => {
							return (<>
								<Table.Summary.Row style={{ textAlign: 'right' }}>
									<Table.Summary.Cell colSpan={4} index={1}><p style={{}}>ราคารวมทั้งสิ้น </p></Table.Summary.Cell>
									<Table.Summary.Cell index={2}><p style={{ color: 'red' }}>{totalAll}</p></Table.Summary.Cell>
									<Table.Summary.Cell index={3}><p style={{}}>บาท</p></Table.Summary.Cell>
								</Table.Summary.Row>
							</>
							)
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
							value={totalAll}
							precision={1}
							valueStyle={{ color: '#3f8600', fontSize: 40, textAlign: 'center', }}
							suffix="บาท"
						/>
					</Card>
				</Row>
				<Row gutter={[0, 16]}>
					<Card style={{ width: 600 }}>
						<Divider orientation='right' style={{ fontSize: 20 }}>รับเงิน</Divider>
						<Input
							placeholder="รับเงิน"
							style={{ fontSize: 60 }}
							onChange={receiveMoneys}
							bordered={false}
						/>
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
							value={customer.debt}
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
							value={totalAll}
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
							value={customer.debt + totalAll}
							precision={1}
							valueStyle={{ color: '#3f8600', fontSize: 40, textAlign: 'center', }}
							suffix="บาท"
						/>
					</Card>
				</Row>
			</>,
		},
	]

	return (
		<div>
			<div style={{
				backgroundColor: "#ffffff",
				minWidth: "900px",
				minHeight: "300px",
				paddingLeft: "20px",
				paddingRight: "20px",
				paddingBottom: "20px",
				borderRadius: "15px",
			}}>
				<Row gutter={[20, 10]} align={'bottom'}>
					{!(customer.firstName) && (
						<Col span={12}>
							<Divider orientation="left" >
								รหัสสมาชิก
							</Divider>
							<Input
								placeholder="รหัสสมาชิก"
								size="large" type={"text"}
								onPressEnter={(event) => searchCustomer((event.target as HTMLInputElement).value)}
							/>
						</Col>
					)}
					{customer.firstName && (
						<Col span={12}>
							<Divider orientation="left">
								ชื่อสมาชิก
							</Divider>
							<Input
								placeholder={customer.firstName + '  ' + customer.lastName}
								size="large" type={"text"}
								disabled={true}
							/>
						</Col>
					)}
					<Col span={12}>
						<Divider orientation="left" >รหัสสินค้า</Divider>
						<Input
							placeholder="รหัสสินค้า"
							size="large" type={"text"}
							allowClear={true}
							defaultValue={barcode}
							onBlur={() => setBarcode('')}
							onPressEnter={event => scanBarcode((event.target as HTMLInputElement).value)}
						/>
					</Col>
					<Col>
						<Radio.Group defaultValue="a" buttonStyle="solid">
							<Radio.Button value="a" onClick={changeBill1} disabled={bill.credit}>บิลเงินสด</Radio.Button>
							<Radio.Button value="b" onClick={changeBill2} disabled={bill.credit}>บิลเงินเชื่อ</Radio.Button>
						</Radio.Group>
					</Col>

					<Col style={{ float: "right" }}>
						<Button
							shape='round'
							icon={<SearchOutlined />}
							size='large'
							onClick={showDrawer}
						>
							ค้นหาสินค้า
						</Button>
					</Col>
					<Col>
						<Button
							shape='round'
							type='primary'
							size='large'
							onClick={showModalNewItem}
						>
							+ เพิ่มสินค้าใหม่
						</Button>
					</Col>
					<Col span={24}>
						<Table
							size='small'
							columns={columns}
							dataSource={dataTable}
							pagination={false}
							scroll={{ y: 300 }}
							summary={() => {
								let total = 0
								for (let i in dataTable) {
									total += dataTable[i].priceSell
								}
								setTotal(total)
								setTotalAll(total - valueBath)
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
												<Row gutter={[10, 10]}>
													<Col span={12}>
														<InputNumber
															defaultValue={0}
															value={valueBath}
															min={0}
															max={total}
															formatter={value => ` ${value} บาท`}
															onChange={Discount}
														/>
													</Col>
													<Col span={12}>
														<InputNumber
															min={0}
															value={valuePercent}
															max={100}
															formatter={value => `${value} %`}
															onChange={DiscountPercent}
														/>
													</Col>
												</Row>
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
								)
							}}
						/>
					</Col>
					<Col span={24}>
						{bill.bill === 1 && (
							<Button
								type="primary"
								style={{ width: 200, height: 70 }}
								onClick={showModal}>
								<p style={{ fontSize: 30 }}>ชำระเงินสด</p>
							</Button>
						)}
						{bill.bill === 2 && (
							<Button
								type="primary"
								style={{ width: 200, height: 70 }}
								onClick={showModal2}>
								<p style={{ fontSize: 30 }}>ชำระเงินเชื่อ</p>
							</Button>
						)}

					</Col>
				</Row>
			</div>

			<Modal visible={isModalVisible} width={800} footer={[]} onCancel={handleCancel}>
				<Divider style={{ fontSize: 30 }}>บิลเงินสด</Divider>
				<Row gutter={[10, 10]}>
					<Col span={1}>
						<SnippetsOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col span={11}>
						<p style={{ fontSize: 15 }}>เลขที่ใบเสร็จ : RB12345678</p>
					</Col>
				</Row>
				<Row gutter={[0, 10]}>
					<Col span={1}>
						<CalendarOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>วันที่</p>
					</Col>
				</Row>
				<Row gutter={[10, 16]}>
					<Col span={1}>
						<UserOutlined style={{ fontSize: 15 }} />
					</Col>
					<Col>
						<p style={{ fontSize: 15 }}>ชื่อสมาชิก : นายสมเกียรติ</p>
					</Col>
				</Row>
				<Row justify='center' gutter={[10, 16]}>
					<Col span={24} push={1}>
						<div className="steps-content">{steps[current].content}</div>
					</Col>
				</Row>
				<Row justify='end'>
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

				</Row>
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
						<p style={{ fontSize: 15 }}>วันที่</p>
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
				<Row justify='start' gutter={[10, 20]}>
					<Col flex={5}>
						<div className="steps-content">{steps[current].content}</div>
					</Col>
					<Col span={24}>
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
					</Col>

				</Row>
			</Modal>

			<Modal visible={isModalResult} width={800} footer={[]} onCancel={handleCancelResult}>
				<Result
					status="success"
					title={`ชำระเงินเสร็จสิ้น เงินทอน ${receiveMoney - totalAll} บาท`}


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
						{searchButton === 0 && (
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
						{searchButton === 1 && (
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
						{searchButton === 2 && (
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
						<Button icon={<SearchOutlined />} type={"primary"} onClick={searchDataFromID} size="large" >Search</Button>
					</Col>
					<Col span={24}>
						<Table dataSource={data} columns={columnsSearch} pagination={false} />
					</Col>
				</Row>
			</Drawer>

		</div>

	)
}
//--------------------------------------------------------------------------------------------------------

export default SaleProduct
