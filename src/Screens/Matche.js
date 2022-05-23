import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { db } from "../firebase";
import { doc, getDocs, collection } from "firebase/firestore/lite";
import Option from "../asstes/option.svg";
import Arrow from "../asstes/arrow.svg";
import info from "../asstes/info.svg";
const App = () => {
  const [list, setlist] = useState("");
  const [uid, setUID] = useState("");
  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
    console.log("USer UserID is", uid);
  }, [null]);
  useEffect(() => {
    Getdata();
    console.log("list is :", list);
  }, [uid]);

  const Getdata = async () => {
    const getdata = await getDocs(collection(db, "users"));
    setlist(
      getdata.docs.map((doc) => ({
        ...doc.data(),
        FirstName: doc.data().FirstName,
        Image: doc.data().Image,
      }))
    );
  };

  return (
    <div>
      <Container>
        <Row className="centeritem mt-4">
          <Col md={5}>
            {/* -------------------------------Date--------------------- */}

            <Row className="mt-2">
              <Col md={3}>
                <p>{"10-jan-2022"}</p>
              </Col>
              <Col>
                <hr
                  style={{
                    color: "grey",
                    backgroundColor: "none",
                    height: 1,
                  }}
                />
              </Col>
            </Row>
            {/* -------------------------------Recive Order--------------------- */}

            <Row className="">
              <Col md={12} className="Rec-order">
                <Row>
                  <Col>
                    <h6 className="heading_order">Give</h6>
                    <h6 className="txt_order">{"500"} Usd</h6>
                    <h6 className="txt_order">Canada</h6>
                  </Col>
                  <Col>
                    <Row>
                      <div style={{ textAlign: "center" }}>
                        <img
                          style={{ marginTop: 30, textAlign: "center" }}
                          src={Arrow}
                          className="arrow icon"
                          alt="logo"
                        />
                      </div>
                    </Row>
                    <Row>
                      <div style={{ textAlign: "center" }}>
                        <a
                          className="btn-option"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            style={{ marginTop: 10 }}
                            src={info}
                            className="info"
                            alt="logo"
                          />
                        </a>
                      </div>
                    </Row>
                  </Col>
                  <Col>
                    <h6 className="heading_order">Take</h6>
                    <h6 className="txt_order">{"500"} Usd</h6>
                    <h6 className="txt_order">Canada</h6>
                  </Col>
                  <Col sm={1}>
                    <a className="btn-option ">
                      <img
                        style={{ textAlign: "right" }}
                        src={Option}
                        className="option"
                        alt="logo"
                      />
                    </a>
                  </Col>
                </Row>

                <hr
                  style={{
                    color: "grey",
                    margin: 0,
                    backgroundColor: "none",
                    height: 1,
                  }}
                />

                <Row className="pt-1">
                  <Col sm={4}>
                    <h6>humnf</h6>
                  </Col>
                  <Col sm={4}>
                    <h6>Trento</h6>
                  </Col>
                  <Col sm={4}>
                    <h6>250 reviews 5 Days</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button style={{ width: "100%" }}>Send Invite</Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            {/* -------------------------------Date--------------------- */}

            <Row className="mt-4">
              <Col md={3}>
                <p>{"10-jan-2022"}</p>
              </Col>
              <Col>
                <hr
                  style={{
                    color: "grey",
                    backgroundColor: "none",
                    height: 1,
                  }}
                />
              </Col>
            </Row>

            {/* -------------------------------OPen Order--------------------- */}

            <Row>
              <Col md={12} className="opn-order">
                <Row>
                  <Col>
                    <h6 className="heading_order">Give</h6>
                    <h6 className="txt_order">{"500"} Usd</h6>
                    <h6 className="txt_order">Canada</h6>
                  </Col>
                  <Col>
                    <Row>
                      <div style={{ textAlign: "center" }}>
                        <img
                          style={{ marginTop: 30, textAlign: "center" }}
                          src={Arrow}
                          className="arrow icon"
                          alt="logo"
                        />
                      </div>
                    </Row>
                    <Row>
                      <div style={{ textAlign: "center" }}>
                        <a
                          className="btn-option"
                          style={{ textAlign: "center" }}
                        >
                          <img
                            style={{ marginTop: 10 }}
                            src={info}
                            className="info"
                            alt="logo"
                          />
                        </a>
                      </div>
                    </Row>
                  </Col>
                  <Col>
                    <h6 className="heading_order">Take</h6>
                    <h6 className="txt_order">{"500"} Usd</h6>
                    <h6 className="txt_order">Canada</h6>
                  </Col>
                  <Col sm={1}>
                    <a className="btn-option ">
                      <img
                        style={{ textAlign: "right" }}
                        src={Option}
                        className="option"
                        alt="logo"
                      />
                    </a>
                  </Col>
                </Row>

                <hr
                  style={{
                    color: "grey",
                    margin: 0,
                    backgroundColor: "none",
                    height: 1,
                  }}
                />
                <Row className="pt-1">
                  <Col sm={4}>
                    <h6>humnf</h6>
                  </Col>
                  <Col sm={4}>
                    <h6>Trento</h6>
                  </Col>
                  <Col sm={4}>
                    <h6>250 reviews 5 Days</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button style={{ width: "100%" }} variant="danger">
                      Reject Invite
                    </Button>
                  </Col>
                  <Col>
                    <Button style={{ width: "100%" }} variant="success">
                      Accept Invite
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
