import { Layout, theme } from "antd";
import React from "react";
import MainRouter from "./routes/MainRouter";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import HeaderMenu from "./components/header/HeaderMenu";

const { Content } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <HeaderMenu />
          <Layout>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <MainRouter />
            </Content>
          </Layout>
        </Layout>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
