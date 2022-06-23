import { Input, Table, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "รหัสสินค้า",
    dataIndex: "code",
    width: 200,
  },
  {
    title: "Part Number",
    dataIndex: "partnumber",
    width: 200,
  },
  {
    title: "ชื่อสินค้า(ร้าน)",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "ชื่อสินค้า(บริษัท)",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "จำนวนคงเหลือ",
    dataIndex: "stock",
  },
];

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const PurchaseProduct = () => {
  return (
    <div>
      <Link to={"/create-product"}>
        <Button
          style={{ float: "right", width: "10%", marginLeft: 20 }}
          type="primary"
        >
          สร้างใบสั่งซื้อ
        </Button>
      </Link>

      <Button style={{ float: "right", width: "10%" }} type="primary">
        แสดงใบสั่งซื้อ
      </Button>
      <h1>ตรวจสอบสินค้าคงเหลือ</h1>
      <Input placeholder="รหัสสินค้า" style={{ width: "40%", marginTop: 40 }} />
      <Input
        placeholder="Part Number"
        style={{ width: "40%", marginTop: 40, marginLeft: 20 }}
      />
      <Input
        placeholder="ชื่อสินค้า (ร้าน)"
        style={{ width: "40%", marginTop: 40 }}
      />
      <Input
        placeholder="ชื่อสินค้า (บริษัท)"
        style={{ width: "40%", marginTop: 40, marginLeft: 20 }}
      />

      <Select
        defaultValue="รายการสินค้าทั้งหมด"
        style={{ width: 300, marginTop: 40, marginBottom: 30 }}
        onChange={handleChange}
      >
        <Option value="รายการสินค้าทั้งหมด">รายการสินค้าทั้งหมด</Option>
        <Option value="รายการสินค้าเหลือน้อย">รายการสินค้าเหลือน้อย</Option>
      </Select>

      <Button
        style={{ float: "right", width: 100, marginTop: 40 }}
        type="primary"
        className="bth-search"
        icon={<SearchOutlined />}
      >
        ค้นหา
      </Button>
      <Table
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};
export default PurchaseProduct;
