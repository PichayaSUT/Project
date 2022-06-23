import { Layout, Spin } from "antd";
import CSS from "csstype";
import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { routers } from "../router/routers";
const { Content } = Layout;

interface Props {
  collapsed: boolean;
}
const loading = (
  <Spin>
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  </Spin>
);

const ContentsActive: CSS.Properties = {
  margin: "60px 0px 24px 80px",
  padding: "24px",
  transition: "all 0.2s",
  width: "calc(100vw - 90px)",
};

const ContentsInactive: CSS.Properties = {
  margin: "60px 0px 24px 250px",
  padding: "24px",
  transition: "all 0.2s",
  width: "calc(100vw - 260px)",
};

const Contents = ({ collapsed }: Props) => {
  return (
    <Content
      className="site-layout-background"
      style={collapsed ? ContentsActive : ContentsInactive}
    >
      <Suspense fallback={loading}>
        <Switch>
          {routers.map((router, idx) => {
            return (
              router.component && (
                <Route
                  key={idx}
                  path={router.path}
                  exact={router.exact}
                  component={router.component}
                />
              )
            );
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </Content>
  );
};

export default Contents;
