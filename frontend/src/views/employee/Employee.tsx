import { Button, Divider, Input } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    name: "John Brown",
    position: "a",
    phone: "0123456789",
    lineID: "as123",
  },
];
const Employee = () => {
  return (
    <div className="infomation">
      <h1>Employee Information</h1>
      <p>ข้อมูลพนักงาน</p>
      <Divider />

      <Input
        style={{ width: "25%", marginTop: 40, borderRadius: "5px" }}
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
        placeholder="ตำแหน่ง"
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

      <Link to={"/create-employee"}>
        <Button
          style={{
            float: "right",
            width: "15%",
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
            title: "ชื่อ-นามสกุล",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "ตำแหน่ง",
            dataIndex: "position",
            key: "position",
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
              <Link to={"/show-employee"}>
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

export default Employee;
