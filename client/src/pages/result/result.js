import { Col, Row } from "antd";
import { AiFillCheckCircle } from "react-icons/ai";
import Approved from "../../assets/approved.svg";
import Waiting from "../../assets/waiting.svg";
import Failed from "../../assets/failed.svg";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { userToken } from "../../providers/auth";

export default function ResultAccount() {
  const [data, setData] = useState({});
  const [html, setHtml] = useState(
    <div style={{ minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginTop: "30%" }}>Aguarde...</h1>
    </div>
  );

  const ResultApproved = () => {
    return (
      <Row style={{ minHeight: "100vh" }}>
        <Col
          xs={24}
          md={24}
          xl={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={Approved} width={500} height={500} />
        </Col>
        <Col xs={24} md={24} xl={24} style={{ textAlign: "center" }}>
          <h1>Sucesso, você foi aprovado no processo seletivo</h1>
          <h4>Em breve iremos entrar em contato para mais informações</h4>
        </Col>
      </Row>
    );
  };
  const ResultWaiting = () => {
    return (
      <Row style={{ minHeight: "100vh" }}>
        <Col
          xs={24}
          md={24}
          xl={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={Waiting} width={500} height={500} />
        </Col>
        <Col xs={24} md={24} xl={24} style={{ textAlign: "center" }}>
          <h1>Aguarde, estamos analisando seu perfil</h1>
          <h4>Em breve iremos ter seu resultado</h4>
        </Col>
      </Row>
    );
  };
  const ResultFailed = () => {
    return (
      <Row style={{ minHeight: "100vh" }}>
        <Col
          xs={24}
          md={24}
          xl={24}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={Failed} width={500} height={500} />
        </Col>
        <Col xs={24} md={24} xl={24} style={{ textAlign: "center" }}>
          <h1>Infelizmente seu perfil não bate com o nosso ideal</h1>
          <h4>Em breve iremos abrir um novo processo</h4>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3333/api/v1/selective/detail/${userToken()}`)
      .then((response) => {
        setData(response.data.data);
        if (response.data.data.status == null) {
          setHtml(<ResultWaiting />);
        } else if (response.data.data.status == true) {
          setHtml(<ResultApproved />);
        } else if (response.data.data.status == false) {
          setHtml(<ResultFailed />);
        }
      });
  }, []);
  const Result = useCallback(() => {
    axios
      .get(`http://localhost:3333/api/v1/selective/detail/${userToken()}`)
      .then((response) => {
        console.log(response.data.data.status);
        if (response.data.data.status == null) {
          return <ResultWaiting />;
        } else if (response.data.data.status == true) {
          return <ResultApproved />;
        } else if (response.data.data.status == false) {
          return <ResultFailed />;
        }
      });
  }, [data]);

  return html;
}
