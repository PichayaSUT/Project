import { Input, Table, Button, Select, DatePicker, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import moment from "moment";

const columns = [
  {
    title: "รหัสสินค้า",
    dataIndex: "code",
    key: "code",
    width: 200,
  },
  {
    title: "ชื่อสินค้า(ร้าน)",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "ชื่อสินค้า(บริษัท)",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "จำนวนคงเหลือ",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => "เลือก",
  },
];

const data = [
  {
    key: 1,
    code: "John Brown",
    stock: 32,
    name: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    code: "Jim Green",
    stock: 42,
    name: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
];

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const PurchaseProduct = () => {
  return (
    <div>
      <h1>สร้างรายการสั่งซื้อ</h1>

      <div>
        <Select
          defaultValue="กรุณาเลือกบริษัท"
          style={{ width: 300, marginTop: 30 }}
          onChange={handleChange}
        >
          <Option value="ck">Jack</Option>
          <Option value="example">Lucy</Option>
        </Select>

        <Input
          disabled
          placeholder="รหัสสินค้า(ร้าน)"
          style={{
            width: "25%",
            marginTop: 30,
            marginRight: 10,
            marginLeft: 10,
          }}
        />

        <Input
          disabled
          placeholder="ชื่อสินค้า (ร้าน)"
          style={{ width: "25%", marginTop: 30, marginRight: 10 }}
        />

        <Space direction="vertical" size={18}>
          <DatePicker
            defaultValue={moment("01/01/2015", dateFormatList[0])}
            format={dateFormatList}
          />
        </Space>

        <Button
          style={{ width: 100, marginLeft: 10 }}
          type="primary"
          icon={<SearchOutlined />}
        >
          ค้นหา
        </Button>
      </div>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        dataSource={data}
      />

      <Link to={"/list-product"}>
        <Button
          style={{ float: "right", width: "10%", marginTop: 20 }}
          type="primary"
        >
          ยืนยันการสั่งซื้อ
        </Button>
      </Link>
    </div>
  );
};

export default PurchaseProduct;
