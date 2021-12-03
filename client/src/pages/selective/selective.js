import { Row, Col, Table, Button, Dropdown, Menu } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { userIsAdmin, userToken } from "../../providers/auth";
import { toast } from "react-toastify";
export default function Selective() {
  const [data, setData] = useState([]);

  const SelectResult = (result) => {
    let formData = new FormData();
    formData.append("result", result);
    axios.put(
      `http://localhost:3333/api/v1/selective/edit/${userToken()}`,
      formData
    );
    if (result == true) {
      toast.success("Usuario aprovado!");
    } else {
      toast.error("Usuario reprovado");
    }
  };
  const DropdownMenu = useCallback((record) => (
    <Menu>
      <Menu.Item key="0" onClick={() => SelectResult(true)}>
        Aprovar
      </Menu.Item>
      <Menu.Item key="1" onClick={() => SelectResult(false)}>
        Recusar
      </Menu.Item>
    </Menu>
  ));

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/v1/selective/list")
      .then((response) => {
        setData(response.data.data);
      });
  }, []);
  const columns = [
    {
      title: "ID do usuario",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      render: (text, record) => (
        <span style={{ color: "#ff9900" }}>Em Aguardo</span>
      ),
    },
    {
      title: "Link do vídeo",
      dataIndex: "video",
      key: "video",
      sorter: (a, b) => a.video.length - b.video.length,
      render: (text, record) => (
        <Button onClick={() => window.open(record.video, "_blank")} type="link">
          {record.video}
        </Button>
      ),
    },
    {
      dataIndex: "action",
      key: "action",
      width: "100px",
      render: (text, record) => (
        <Dropdown overlay={DropdownMenu(record)} trigger={["click"]}>
          <Button type="link" className="btn-action">
            <MdMoreVert size={24} />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <Row style={{ minHeight: "100vh", marginTop: 100 }}>
      <Col xs={0} md={2} xl={2}></Col>
      <Col xs={24} md={20} xl={20}>
        <Table columns={columns} rowKey="id" dataSource={data} />
      </Col>
      <Col xs={0} md={2} xl={2}></Col>
    </Row>
  );
}
