// import React, { useEffect } from "react";
// import OrderCom from "./Ordercom";
// import CreateOrder from "../Creatorder";

// import { Routes, Route, Link } from "react-router-dom";

// import { Row, Col, Container, Button } from "react-bootstrap";
// import { useState } from "react";

// const Home = () => {
//   useEffect(() => {
//     console.log("Home Component Render");
//   });
//   return (
//     <div>
//       <OrderCom />
//     </div>
//   );
// };

// export default Home;

//---------------------------------------------------HOMe Ended-----------------------------
import "../../App.css";
import { Row, Col, Container, Button, Dropdown, Fade } from "react-bootstrap";
import ContentLoader, { Facebook } from "react-content-loader";
import { useState, useEffect, forwardRef } from "react";
import Option from "../../asstes/option.svg";
import Arrow from "../../asstes/arrow.svg";
import info from "../../asstes/info.svg";
import add from "../../asstes/add.svg";
import { useNavigate } from "react-router-dom";
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore/lite";
import { db } from "../../firebase";
import Popup from "reactjs-popup";
import Loading from "../loading";
const OrderCom = (props) => {
  const [radiobtn, setradiobtn] = useState(true);
  const [activelist, setactivelist] = useState("");
  const [holdlist, setholdlist] = useState("");
  const [uid, setUID] = useState("");
  const [isloading, setisloading] = useState(false);
  const [fade, setfade] = useState(false);
  const navigate = useNavigate();
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      style={{ textDecoration: "none" }}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span className="threedots" />
    </a>
  ));
  //   const [radiobtn, setradiobtn] = useState(true);

  //   const [radiobtn, setradiobtn] = useState(true);

  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
  });
  useEffect(() => {
    GetActivedata();
    GetHolddata();
  }, [uid]);

  const GetActivedata = async () => {
    console.log("uid in getdata");
    console.log(uid);
    const docRef = doc(db, "users", uid);
    const colRef = collection(docRef, "ActivatedOrders");
    const tasksnapshot = await getDocs(colRef);
    const tasklist = tasksnapshot.docs.map((doc) => ({
      id: doc.id,
      GiveAmmount: doc.data().GiveAmmount,
      GiveCity: doc.data().GiveCity,
      GiveState: doc.data().GiveState,
      GiveCountry: doc.data().GiveCountry,
      TakeAmmount: doc.data().TakeAmmount,
      TakeCity: doc.data().TakeCity,
      TakeState: doc.data().TakeState,
      TakeCountry: doc.data().TakeCountry,
      GiveThroughCash: doc.data().GiveThroughCash,
      GiveThroughBank: doc.data().GiveThroughBank,
      GiveThroughAny: doc.data().GiveThroughAny,
      TakeThroughCash: doc.data().TakeThroughCash,
      TakeThroughBank: doc.data().TakeThroughBank,
      TakeThroughAny: doc.data().TakeThroughAny,
      ActivateTime: doc.data().ActivateTime,
      AdditionalAmmount: doc.data().AdditionalAmmount,
      UntilGoodDate: doc.data().UntilGoodDate,
    }));
    setactivelist(tasklist);
    console.log("Active List is:", tasklist);
  };

  const GetHolddata = async () => {
    const docRef = doc(db, "users", uid);
    const colRef = collection(docRef, "PutonHoldOrders");
    const tasksnapshot = await getDocs(colRef);
    const tasklist = tasksnapshot.docs.map((doc) => ({
      id: doc.id,
      GiveAmmount: doc.data().GiveAmmount,
      GiveCity: doc.data().GiveCity,
      GiveState: doc.data().GiveState,
      GiveCountry: doc.data().GiveCountry,
      TakeAmmount: doc.data().TakeAmmount,
      TakeCity: doc.data().TakeCity,
      TakeState: doc.data().TakeState,
      TakeCountry: doc.data().TakeCountry,
      GiveThroughCash: doc.data().GiveThroughCash,
      GiveThroughBank: doc.data().GiveThroughBank,
      GiveThroughAny: doc.data().GiveThroughAny,
      TakeThroughCash: doc.data().TakeThroughCash,
      TakeThroughBank: doc.data().TakeThroughBank,
      TakeThroughAny: doc.data().TakeThroughAny,
      HoldTime: doc.data().HoldTime,
      AdditionalAmmount: doc.data().AdditionalAmmount,
      UntilGoodDate: doc.data().UntilGoodDate,
    }));
    setholdlist(tasklist);
    console.log("Hold List is:", holdlist);
  };

  // const Delete = async () => {
  //   const docRef = doc(db, "users", uid, "Task");
  //   const docSnap = await deleteDoc(docRef);
  // };
  return (
    <div>
      {isloading ? (
        <div className="bgloading">
          <Loading />
        </div>
      ) : null}

      <div className="">
        <Container>
          <Row className="centeritem mt-4">
            <Col md={5}>
              {/* <ContentLoader
              speed={5}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#f3f3f3"
              foregroundColor="#2995be"
              // foregroundColor="#ecebeb"
              {...props}
            >
              <rect x="0" y="10" rx="3" ry="3" width="600" height="10" />
              <rect x="0" y="30" rx="3" ry="3" width="600" height="10" />
              <rect x="0" y="50" rx="3" ry="3" width="340" height="10" />
              <rect x="0" y="70" rx="3" ry="3" width="240" height="10" />
              <rect x="0" y="90" rx="3" ry="3" width="178" height="10" />
            </ContentLoader> */}
              {/* --------------------------------------Active Order----------------------- */}
              {activelist.length > 0 ? (
                activelist.map((Task, key) => (
                  <Row key={key} className="mt-3">
                    <Row className="">
                      <Col md={10}>
                        <Row className="bdr p-2">
                          <Col>
                            <h6 className="heading_order">Give</h6>
                            <h6 className="txt_order">{Task.GiveAmmount}</h6>
                            <h6 className="txt_order">{Task.GiveCountry}</h6>
                            <h6 className="txt_order">{Task.GiveCity}</h6>
                          </Col>
                          <Col>
                            <Row>
                              <div style={{ textAlign: "center" }}>
                                <img
                                  style={{
                                    marginTop: 30,
                                    textAlign: "center",
                                  }}
                                  src={Arrow}
                                  className="arrow icon"
                                  alt="logo"
                                />
                              </div>
                            </Row>
                            <Row>
                              <div style={{ textAlign: "center" }}>
                                <Popup
                                  trigger={
                                    <img
                                      style={{ marginTop: 10 }}
                                      src={info}
                                      className="info"
                                      alt="logo"
                                    />
                                  }
                                  position="center"
                                >
                                  {(close) => (
                                    <div>
                                      <Row className="infopopup">
                                        <Row
                                          style={{
                                            display: "flex",
                                            flexWrap: "nowrap",
                                            justifyContent: "space-around",
                                          }}
                                        >
                                          <Col>
                                            <h6>Additional Transact</h6>
                                          </Col>
                                          <Col style={{ textAlign: "end" }}>
                                            {Task.AdditionalAmmount}
                                          </Col>
                                        </Row>
                                        <Row
                                          style={{
                                            display: "flex",
                                            flexWrap: "nowrap",
                                            justifyContent: "space-around",
                                          }}
                                        >
                                          <Col>
                                            <h6>Good Until</h6>
                                          </Col>
                                          <Col style={{ textAlign: "end" }}>
                                            {Task.UntilGoodDate}
                                          </Col>
                                        </Row>
                                        <Row>
                                          <Button
                                            onClick={() => {
                                              console.log("modal closed ");
                                              close();
                                            }}
                                            className="btn"
                                            variant="success"
                                          >
                                            Close
                                          </Button>
                                        </Row>
                                      </Row>
                                    </div>
                                  )}
                                </Popup>
                              </div>
                            </Row>
                          </Col>
                          <Col>
                            <h6 className="heading_order">Take</h6>
                            <h6 className="txt_order">{Task.TakeAmmount}</h6>
                            <h6 className="txt_order">{Task.TakeCountry}</h6>
                            <h6 className="txt_order">{Task.TakeCity}</h6>
                          </Col>
                          <Col sm={1}>
                            {" "}
                            <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} />
                              <Dropdown.Menu size="sm" title="">
                                <Dropdown.Item
                                  onClick={() => {
                                    navigate(
                                      `/Createorder?ID=${uid}&Tid=${Task.id}`
                                    );
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={async (e) => {
                                    setisloading(true);
                                    e.preventDefault();
                                    const docRef = doc(
                                      db,
                                      "users",
                                      uid,
                                      "ActivatedOrders",
                                      Task.id
                                    );
                                    await deleteDoc(docRef);
                                    window.location.href = `/OrderCom?ID=${uid}`;
                                  }}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </Col>
                      <Col sm={2} className="mt-4">
                        <a className="activ-btn">ACTIVE</a>
                        <p className="date mt-2">{Task.ActivateTime}</p>
                      </Col>
                    </Row>
                    <Row className="creatorder">
                      {/* <Button variant="success">
                        <img
                          style={{ marginRight: 10 }}
                          src={add}
                          className="info"
                          alt="logo"
                        />
                        Create an Order
                      </Button> */}
                    </Row>
                  </Row>
                ))
              ) : activelist != [] ? (
                <h5 style={{ textAlign: "center" }}>
                  There are No Orders Available!
                </h5>
              ) : (
                <ContentLoader
                  speed={5}
                  height={160}
                  viewBox="0 0 400 160"
                  backgroundColor="#f3f3f3"
                  //foregroundColor="#2995be"
                  foregroundColor="#ecebeb"
                  {...props}
                >
                  <rect x="0" y="10" rx="3" ry="3" width="600" height="10" />
                  <rect x="0" y="30" rx="3" ry="3" width="600" height="10" />
                  <rect x="0" y="50" rx="3" ry="3" width="340" height="10" />
                  <rect x="0" y="70" rx="3" ry="3" width="240" height="10" />
                  <rect x="0" y="90" rx="3" ry="3" width="178" height="10" />
                </ContentLoader>
              )}
              {/* --------------------------------------Hold Order----------------------- */}
              {holdlist.length > 0
                ? holdlist.map((Task, key) => (
                    <Row key={key} className="mt-2">
                      <Row className="mt-2">
                        <Col md={10}>
                          <Row className="bdr-hold p-2">
                            <Col>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="heading_order"
                              >
                                Give
                              </h6>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="txt_order"
                              >
                                {Task.GiveAmmount}
                              </h6>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="txt_order"
                              >
                                {Task.GiveCountry}
                              </h6>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="txt_order"
                              >
                                {Task.GiveCity}
                              </h6>
                            </Col>
                            <Col>
                              <Row>
                                <div style={{ textAlign: "center" }}>
                                  <img
                                    style={{
                                      marginTop: 30,
                                      textAlign: "center",
                                    }}
                                    src={Arrow}
                                    className="arrow icon"
                                    alt="logo"
                                  />
                                </div>
                              </Row>
                              <Row>
                                <div style={{ textAlign: "center" }}>
                                  <Popup
                                    trigger={
                                      <img
                                        style={{ marginTop: 10 }}
                                        src={info}
                                        className="info"
                                        alt="logo"
                                      />
                                    }
                                    position="center"
                                  >
                                    {(close) => (
                                      <div>
                                        <Row className="infopopup">
                                          <Row
                                            style={{
                                              display: "flex",
                                              flexWrap: "nowrap",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <Col>
                                              <h6>Additional Transact</h6>
                                            </Col>
                                            <Col style={{ textAlign: "end" }}>
                                              {Task.AdditionalAmmount}
                                            </Col>
                                          </Row>
                                          <Row
                                            style={{
                                              display: "flex",
                                              flexWrap: "nowrap",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <Col>
                                              <h6>Good Until</h6>
                                            </Col>
                                            <Col style={{ textAlign: "end" }}>
                                              {Task.UntilGoodDate}
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Button
                                              onClick={() => {
                                                console.log("modal closed ");
                                                close();
                                              }}
                                              className="btn"
                                              variant="success"
                                            >
                                              Close
                                            </Button>
                                          </Row>
                                        </Row>
                                      </div>
                                    )}
                                  </Popup>
                                </div>
                              </Row>
                            </Col>
                            <Col>
                              <h6 className="heading_order">Take</h6>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="txt_order"
                              >
                                {Task.TakeAmmount}
                              </h6>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="txt_order"
                              >
                                {Task.TakeCountry}
                              </h6>
                              <h6
                                style={{ whiteSpace: "nowrap" }}
                                className="txt_order"
                              >
                                {Task.TakeCity}
                              </h6>
                            </Col>
                            <Col sm={1}>
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} />
                                <Dropdown.Menu size="sm" title="">
                                  <Dropdown.Item
                                    onClick={() => {
                                      window.location.href = `/Createorder?ID=${uid}&Tid=${Task.id}`;
                                    }}
                                  >
                                    Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={async () => {
                                      const docRef = doc(
                                        db,
                                        "users",
                                        uid,
                                        "PutonHoldOrders",
                                        Task.id
                                      );
                                      const docSnap = await deleteDoc(docRef);
                                      setTimeout(() => {
                                        window.location.href = `/OrderCom?ID=${uid}`;
                                      }, 1000);
                                    }}
                                  >
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                          </Row>
                        </Col>
                        <Col sm={2} className="mt-4">
                          <a className="hold-btn">Hold</a>
                          <p className="date mt-2">{Task.HoldTime}</p>
                        </Col>
                      </Row>
                      <Row className="creatorder">
                        {/* <Button
                        onClick={() => {
                          window.location.href = `/CreateOrder?ID=${uid}`;
                        }}
                        variant="success"
                      >
                        <img
                          style={{ marginRight: 10 }}
                          src={add}
                          className="info"
                          alt="logo"
                        />
                        Create an Order
                      </Button> */}
                      </Row>
                    </Row>
                  ))
                : null}

              {/* --------------------------------------Expired Order----------------------- */}
              {/* <Row>
            <Row className="mt-3">
              <Col md={9}>
                <Row className="bdr-expired p-2">
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
                      <img src={Option} className="option" alt="logo" />
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col sm={3} className="mt-4">
                <a className="expired-btn">Expired</a>
                <p className="date mt-2">{"1-Mar-2022"}</p>
              </Col>
            </Row>
            
            
          </Row> */}
              <Row className="mt-3">
                <Row className="creatorder"></Row>

                <Button
                  variant="success"
                  onClick={() => {
                    navigate(`/CreateOrder?ID=${uid}`);
                  }}
                >
                  <img
                    style={{ marginRight: 10 }}
                    src={add}
                    className="info"
                    alt="logo"
                  />
                  Create an Order
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default OrderCom;
