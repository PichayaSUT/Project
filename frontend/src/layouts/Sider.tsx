import { Layout, Menu } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import CSS from "csstype";
import { menu } from "./Menu";
interface Props {
  collapsed: boolean;
}

const Sider = ({ collapsed }: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  const history = useHistory();

  const toggleHover = () => {
    setHover(!hover);
  };

  const noneHover: CSS.Properties = {
    overflow: "hidden",
    height: "calc(100vh - 64px)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    marginTop: "64px",
  };
  const hoverLayout: CSS.Properties = {
    overflow: "auto",
    height: "calc(100vh - 64px)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    marginTop: "64px",
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={65}
      width={250}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      style={hover ? hoverLayout : noneHover}
    >
      <Menu
        theme="dark"
        mode="vertical"
        className="menu-ant-custom"
        triggerSubMenuAction="click"
      >
        {menu.map((item, index) => {
          return item.type === "MENU" ? (
            <Menu.Item
              className="item-menu-ant-custom"
              key={index}
              icon={item.icon}
              onClick={() => history.push(item.path)}
            >
              {item.title}
            </Menu.Item>
          ) : item.type === "SUBMENU" ? (
            <Menu.SubMenu
              key={index}
              icon={item.icon}
              title={item.title}
              popupOffset={[20, 0]}
              className="item-menu-ant-custom"
            >
              <Menu.ItemGroup className="item-group-menu-ant-custom">
                {item.sub?.map((record, i) => (
                  <Menu.Item
                    key={`${record.title}${i}`}
                    onClick={() => history.push(record.path)}
                    className="item-menu-ant-custom"
                  >
                    {record.title}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            </Menu.SubMenu>
          ) : null;
        })}
      </Menu>
    </Layout.Sider>
  );
};

export default Sider;
