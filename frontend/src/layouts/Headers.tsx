import { Avatar, Col, Dropdown, Layout, Menu, Row } from "antd";
import React from "react";
import CSS from "csstype";
import {
  CaretDownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
interface Props {
  collapsed: boolean;
  toggle: () => void;
}

const headerActive: CSS.Properties = {
  padding: 0,
  paddingRight: "80px",
  backgroundColor: "white",
  position: "fixed",
  zIndex: 1,
  width: "100%",
  transition: "all 0.2s",
  boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.1)",
};

const Headers = ({ collapsed, toggle }: Props) => {
  const menu = (
    <Menu className="menu-dd">
      <Menu.Item key="0" className="item-menu-dd">
        ตั้งค่าโปรไฟล์
      </Menu.Item>
      <Menu.Divider style={{ margin: "0 15px 0 15px", height: "2px" }} />
      <Menu.Item key="1" className="item-menu-dd">
        ออกจากระบบ
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={`site-layout-background`} style={headerActive}>
      <Row justify="space-between">
        <Row>
          <div className="icon-brand">
            {/* <img src={brand} alt="brand" width={"110px"} /> */}
          </div>

          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Row>
        <Row gutter={10} align="bottom">
          <Col style={{ marginLeft: "30px" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="profile-dd">
                <Avatar
                  size={35}
                  icon={<UserOutlined />}
                  style={{ marginRight: "10px" }}
                />
                Admin JJStore
                <CaretDownOutlined
                  style={{
                    fontSize: "12px",
                    color: "#CCCDCD",
                    paddingLeft: "10px",
                  }}
                />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Row>
    </Header>
  );
};

export default Headers;
