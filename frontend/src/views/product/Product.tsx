import { Button, Col, Input, Row } from "antd";
import { Typography } from 'antd';
import { Table, Space } from 'antd';
import { Anchor } from 'antd';


const Product = () => {
  const { Title } = Typography;
  const { Search } = Input;
  const onSearch = () => console.log();
  const { Link } = Anchor;
  
  const columns = [
    { title: 'รหัสสินค้า', dataIndex: 'pass', key: 'pass', },
    { title: 'ชื่อสินค้า', dataIndex: 'name', key: 'name', },
    { title: 'จัดเก็บ', dataIndex: 'address', key: 'address', },
    { title: 'เกรด', dataIndex: 'grade', key: 'grade', },
    { title: 'จำนวน', dataIndex: 'num', key: 'num', },
    { title: 'ตัวดำเนินการ', key: 'action', 
      render: () => (
        <Space size="middle">
          <a>โชว์</a>
          <a>แก้ไข</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      pass: 'C2345678',
      name: 'กรองโซล่า S.KBD-Z #8984',
      address: "",
      grade: 'A',
      num: 32,
    },
  ];

  return (
    <div className="Product">
      <Col md={36}>
        <Title>จัดการสินค้า</Title>
      </Col>
      <Row gutter={[36, 36]}> 
        <Col md={36}> 
          <Space size={690}>
            <Search
              placeholder="ชื่อสินค้า รหัสสินค้า partnumber" allowClear enterButton="ค้นหา" size="large" onSearch={onSearch}/>
            <Col span={32}>
              <Space size="middle">      
                <Button  size="large" type="primary">เพิ่มสินค้า </Button>
                <Button  size="large">ประวัติการจัดการ</Button>
              </Space> 
            </Col> 
          </Space>  
        </Col>
        <Col md={24}> 
        <Table columns={columns}  dataSource={data} />
        </Col> 
      </Row>
    </div> 
  )
};

export default Product;


  
 
