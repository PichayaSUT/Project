import { List, Divider, Button } from "antd";
import { Link } from "react-router-dom";

const Setting = () => {
  return (
    <div>
      <h1 style={{ fontSize: "30px" }}>SETTING</h1>
      <Divider style={{ margin: "-5px 0px 20px 0px" }} />
      <List
        header={<h3 style={{ fontSize: "20px" }}>Manage</h3>}
        bordered
        style={{ width: "50%" }}
      >
        <List.Item>
          <p style={{ fontSize: "15px", margin: "5px 0px 5px 5px" }}>
            จัดการสิทธิ์การเข้าถึง
          </p>
          <Link to={"/permissions"}>
            <Button>manage</Button>
          </Link>
        </List.Item>
      </List>
    </div>
  );
};

export default Setting;
