import React, { useState, useEffect } from "react";
import User from "./User";
import Msg from "./message";
import {
  Row,
  Col,
  Tabs,
  Tab,
  Container,
  Button,
  Dropdown,
} from "react-bootstrap";
import { doc, getDocs, collection } from "firebase/firestore/lite";
import { db } from "../../firebase";
import ContentLoader from "react-content-loader";
const Chatpage = (props) => {
  const [key, setKey] = useState("home");
  const [activelist, setactivelist] = useState("");
  const [holdlist, setholdlist] = useState("");
  const [uid, setUID] = useState("");

  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
  }, [null]);
  useEffect(() => {
    GetActivedata();
    // GetHolddata();
  }, [uid]);

  const GetActivedata = async () => {
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
    }));
    setactivelist(tasklist);
  };

  // const GetHolddata = async () => {
  //   console.log("uid in getdata");
  //   console.log(uid);
  //   const docRef = doc(db, "users", uid);
  //   const colRef = collection(docRef, "PutonHoldOrders");
  //   const tasksnapshot = await getDocs(colRef);
  //   const tasklist = tasksnapshot.docs.map((doc) => ({
  //     GiveAmmount: doc.data().GiveAmmount,
  //     GiveCity: doc.data().GiveCity,
  //     GiveState: doc.data().GiveState,
  //     GiveCountry: doc.data().GiveCountry,
  //     TakeAmmount: doc.data().TakeAmmount,
  //     TakeCity: doc.data().TakeCity,
  //     TakeState: doc.data().TakeState,
  //     TakeCountry: doc.data().TakeCountry,
  //     GiveThroughCash: doc.data().GiveThroughCash,
  //     GiveThroughBank: doc.data().GiveThroughBank,
  //     GiveThroughAny: doc.data().GiveThroughAny,
  //     TakeThroughCash: doc.data().TakeThroughCash,
  //     TakeThroughBank: doc.data().TakeThroughBank,
  //     TakeThroughAny: doc.data().TakeThroughAny,
  //     HoldTime: doc.data().HoldTime,
  //   }));
  //   setholdlist(tasklist);
  //   console.log("Hold List is:", holdlist);
  // };

  return (
    <div>
      <Row>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          {activelist.length > 0
            ? activelist.map((Task, key) => (
                <Tab
                  key={key}
                  eventKey={Task.TakeCity}
                  title={Task.TakeCity}
                  //  {Task.GiveCountry,Task.GiveAmmount}
                >
                  <Row key={key}>
                    <Col sm={3} className="pr-2 right-bdr user-scroll">
                      <Row className="selecteduser">
                        <User />
                      </Row>
                    </Col>
                    <Col sm={9} className="">
                      <Msg DOCID={Task.id} />
                    </Col>
                  </Row>
                </Tab>
              ))
            : null}
        </Tabs>

        {/* <Tab
            eventKey="{Task.TakeCsity}"
            title="{Task.TakeCity}"
            //  {Task.GiveCountry,Task.GiveAmmount}
          >
            <Row>
              <Col sm={3} className="pr-2 right-bdr user-scroll">
                <Row className="selecteduser">
                  <User />
                </Row>
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
              </Col>
              <Col sm={9} className="">
                <Msg />
              </Col>
            </Row>
          </Tab> */}
        {/* <Tab
            eventKey="CAD Canada 500
               🡪 USD Zim 450"
            title="{Task.TakeCity}"
            //  {Task.GiveCountry,Task.GiveAmmount}
          >
            <Row>
              <Col sm={3} className="pr-2 right-bdr user-scroll">
                <Row className="selecteduser">
                  <User />
                </Row>
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
                <User />
              </Col>
              <Col sm={9} className="">
                <Msg />
              </Col>
            </Row>
          </Tab> */}
        <hr
          style={{
            color: "Gray",
            height: 1,
            margin: 0,
          }}
        />
        {/* <Col sm={3} className="pr-2 right-bdr user-scroll">
          <Row className="selecteduser">
            <User />
          </Row>
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
          <User />
        </Col> */}
        {/* <Col sm={9} className="">
          <Msg />
        </Col> */}
      </Row>
    </div>
  );
};

export default Chatpage;
