import "../App.css";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { auth, fireapp } from "../firebase";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  collection,
  Firestore,
  serverTimestamp,
} from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";
import axios from "axios";

function CreateOrder() {
  const navigate = useNavigate();

  const [updatelist, setupdatelist] = useState("");
  const [userdata, setuserdata] = useState("");
  const [State, setState] = useState([]);
  const [giveState, setgiveState] = useState([]);
  const [city, setCity] = useState([]);
  const [givecity, setgiveCity] = useState([]);
  const [data, setdata] = useState([]);
  const [givedata, setgivedata] = useState([]);
  const [country, setCountry] = useState();
  const [selectedstate, setselectedstate] = useState();
  const [selectedcity, setselectedcity] = useState();
  const [givecountry, setgiveCountry] = useState();
  const [giveselectedstate, setgiveselectedstate] = useState();
  const [giveselectedcity, setgiveselectedcity] = useState();
  const [useselectedstate, setuseState] = useState("");
  const [useselectedcity, setuseselectedcity] = useState("");
  const [selectedcountry, setselectedcountry] = useState("");
  const [usegiveselectedstate, setgiveuseState] = useState("");
  const [usegiveselectedcity, setgiveuseselectedcity] = useState("");
  const [giveselectedcountry, setgiveselectedcountry] = useState("");
  const [AddAmount, setAddAmount] = useState("");
  const [gooddate, setgooddate] = useState("");
  const [isloading, setisloading] = useState(false);

  const [giveammount, setgiveammount] = useState("");
  const [takeammount, settakeammount] = useState("");
  const [Cash, setCash] = useState(false);
  const [Bank, setBank] = useState(false);
  const [Any, setAny] = useState(false);
  const [takeCash, settakeCash] = useState(false);
  const [takeBank, settakeBank] = useState(false);
  const [takeAny, settakeAny] = useState(false);
  const [goodcheck, setgoodcheck] = useState(false);
  const [docid, setDocid] = useState("");

  function handleCashSource() {
    setCash(!Cash);
    console.log(!Cash);
  }
  function handleBankSource() {
    setBank(!Bank);
    console.log(!Bank);
  }
  function handleAnySource() {
    setAny(!Any);
    console.log(!Any);
  }

  function handletakeCashSource() {
    settakeCash(!takeCash);
    console.log(!takeCash);
  }
  function handletakeBankSource() {
    settakeBank(!takeBank);
    console.log(!takeBank);
  }
  function handletakeAnySource() {
    settakeAny(!takeAny);
    console.log(!takeAny);
  }

  function handleGooduntil() {
    setgoodcheck(!goodcheck);
    console.log(!goodcheck);
  }

  //   const [radiobtn, setradiobtn] = useState(true);

  const [uid, setUID] = useState("");
  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
    try {
      setDocid(window.location.search.split("&")[1].split("=")[1]);
    } catch (e) {
      setDocid(0);
      console.log(e);
    }
    console.log("User ID is:", uid);
    console.log("Doc ID is:", docid);
    console.log("Current Date is:", date);
  }, [null]);

  const Getdata = async () => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const setdata = docSnap.data();
    setuserdata(setdata);
  };

  useEffect(() => {
    Getdata();
  }, [uid]);

  const PutonHold = async () => {
    const docRef = doc(db, "users", uid);
    const Holdref = collection(docRef, "PutonHoldOrders");
    addDoc(Holdref, {
      GiveAmmount: giveammount,
      GiveCity: useselectedcity,
      GiveState: useselectedstate,
      GiveCountry: selectedcountry,
      TakeAmmount: takeammount,
      TakeCity: usegiveselectedcity,
      TakeState: usegiveselectedstate,
      TakeCountry: giveselectedcountry,
      GiveThroughCash: Cash,
      GiveThroughBank: Bank,
      GiveThroughAny: Any,
      TakeThroughCash: takeCash,
      TakeThroughBank: takeBank,
      TakeThroughAny: takeAny,
      AdditionalAmmount: AddAmount,
      UntilGoodDate: gooddate,
      untilcheck: goodcheck,
      HoldTime: date,
    });
    setisloading(true);
    setTimeout(() => {
      navigate(`/OrderCom?ID=${uid}`);
    }, 3000);
  };

  const Updatedoc = async () => {
    const colref = doc(db, "users", uid, "ActivatedOrders", docid);
    updateDoc(colref, {
      GiveAmmount: giveammount,
      GiveCity: useselectedcity,
      GiveState: useselectedstate,
      GiveCountry: selectedcountry,
      TakeAmmount: takeammount,
      TakeCity: usegiveselectedcity,
      TakeState: usegiveselectedstate,
      TakeCountry: giveselectedcountry,
      GiveSourceCash: Cash,
      GiveSourceBank: Bank,
      GiveSourceAny: Any,
      TakeThroughCash: takeCash,
      TakeThroughBank: takeBank,
      TakeThroughAny: takeAny,
      AdditionalAmmount: AddAmount,
      UntilGoodDate: gooddate,
      untilcheck: goodcheck,
      ActivateTime: date,
    });
    setisloading(true);
    setTimeout(() => {
      navigate(`/OrderCom?ID=${uid}`);
    }, 2000);
  };

  const AddCity = async () => {
    const colref = doc(db, "users", uid);
    setDoc(colref, {
      GiveCity: useselectedcity,
      TakeCity: usegiveselectedcity,
    });
    setTimeout(() => {
      window.location.href = `/OrderCom?ID=${uid}`;
    }, 2000);
  };

  const Activate = async () => {
    const docRef = doc(db, "users", uid);
    const Holdref = collection(docRef, "ActivatedOrders");
    addDoc(Holdref, {
      GiveAmmount: giveammount,
      GiveCity: useselectedcity,
      GiveState: useselectedstate,
      GiveCountry: selectedcountry,
      TakeAmmount: takeammount,
      TakeCity: usegiveselectedcity,
      TakeState: usegiveselectedstate,
      TakeCountry: giveselectedcountry,
      GiveSourceCash: Cash,
      GiveSourceBank: Bank,
      GiveSourceAny: Any,
      TakeThroughCash: takeCash,
      TakeThroughBank: takeBank,
      TakeThroughAny: takeAny,
      AdditionalAmmount: AddAmount,
      UntilGoodDate: gooddate,
      untilcheck: goodcheck,
      ActivateTime: date,
    });
    const useref = doc(db, "users", uid);
    updateDoc(useref, {
      GiveCity: useselectedcity,
      TakeCity: usegiveselectedcity,
    });
    setisloading(true);
    setTimeout(() => {
      navigate(`/OrderCom?ID=${uid}`);
    }, 3000);
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  // }
  // function TakeData() {
  //   const docRef = doc(db, "users", uid);
  //   const colRef = collection(docRef, "TakeData");
  //   addDoc(colRef, {
  //     TakeAmmount: takeammount,
  //     TakeCity: giveselectedcity,
  //     TakeState: giveselectedstate,
  //     TakeCountry: giveselectedcountry,
  //   });
  // }

  useEffect(() => {
    axios
      .get(
        `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
      )
      .then((res) => setgivedata(res.data))
      .then(() => setdata(givedata))
      .catch((err) => console.log(err));
  }, [givedata]);

  const Country = [...new Set(data.map((item) => item.country))];
  Country.sort();
  const handleCountry = (e) => {
    setselectedcountry(e.target.value);
    console.log(`The Selected Country is ${e.target.value}`);
    let states = data.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
    console.log("States are :", State);
  };
  const handleState = (e) => {
    setuseState(e.target.value);
    console.log(`The Selected State is ${e.target.value}`);
    let cities = data.filter((data) => data.subcountry === e.target.value);
    console.log("Cities are :", cities);
    cities.sort();
    setCity(cities);
  };

  const handleCity = (e) => {
    setuseselectedcity(e.target.value);
    console.log(`The Selected City is ${e.target.value}`);
  };

  const GiveCountry = [...new Set(givedata.map((item) => item.country))];
  GiveCountry.sort();
  const changecountry = (e) => {
    setgiveselectedcountry(e.target.value);
    console.log(`The Selected Country is ${e.target.value}`);
    let states = givedata.filter((state) => state.country === e.target.value);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setgiveState(states);
    console.log("States are :", giveState);
  };
  const changestate = (e) => {
    setgiveuseState(e.target.value);
    console.log(`The Selected State is ${e.target.value}`);
    let cities = givedata.filter((data) => data.subcountry === e.target.value);
    console.log("Cities are :", cities);
    cities.sort();
    setgiveCity(cities);
  };

  const changecity = (e) => {
    setgiveuseselectedcity(e.target.value);
    console.log(`The Selected City is ${e.target.value}`);
  };

  // useEffect(() => {
  //   getmsg();
  // }, [docid]);

  // const getmsg = async () => {
  //   if (docid != 0) {
  //     console.log("Get Doc Function Called");
  //     const docRef = doc(db, "users", uid, "ActivatedOrders", docid);
  //     const docSnap = await getDoc(docRef);
  //     const setdata = docSnap.data();
  //     setupdatelist(setdata);
  //     console.log("Settings updated");
  //     console.log("Update list is", updatelist);
  //     setgiveammount(updatelist.GiveAmmount);
  //     setselectedcountry(updatelist.GiveCountry);
  //     setuseState(updatelist.GiveState);
  //     setuseselectedcity(updatelist.GiveCity);
  //     settakeammount(updatelist.TakeAmmount);
  //     setgiveuseselectedcity(updatelist.TakeCity);
  //     setgiveuseState(updatelist.TakeState);
  //     setgiveselectedcountry(updatelist.TakeCountry);
  //   }
  // };

  return (
    <div>
      {isloading ? (
        <div className="bgloading">
          <Loading />
        </div>
      ) : null}
      <div>
        <div className="">
          <Row className="centeritem">
            <Col md={6} className="formbg mt-5 mb-5">
              <Form className="forminput radius">
                {/* <--------------------------------I Want to Give :--------------------> */}

                <h5 className=" mb-3">I Want to Give :</h5>
                <div className="border p-3">
                  <Row className="textcenter">
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select aria-label="Default select example">
                          <option>Currency</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          onChange={(e) => {
                            setgiveammount(e.target.value);
                            console.log(`Password is ${e.target.value}`);
                          }}
                          value={giveammount}
                          aria-label="Amount"
                          placeholder="Amount"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="textcenter">
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          onChange={(e) => handleCountry(e)}
                          aria-label="Default select example"
                        >
                          <option>Country</option>
                          {Country.map((item, key) => (
                            <option value={country} key={item}>
                              {item}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          onChange={(e) => handleState(e)}
                          aria-label="Default select example"
                        >
                          <option>State/Province</option>
                          {State.map((items, key) => (
                            <option value={selectedstate} key={items}>
                              {items}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          onChange={(e) => handleCity(e)}
                          aria-label="Default select example"
                        >
                          <option>City</option>
                          {city.map((items, key) => (
                            <option value={selectedcity} key={items.name}>
                              {items.name}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="mt-2">
                      <input
                        onClick={handleCashSource}
                        checked={Cash}
                        type={"checkbox"}
                        className=""
                      />{" "}
                      Cash
                      <input
                        onClick={handleBankSource}
                        checked={Bank}
                        type={"checkbox"}
                        className="chkbox "
                      />{" "}
                      Bank
                      <input
                        onClick={handleAnySource}
                        checked={Any}
                        type={"checkbox"}
                        className="chkbox "
                      />{" "}
                      Any
                    </Col>
                  </Row>
                </div>

                {/* <--------------------------------I Want to Take :--------------------> */}

                <h6 style={{ fontSize: 18 }} className=" mt-4">
                  I Want to Take :
                </h6>
                <div className="border p-3 mt-3">
                  <Row>
                    <Col></Col>
                  </Row>

                  <Row className="textcenter">
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select aria-label="Default select example">
                          <option>Currency</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          onChange={(e) => {
                            settakeammount(e.target.value);
                            console.log(`Password is ${e.target.value}`);
                          }}
                          value={takeammount}
                          aria-label="Amount"
                          placeholder="Amount"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="textcenter">
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          onChange={(e) => changecountry(e)}
                          aria-label="Default select example"
                        >
                          <option>Country</option>
                          {GiveCountry.map((item, key) => (
                            <option value={givecountry} key={item}>
                              {item}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          onChange={(e) => changestate(e)}
                          aria-label="Default select example"
                        >
                          <option>State/Province</option>
                          {giveState.map((items, key) => (
                            <option value={giveselectedstate} key={items}>
                              {items}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          onChange={(e) => changecity(e)}
                          aria-label="Default select example"
                        >
                          <option>City</option>
                          {givecity.map((items, key) => (
                            <option value={giveselectedcity} key={items.name}>
                              {items.name}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col>
                      <lable>Suggested Account</lable>
                      <InputGroup className="mb-3">
                        <Form.Control
                          disabled={true}
                          aria-label="Curr+Auto filled"
                          placeholder="Curr+Auto filled"
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <lable>Best Google Account</lable>
                      <InputGroup className="mb-3">
                        <Form.Control
                          disabled={true}
                          aria-label="Curr+Auto filled"
                          placeholder="Curr+Auto filled"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Row>
                      <Col className="mt-2">
                        <input
                          onClick={handletakeCashSource}
                          checked={takeCash}
                          type={"checkbox"}
                          className=""
                        />{" "}
                        Cash
                        <input
                          onClick={handletakeBankSource}
                          checked={takeBank}
                          type={"checkbox"}
                          className="chkbox "
                        />{" "}
                        Bank
                        <input
                          onClick={handletakeAnySource}
                          checked={takeAny}
                          type={"checkbox"}
                          className="chkbox "
                        />{" "}
                        Any
                      </Col>
                    </Row>
                  </Row>
                </div>

                {/* <--------------------------------Add Aditional Info--------------------> */}

                <h6 style={{ fontSize: 18 }} className=" mt-4">
                  Add Aditional Info
                </h6>
                <div className="border p-3 mt-3">
                  <Row>
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          onChange={(e) => {
                            setAddAmount(e.target.value);
                            console.log(
                              `Additional Ammount is ${e.target.value}`
                            );
                          }}
                          value={AddAmount}
                          aria-label="Like min. or max. ammounts you want to  transact"
                          placeholder="Like min. or max. ammounts you want to  transact"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <input
                        onClick={handleGooduntil}
                        checked={goodcheck}
                        type={"checkbox"}
                        className="mb-5 mt-3"
                      />{" "}
                      Good Until
                    </Col>
                    <Col md={9}>
                      <InputGroup className="">
                        <Form.Control
                          onChange={(e) => {
                            setgooddate(e.target.value);
                            console.log(
                              `Additional Ammount is ${e.target.value}`
                            );
                          }}
                          value={gooddate}
                          aria-label="dd/mm/yyyy"
                          placeholder="dd/mm/yyyy"
                        />
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row
                    style={{
                      textAlign: "Right",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    <p>All orders expires in 30 days unless refreshed</p>
                  </Row>

                  <Row>
                    <Col style={{ fontSize: "16px", fontWeight: "700" }}>
                      <p>Current Google rate</p>
                    </Col>
                    <Col
                      style={{
                        textAlign: "Right",
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      <p>1 USD = 1.24 CAD</p>
                    </Col>
                  </Row>
                </div>
                <Row className=" mt-3">
                  <Col>
                    <Button
                      onClick={PutonHold}
                      variant="warning"
                      className="btnlogin"
                    >
                      Put on HOLD
                    </Button>
                  </Col>
                  {docid.length > 0 ? (
                    <Col style={{ textAlign: "right" }}>
                      <Button
                        onClick={Updatedoc}
                        variant="success"
                        className="btnlogin"
                      >
                        Update
                      </Button>
                    </Col>
                  ) : (
                    <Col style={{ textAlign: "right" }}>
                      <Button
                        onClick={Activate}
                        variant="success"
                        className="btnlogin"
                      >
                        Activate this order
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
