import { Layout } from "antd";
import { useState } from "react";
import Headers from "@layouts/Headers";
import Sider from "./Sider";
import Contents from "./Contents";
const Layouts = (props: any) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Headers collapsed={collapsed} toggle={toggle} />
      <Layout className="site-layout">
        <Sider collapsed={collapsed} />
        <div className="c-body">
          <Contents {...props} collapsed={collapsed} />
        </div>
      </Layout>
    </Layout>
  );
};

export default Layouts;
