import "@assets/less/variables.less";
import "@assets/scss/app.scss";
import { HashRouter, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginPage from "@views/pages/login/Login";
import Layouts from "@layouts/Layouts";
import { ConfigProvider, Empty } from "antd";
import dayjs from "dayjs";
import th from "antd/lib/locale/th_TH";
import "dayjs/locale/th";

dayjs.locale("th");
const App = () => {
  return (
    <ConfigProvider locale={th} renderEmpty={() => <Empty />}>
      <HashRouter>
        <Switch>
          <Route exact path="/404" component={() => <div>404</div>} />
          <Route exact path="/login" component={LoginPage} />

          <Route
            path="/"
            render={(props) => (
              <RecoilRoot>
                <Layouts {...props} />
              </RecoilRoot>
            )}
          />
        </Switch>
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;
