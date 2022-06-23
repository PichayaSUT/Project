import { Button, Divider, Input } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    customerid: "as1223548",
    name: "John op",
    customertype: "a",
    phone: "0123456789",
    lineID: "as123",
  },
];

const Customer = () => {
  return (
    <div className="infomation">
      <h1>Customer Information</h1>
      <p>ข้อมูลลูกค้า</p>
      <Divider />

      <Input
        style={{
          width: "20%",
          marginLeft: 8,
          marginRight: 10,
          borderRadius: "5px",
        }}
        placeholder="รหัสสมาชิก"
        prefix={<SearchOutlined />}
      />

      <Input
        style={{ width: "20%", marginTop: 40, borderRadius: "5px" }}
        placeholder="ชื่อ-สกุล"
        prefix={<SearchOutlined />}
      />

      <Input
        style={{
          width: "20%",
          marginLeft: 8,
          marginRight: 10,
          borderRadius: "5px",
        }}
        placeholder="ประเภท"
        prefix={<SearchOutlined />}
      />

      <Button
        style={{
          borderRadius: "5px",
          backgroundColor: "#EE7C58",
          color: "white",
        }}
      >
        ค้นหา
      </Button>

      <Link to={"/create-customer"}>
        <Button
          style={{
            float: "right",
            width: "10%",
            marginTop: 40,
            borderRadius: "5px",
          }}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          เพิ่มข้อมูล
        </Button>
      </Link>

      <Table
        dataSource={data}
        style={{ marginTop: 30 }}
        columns={[
          {
            title: "รหัสสมาชิก",
            dataIndex: "customerid",
            key: "customerid",
          },
          {
            title: "ชื่อ-นามสกุล",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "ประเภท",
            dataIndex: "customertype",
            key: "customertype",
          },
          {
            title: "เบอร์โทร",
            dataIndex: "phone",
            key: "phone",
          },
          {
            title: "LineID",
            dataIndex: "lineID",
            key: "lineID",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: () => (
              <Link to={"/show-customer"}>
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#96C11F",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  ดูข้อมูล
                </Button>
                <Button
                  size="small"
                  style={{
                    backgroundColor: "#FFC10D",
                    color: "white",
                    borderRadius: "5px",
                    margin: "0px 0px 0px 5px",
                  }}
                >
                  แก้ไข
                </Button>
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Customer;
