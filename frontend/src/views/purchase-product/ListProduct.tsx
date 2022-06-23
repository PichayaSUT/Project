import { useState } from "react";

//import './index.css';
import { Input, Table, Button, Select, Space, Modal } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "code",
    key: "code",
    width: 200,
  },
  {
    title: "ชื่อสินค้า(บริษัท)",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "จำนวน",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "หน่วยนับ",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "สถานะ",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => "ยกเลิก",
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

const PurchaseProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1>รายการสั่งซื้อ</h1>

      <Space
        size={24}
        style={{
          float: "right",
        }}
      >
        <h1>บริษัท</h1>
      </Space>

      <Space
        style={{
          float: "right",
        }}
      >
        <br />
        <Button
          style={{
            float: "right",
            width: "120%",
            marginTop: 20,
            marginBottom: 10,
          }}
          type="primary"
          onClick={showModal}
        >
          เพิ่มรายการใหม่
        </Button>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <h1>เพิ่มรายการสินค้าใหม่</h1>
          <Select
            defaultValue="กรุณาเลือกบริษัท"
            disabled
            style={{ width: 300 }}
            onChange={handleChange}
          ></Select>
          <br />
          <Input
            placeholder="รหัสสินค้า(บริษัท)"
            style={{ width: "45%", marginTop: 30 }}
          />
          <Input
            placeholder="ชื่อสินค้า (บริษัท)"
            style={{ width: "45%", marginTop: 30, marginLeft: 30 }}
          />
          <br />
          <Input
            placeholder="จำนวน"
            style={{ width: "45%", marginTop: 30, marginRight: 30 }}
          />
          <Select
            defaultValue="หน่วยนับ"
            style={{ width: "45%", marginTop: 30 }}
            onChange={handleChange}
          >
            <Option value="โหล">โหล</Option>
            <Option value="example">example</Option>
          </Select>
        </Modal>
      </Space>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 240 }}
        dataSource={data}
      />

      <Link to={"/new-order-product"}>
        <Button
          style={{ float: "right", width: "10%", marginTop: 70 }}
          type="primary"
        >
          บันทึกใบสั่งซื้อ
        </Button>
      </Link>

      <Space size={18}>
        <Link to={"/create-product"}>
          <Button
            style={{ float: "left", width: "120%", marginTop: 20 }}
            type="primary"
          >
            แก้ไขรายการ
          </Button>
        </Link>
      </Space>

      <Link to={"/purchase-product"}>
        <br />
        <Button
          style={{ float: "left", width: "10%", marginTop: 10 }}
          type="primary"
        >
          ยกเลิกรายการ
        </Button>
      </Link>
    </div>
  );
};

export default PurchaseProduct;
