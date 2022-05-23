import React, { useEffect, useState } from "react";
import logo from "../asstes/Logoapp.png";
import "../App.css";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const [uid, setUID] = useState("");
  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
  }, [null]);

  return (
    <div className=" mainbg  ">
      <Row className="centeritem h100vh ">
        <Col md={5} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
            <Row>
              <Col></Col>
              <Col>
                <img src={logo} className="logo" alt="logo" />
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <h3 className=" text-center mb-3">Welcome to Honey Money!</h3>

              <h6 className="text-center mb-3">
                Some countries do not allow money exchange between individuals
                and want people to go to a bank.
              </h6>

              <p className="text-center mb-3">
                If you live in such a country and are bound by such rules please
                EXIT the app, if not, CONTINUE.
              </p>
            </Row>
            <Row className="text-center">
              <Col md={6} className="mt-3">
                <Button
                  variant="danger"
                  className=" btn "
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Exit
                </Button>
              </Col>
              <Col md={6} className="mt-3">
                <Button
                  variant="success"
                  className="btn"
                  onClick={() => {
                    window.location.href = `/Createorder?ID=${uid}`;
                  }}
                >
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Welcome;
