import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/router";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import { ConfigProvider, Layout } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { ToastContainer } from "react-toastify";
ReactDOM.render(
  <Layout>
    <ConfigProvider locale={ptBR}>
      <ToastContainer />
      <Routes />
    </ConfigProvider>
  </Layout>,
  document.getElementById("root")
);
