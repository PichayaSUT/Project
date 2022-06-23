import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const Permissions = () => {
  return (
    <div>
      <h1 style={{ fontSize: "30px" }}>สิทธิ์การเข้าถึง</h1>
      <Divider />

      <Link to={"/create-permissions"}>
        <Button
          style={{
            float: "right",
            margin: "5px 0px 20px 5px",
            borderRadius: "15px",
            width: "20%",
          }}
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          เพิ่มสิทธิ์
        </Button>
      </Link>

      <Table
        style={{ marginTop: 30 }}
        columns={[
          {
            title: "ประเภทสิทธิ์",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "เข้าถึงได้",
            dataIndex: "permit",
            key: "permit",
          },
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: () => (
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
            ),
          },
        ]}
      />
    </div>
  );
};

export default Permissions;
