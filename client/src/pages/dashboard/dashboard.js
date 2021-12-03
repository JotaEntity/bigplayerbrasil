import { Row, Col, Button, Modal, Form, Input } from "antd";
import "./style.css";
import axios from "axios";
import Icon from "../../assets/icon.svg";
import ModalCreateUser from "../../components/modal/modalCreateUser";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.email);
    formData.append("cellphone", values.email);
    formData.append("cpf", values.email);
    formData.append("admin", 1);

    axios
      .post("http://localhost:3333/api/v1/user/register", formData)
      .then((response) => {
        toast.success("Conta criada com sucesso!");
        setIsModalVisible(false);
        localStorage.setItem("user-play", response.data.data.id);
        toast.warning("Em até 24 horas, acesse o site e terá seu resultado!");
        window.location.reload();
      });
  };
  return (
    <Row style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Col
        xs={24}
        md={10}
        xl={10}
        style={{
          textAlign: "center",
          backgroundColor: "#24EB6E",
        }}
      >
        <h1 className="text">Big Player Brasil</h1>
        <h1 style={{ color: "#fff" }}>
          Se candidate para o maior reality show de games do brasil!
        </h1>
        <p>
          É Super divertido e tranquilo, conheça vários jogadores novos e
          dedicados!
        </p>
        <Col xs={0} md={24} xl={24}>
          <Button
            size="large"
            shape="round"
            className="change"
            onClick={() => setIsModalVisible(true)}
          >
            Cadastre-se gratuitamente!
          </Button>
        </Col>
        <Col xs={24} md={0} xl={0}>
          <Button
            size="small"
            shape="round"
            className="change"
            onClick={() => setIsModalVisible(true)}
          >
            Cadastre-se gratuitamente!
          </Button>
        </Col>
      </Col>
      <Col xs={0} md={14} xl={14}>
        <img
          src={Icon}
          className="nohover"
          style={{
            width: "60%",
            height: "100%",
            marginRight: "auto",
            marginLeft: "auto",
            display: "block",
          }}
        ></img>
      </Col>
      <Modal
        visible={isModalVisible}
        title="Cadastre-se aqui"
        onCancel={() => setIsModalVisible(false)}
        footer={[<></>, <></>]}
      >
        <Form layout="vertical" onFinish={onFinish}>
          {" "}
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Insira o seu nome" }]}
          >
            <Input placeholder="Insira o seu nome" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Insira o seu email" }]}
          >
            <Input placeholder="Insira o seu e-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Insira sua senha",
              },
            ]}
          >
            <Input.Password placeholder="Insira a sua senha" />
          </Form.Item>
          <Form.Item
            name="cellphone"
            rules={[
              {
                required: true,
                message: "Insira o numero do seu celular",
              },
            ]}
          >
            <Input placeholder="Insira seu numero exemplo:  1499813-7733 " />
          </Form.Item>
          <Form.Item
            name="cpf"
            rules={[
              {
                required: true,
                message: "Insira o seu cpf",
              },
            ]}
          >
            <Input placeholder="Insira seu CPF:  xxx.xxx.xxx-xx " />
          </Form.Item>
          <Button
            style={{
              backgroundColor: "#24EB6E",
            }}
            shape="round"
            onClick={() => setIsModalVisible(false)}
          >
            Cancelar
          </Button>
          <Button
            shape="round"
            style={{
              backgroundColor: "#24EB6E",
              marginLeft: 10,
            }}
            htmlType="submit"
          >
            Salvar
          </Button>
        </Form>
      </Modal>
    </Row>
  );
}
