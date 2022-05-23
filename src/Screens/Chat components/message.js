import React, { useEffect, useState } from "react";
import Profile from "../../asstes/Profilepic.png";
import Heart from "../../asstes/Ratingheart.svg";
import Phone from "../../asstes/phone.svg";
import Send from "../../asstes/Sendbtn.svg";
import Attach from "../../asstes/Attachbtn.svg";
import Location from "../../asstes/locattionbtn.svg";
import { getAuth, signOut } from "firebase/auth";
import { db, fireapp } from "../../firebase";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  Timestamp,
  FieldValue,
  Firestore,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore/lite";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Dropdown,
  InputGroup,
} from "react-bootstrap";

const Message = (props) => {
  const [list, setlist] = useState("");
  const [mesglist, setmsglist] = useState("");
  const [uid, setUID] = useState("");
  const [docid, setdocid] = useState("");
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
    setdocid(props.DOCID);
  }, [null]);

  const Getdata = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const setdata = docSnap.data();
    setlist(setdata);
  };

  useEffect(() => {
    Getdata();
  }, [uid]);

  useEffect(() => {
    getmsg();
  }, [msg, , list]);

  const Msg = async () => {
    const docRef = doc(db, "users", uid, "ActivatedOrders", docid);
    const Holdref = collection(docRef, "Messages");
    addDoc(Holdref, {
      Message: msg,
      Time: time,
    });
    setMsg("");
  };

  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setTime(hours + ":" + min + ":" + sec);
  }, []);

  const getmsg = async () => {
    const getdata = await getDocs(
      collection(db, "users", uid, "ActivatedOrders", docid, "Messages")
    );
    setmsglist(
      getdata.docs.map((doc) => ({
        ...doc.data(),
        Message: doc.data().Message,
      }))
    );
  };

  // const getmsg = async () => {
  //   const colref = doc(db, "users", uid, "ActivatedOrders", docid);
  //   const docref = collection(colref, "Messages");
  //   const getmsgsonshot = await getDocs(docref, {
  //     Message: doc.data().Message,
  //   });
  //   setmsglist(getmsgsonshot);
  // };

  function stillavail() {
    setMsg("Is this rate still available?");
  }
  function whenwechat() {
    setMsg("When we chat?");
  }

  function canwetalk() {
    setMsg("Can we talk?");
  }

  return (
    <div className="hidescroll">
      <Col md={12}>
        <Row style={{ alignItems: "center" }}>
          <Col sm={1} className="mr-2" style={{ textAlign: "center" }}>
            <img
              style={{ borderRadius: "35px" }}
              className="profilrpic"
              src={list.Image}
              alt="Profile"
            ></img>
            <h6>{list.FirstName}</h6>
          </Col>
          <Col>
            <img src={Heart} className="heartfill" alt="Heart"></img>
            <img src={Heart} className="heartfill" alt="Heart"></img>
            <img src={Heart} className="heartfill" alt="Heart"></img>
            <img src={Heart} className="heartunfill" alt="Heart"></img>
            <img src={Heart} className="heartunfill" alt="Heart"></img>

            <h6 className="userinfo">Valiant, 499 CAD, Location?</h6>
            <h6 className="userinfo">
              Phone: {list.phoneNumber} Country : {list.Country}
            </h6>
            <h6 className="userinfo">Email:{list.Email} Prefer:chat</h6>
          </Col>
          <Col md={2} style={{ textAlign: "center" }}>
            <img className="phoneimg" src={Phone} alt="Phone"></img>
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  border: "1px solid #bebdbd",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="btndropdown"
                variant="Link"
                id="dropdown-basic"
              >
                Initiated
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <hr
          style={{
            color: "Gray",
            height: 1,
            margin: 0,
          }}
        />

        <Row className="chattxt">
          <Col className="msgs">
            <Row className="recivemsg">
              <p>Hello</p>
            </Row>

            {mesglist.length > 0
              ? mesglist.map((Task, key) => (
                  <Row key={key} className="sendmsg mt-2">
                    <Row className="sendmsgbg">
                      <p>{Task.Message}</p>
                    </Row>
                  </Row>
                ))
              : null}

            {/* <Row className="sendmsg mt-2">
              <p>
                Valiant, 499 CAD, Location? Phone: *****_****-1234 (Hidden)
                Country : IND Email:****@gmail.com(Hidden) Prefer:chat
              </p>
            </Row>

            <Row className="sendmsg mt-2">
              <p>
                Valiant, 499 CAD, Location? Phone: *****_****-1234 (Hidden)
                Country : IND Email:****@gmail.com(Hidden) Prefer:chat
              </p>
            </Row>
            <Row className="recivemsg">
              <p>Hello</p>
            </Row>

            <Row className="sendmsg mt-2">
              <p>
                Valiant, 499 CAD, Location? Phone: *****_****-1234 (Hidden)
                Country : IND Email:****@gmail.com(Hidden) Prefer:chat
              </p>
            </Row>

            <Row className="sendmsg mt-2">
              <p>
                Valiant, 499 CAD, Location? Phone: *****_****-1234 (Hidden)
                Country : IND Email:****@gmail.com(Hidden) Prefer:chat
              </p>
            </Row>

            <Row className="sendmsg mt-2">
              <p>
                Valiant, 499 CAD, Location? Phone: *****_****-1234 (Hidden)
                Country : IND Email:****@gmail.com(Hidden) Prefer:chat
              </p>
            </Row> */}
          </Col>
        </Row>

        <hr
          style={{
            color: "Gray",
            height: 1,
            margin: 0,
          }}
        />

        <Row className="prl-automsg">
          <Col className="rowmsg ">
            <Row>
              <Col
                onClick={stillavail}
                style={{
                  textAlign: "center",
                  border: "1px solid #bebdbd",
                  borderRadius: "6px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                md={1}
              >
                <h6>Is this rate still available?</h6>
              </Col>
              <Col
                onClick={whenwechat}
                style={{
                  textAlign: "center",
                  border: "1px solid #bebdbd",
                  borderRadius: "6px",
                  marginRight: "6px",
                  cursor: "pointer",
                }}
                md={1}
              >
                <h6>When we chat?</h6>
              </Col>
              <Col
                onClick={canwetalk}
                style={{
                  textAlign: "center",
                  border: "1px solid #bebdbd",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                md={1}
              >
                <h6>Can we talk?</h6>
              </Col>
            </Row>
            <Row className="mt-3 prl">
              <Col className="typebar" md={11}>
                <Row>
                  <Col md={11}>
                    <input
                      value={msg}
                      onChange={(e) => {
                        setMsg(e.target.value);
                      }}
                      style={{ height: "35px" }}
                      className="typebar"
                    ></input>
                  </Col>
                  <Col style={{ paddingTop: 2 }}>
                    <a
                      style={{
                        alignself: "center",
                        justifyContent: "space-between",
                        marginRight: "11px",
                      }}
                    >
                      <img
                        className="attachbtn"
                        src={Attach}
                        alt="Attach"
                      ></img>
                    </a>

                    <a>
                      <img
                        className="attachbtn"
                        src={Location}
                        alt="Location"
                      ></img>
                    </a>
                  </Col>
                </Row>
              </Col>

              <Col md={1}>
                <img
                  onClick={Msg}
                  className="sendbtn"
                  src={Send}
                  alt="Send"
                ></img>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Message;
