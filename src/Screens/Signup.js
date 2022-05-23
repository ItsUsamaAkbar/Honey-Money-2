import Location from "../asstes/Location.svg";
import Upload from "../asstes/Uploadimg.svg";
import "../App.css";
import { Row, Col, Form, Button, InputGroup, Stack } from "react-bootstrap";
import React, { createElement, useEffect, useState, useRef } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [uid, setuid] = useState("");
  const [list, setlist] = useState([]);
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState();
  const [selectedcountry, setselectedcountry] = useState("");
  const [selectedcountryID, setselectedcountryID] = useState("");
  const [State, setState] = useState([]);
  const [selectedstate, setselectedstate] = useState();
  const [useselectedstate, setuseState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedcity, setselectedcity] = useState();
  const [useselectedcity, setuseselectedcity] = useState("");
  const [countryID, setCountryID] = useState();
  const [firstname, setFirtName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [UserName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [skype, setSkype] = useState("");
  const [rates, setRates] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailerr, setEmailerror] = useState("");
  const [passworderr, setPassworderror] = useState("");
  const [data, setdata] = useState([]);
  const [dataid, setdataid] = useState("");
  const [image, setImage] = useState("");
  const [IDimage, setIDImage] = useState("");
  const imageRef = useRef(null);
  const IDimageRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [agreechecked, setagreeChecked] = useState(false);
  const [Picinpublic, setPicinpublic] = useState(false);
  const [IDinpublic, setIDinpublic] = useState(false);
  const [passcheck, setpasscheck] = useState("");
  const [agreeerr, setagreeerr] = useState("");

  function handleClick() {
    setChecked(!checked);
    console.log(!checked);
  }

  function handleagreeClick() {
    setagreeChecked(!agreechecked);
    console.log(!agreechecked);
  }
  function handlePicinPublic() {
    setPicinpublic(!Picinpublic);
    console.log(!Picinpublic);
  }
  function handleIDinPublic() {
    setIDinpublic(!IDinpublic);
    console.log(!IDinpublic);
  }

  // const GetCountries = async () => {
  //   const docRef = doc(db, "Countries", "E8bgftlrB1fvRoinjLp0");
  //   const docSnap = await getDoc(docRef);
  //   const setdata = docSnap.data();
  //   setlist(setdata.Phone);
  //   console.log("list is", setdata.Phone);
  // };
  // function submit() {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((register) => {
  //       setDoc(doc(db, "users", register.user.uid), {
  //         UID: register.user.uid,
  //         email: register.user.email,
  //         FirstName: firstname,
  //         MiddleName: middlename,
  //         LastName: lastname,
  //         Mobilenumber: mobilenumber,
  //         phoneNumber: phoneNumber,
  //         UserName: UserName,
  //         ConfirmPassword: confirmpassword,
  //         Country: selectedcountry,
  //         Province: useselectedstate,
  //         City: useselectedcity,
  //         IDCountry: countryid,
  //         Address: address,
  //         Website: website,
  //         SkypeID: skype,
  //         SampleRates: rates,
  //       });
  //     })
  //     .catch((err) => {
  //       switch (err.code) {
  //         case "auth/email-already-in-use":
  //           setEmailerror("*Your E-mail is already Registered");
  //           break;
  //         case "auth/invalid-email":
  //           setEmailerror("*Your E-mail or Password is badly formatted");
  //           break;
  //         case "auth/weak-password":
  //           setPassworderror(err.message);
  //       }
  //     });
  // }

  const addUser = async () => {
    if (agreechecked !== true) {
      setagreeerr("Please Confirm our Terms  and Policies");
      setTimeout(() => {
        setagreeerr("");
      }, 6000);
    } else if (confirmpassword !== password) {
      setpasscheck("Your Password doesn't match");
      setTimeout(() => {
        setpasscheck("");
      }, 6000);
    } else if (password.length === 0) {
      setEmailerror("You Can't remain your password Empty");
      setTimeout(() => {
        setEmailerror("");
      }, 6000);
    } else if (email.length === 0) {
      setEmailerror("You Can't remain your E-mail Empty");
      setTimeout(() => {
        setEmailerror("");
      }, 6000);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((per) => {
          setuid(per.user.uid);
          console.log("User ID is :", per.user.uid);
          setDoc(doc(db, "users", per.user.uid), {
            ID: per.user.uid,
            Email: per.user.email,
            FirstName: firstname,
            MiddleName: middlename,
            LastName: lastname,
            Mobilenumber: mobilenumber,
            phoneNumber: phoneNumber,
            UserName: UserName,
            ConfirmPassword: confirmpassword,
            Country: selectedcountry,
            Province: useselectedstate,
            City: useselectedcity,
            CountrywhereGovernmentIDIssued: selectedcountryID,
            Address: address,
            Website: website,
            SkypeID: skype,
            SampleRates: rates,
            Image: result,
            IDImage: IDresult,
            ServicesofMC: checked,
            PicAvailability: Picinpublic,
            IDAvailability: IDinpublic,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 4000);
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-not-found":
            case "auth/wrong-password":
              setEmailerror("Your E-mail or Password is incorrect");
              setTimeout(() => {
                setEmailerror("");
              }, 6000);
              break;
            case "auth/email-already-exists":
            case "auth/email-already-in-use":
              setEmailerror("Your E-mail is Already Registered");
              setTimeout(() => {
                setEmailerror("");
              }, 6000);
              break;
            case "Wrong Password":
              setPassworderror(err.message);
          }
        });
    }
  };

  // useEffect(() => {
  //   if (confirmpassword != password)
  //     setPassworderror("Your Password is not matched");
  //   else console.log("Password Mtched");
  // }, [confirmpassword]);

  // useEffect(() => {
  //   GetCountries();
  // }, [null]);
  useEffect(() => {
    axios
      .get(
        `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
      )
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, [null]);

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
  // function getlocation() {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       console.log(position);
  //       setLocation(position);
  //       console.log("Location is :", location);
  //     },
  //     function (error) {
  //       console.error("Error Code = " + error.code + " - " + error.message);
  //     }
  //   );
  // }

  const handleCountryID = (e) => {
    setselectedcountryID(e.target.value);
    console.log(`The Selected Country ID is ${e.target.value}`);
  };

  function useDisplayImage() {
    const [result, setResult] = useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }
  const { result, uploader } = useDisplayImage();

  // ---------------------------------------------------------------------
  function useIDDisplayImage() {
    const [IDresult, setIDResult] = useState("");

    function IDuploader(e) {
      const IDimageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setIDResult(e.target.result);
      });

      reader.readAsDataURL(IDimageFile);
    }

    return { IDresult, IDuploader };
  }
  const { IDresult, IDuploader } = useIDDisplayImage();

  return (
    <div className="mainbg">
      <Row className="centeritem">
        <Col md={6} className="formbg">
          <Form className="forminput radius">
            <Row className="textcenter">
              <h2>Signup Form</h2>
            </Row>
            <h5 className=" mb-3">Mandatory Data</h5>
            <div className="border p-3">
              <Row className="textcenter">
                <p>{list.ID}</p>
                <InputGroup defaultValue={location} className="mb-3">
                  <Form.Control
                    aria-label="Current Location"
                    placeholder="Current Location"
                  />
                  <InputGroup.Text className="inputicon">
                    <img src={Location} alt="logo" />
                  </InputGroup.Text>
                </InputGroup>
              </Row>

              <Row className="textcenter mb-3">
                <Col sm={6}>
                  <Form.Select
                    // value={country}
                    onChange={(e) => handleCountry(e)}
                    aria-label="Country"
                  >
                    <option>Select Country</option>
                    {Country.map((item, key) => (
                      <option value={country} key={item}>
                        {item}{" "}
                      </option>
                    ))}
                    {/* {list.length > 0
                      ? list.map((Country) => (
                          <option value={Country}>{Country}</option>
                        ))
                      : null} */}
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Select
                    onChange={(e) => handleState(e)}
                    aria-label="State/Province"
                  >
                    <option>State/Province</option>
                    {State.map((items, key) => (
                      <option value={selectedstate} key={items}>
                        {items}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Select
                    onChange={(e) => handleCity(e)}
                    aria-label="City"
                  >
                    <option>City</option>
                    {city.map((items, key) => (
                      <option value={selectedcity} key={items.name}>
                        {items.name}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row>
                <Col className="inline mt-2">
                  <p>Are you an </p>
                  <input
                    value={"Indiviadual"}
                    className="mt-1 mleft"
                    type={"radio"}
                  />{" "}
                  Individual
                  <input
                    value={"Corporation"}
                    type={"radio"}
                    className="mt-1 mleft"
                  />{" "}
                  Corporation
                </Col>
              </Row>

              {/* {result && <img ref={imageRef} src={result} alt="" />} */}
              <Row>
                <Col>
                  <h6 style={{ fontSize: 18 }}>
                    Confidential Data (will not be shared)
                  </h6>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <lable>Country where Government ID issued</lable>
                </Col>
              </Row>

              <Row className="mt-1">
                <Col>
                  <Form.Select
                    onChange={(e) => handleCountryID(e)}
                    aria-label="Default select example"
                  >
                    <option>Country</option>
                    {Country.map((item, key) => (
                      <option value={country} key={item}>
                        {item}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <lable>
                    Name of person or Corporation as per Government records
                  </lable>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="FirstName">
                    <Form.Control
                      onChange={(e) => {
                        setFirtName(e.target.value);
                        console.log(`First Name is ${e.target.value}`);
                      }}
                      value={firstname}
                      type="text"
                      placeholder="First Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="MiddleName">
                    <Form.Control
                      onChange={(e) => {
                        setMiddleName(e.target.value);
                        console.log(`Middle Name is ${e.target.value}`);
                      }}
                      value={middlename}
                      type="Middle Name"
                      placeholder="Middle Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="LastName">
                    <Form.Control
                      onChange={(e) => {
                        setLastName(e.target.value);
                        console.log(`Last Name is ${e.target.value}`);
                      }}
                      value={lastname}
                      type="text"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={8}>
                  <Form.Group className="mb-3" controlId="E-mail">
                    <Form.Control
                      onChange={(e) => {
                        setEmail(e.target.value);
                        console.log(`E-mail is ${e.target.value}`);
                      }}
                      value={email}
                      type="text"
                      placeholder="E-mail"
                    />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Button variant="success" className="btnlogin" type="submit">
                    Verify
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <lable>Mobile number</lable>
                  </Row>
                  <Row>
                    <Col sm={2}>
                      <Form.Select aria-label="Country">
                        <option>Country</option>
                        {list.length > 0
                          ? list.map((Phone) => (
                              <option value={Phone}>{Phone}</option>
                            ))
                          : null}
                      </Form.Select>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="LastName">
                        <Form.Control
                          onChange={(e) => {
                            setMNumber(e.target.value);
                            console.log(`Mobile no. is ${e.target.value}`);
                          }}
                          value={mobilenumber}
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Button
                        variant="success"
                        className="btnlogin"
                        type="submit"
                      >
                        Verify
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <lable>Other Phone</lable>
                  </Row>
                  <Row>
                    <Col sm={2}>
                      <Form.Select aria-label="Country">
                        <option>Country</option>
                        {list.length > 0
                          ? list.map((Phone) => (
                              <option value={Phone}>{Phone}</option>
                            ))
                          : null}
                      </Form.Select>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3" controlId="LastName">
                        <Form.Control
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            console.log(`Phone Number is ${e.target.value}`);
                          }}
                          value={phoneNumber}
                          type="text"
                          placeholder=""
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="PreferredUserName">
                    <Form.Control
                      onChange={(e) => {
                        setUsername(e.target.value);
                        console.log(`Username is ${e.target.value}`);
                      }}
                      value={UserName}
                      type="text"
                      placeholder="Preferred UserName"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <lable>Password</lable>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        onChange={(e) => {
                          setPassword(e.target.value);
                          console.log(`Password is ${e.target.value}`);
                        }}
                        value={password}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        console.log(`Confirm Password is ${e.target.value}`);
                      }}
                      value={confirmpassword}
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Form.Group>
                  <h6 style={{ marginBottom: 14, color: "red" }}>
                    {passcheck}
                  </h6>
                </Col>
                <div className="invalid-feedback"></div>
                <h6 style={{ marginBottom: 14, color: "red" }}>
                  {passworderr}
                </h6>
              </Row>

              <Row>
                <Col>
                  <input
                    onClick={handleClick}
                    checked={checked}
                    type={"checkbox"}
                  />{" "}
                  I would like to provide services as a Money Changer (MC) and
                  get my name listed on Honey Money
                </Col>
              </Row>
            </div>

            <Row className="mt-3">
              <Col>
                <h5 className="  mb-3"> Optional Data</h5>
              </Col>
            </Row>
            <div className="border p-3">
              <Row>
                <Col>
                  <p>
                    A complete profile will bump you up in Search Results and is
                    recommended
                  </p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Row>
                    <Col style={{ width: "20vh" }}>
                      <input
                        style={{ marginBottom: "6px" }}
                        type="file"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          uploader(e);
                        }}
                      />
                      <Button
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                          uploader(e);
                        }}
                        className="btnupload"
                      >
                        {result && (
                          <img
                            style={{ height: 130, width: 170 }}
                            ref={imageRef}
                            src={result}
                            alt=""
                          />
                        )}
                        <p className="btntxt">Upload photograph</p>
                      </Button>
                    </Col>
                  </Row>
                  <Row
                    className="checkboximg mb-4"
                    style={{ marginTop: -50, marginLeft: 1 }}
                  >
                    <Col>
                      <input
                        onClick={handleIDinPublic}
                        checked={IDinpublic}
                        type={"checkbox"}
                      />{" "}
                      Show in public
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col style={{ width: "235px" }}>
                      <input
                        style={{ marginBottom: "6px" }}
                        type="file"
                        onChange={(e) => {
                          setIDImage(e.target.files[0]);
                          IDuploader(e);
                        }}
                      />
                      <Button
                        onChange={(e) => {
                          setIDImage(e.target.files[0]);
                          IDuploader(e);
                        }}
                        className="btnupload"
                      >
                        {IDresult && (
                          <img
                            style={{ height: 130, width: 170 }}
                            ref={IDimageRef}
                            src={IDresult}
                            alt="IDImage"
                          />
                        )}
                        <p className="btntxt">
                          Upload Government ID (like Drivers License, Passport,
                          Company Registration)
                        </p>
                      </Button>
                    </Col>
                  </Row>
                  <Row
                    className="checkboximg mb-4"
                    style={{ marginTop: -50, marginLeft: 1 }}
                  >
                    <Col>
                      <input
                        onClick={handlePicinPublic}
                        checked={Picinpublic}
                        type={"checkbox"}
                      />{" "}
                      Show in public
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Button className="btnuploadimg p-0">
                    <img
                      src={Upload}
                      alt="logo"
                      style={{ width: "105px", height: 150, marginTop: "27px" }}
                    />
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Address">
                    <Form.Control
                      onChange={(e) => {
                        setAddress(e.target.value);
                        console.log(`Address is ${e.target.value}`);
                      }}
                      value={address}
                      type="text"
                      placeholder="Address"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Website">
                    <Form.Control
                      onChange={(e) => {
                        setWebsite(e.target.value);
                        console.log(`Website is ${e.target.value}`);
                      }}
                      value={website}
                      type="text"
                      placeholder="Website"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row></Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Skype ID">
                    <Form.Control
                      onChange={(e) => {
                        setSkype(e.target.value);
                        console.log(`SkypeID is ${e.target.value}`);
                      }}
                      value={skype}
                      type="text"
                      placeholder="Skype ID"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="Sample Competitive rates*"
                  >
                    <Form.Control
                      onChange={(e) => {
                        setRates(e.target.value);
                        console.log(`Sample Rates is ${e.target.value}`);
                      }}
                      value={rates}
                      type="text"
                      placeholder="Sample Competitive rates*"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <input
                    onClick={handleagreeClick}
                    checked={agreechecked}
                    type={"checkbox"}
                    className="mb-3"
                  />{" "}
                  I agree to the Terms and Policy
                </Col>
                <h6 style={{ marginBottom: 14, color: "red" }}>{agreeerr}</h6>
              </Row>

              <h6 style={{ marginBottom: 14, color: "red" }}>{emailerr}</h6>
              <Button onClick={addUser} variant="success" className="btnlogin">
                Submit
              </Button>
              <p className="text-form  mt-3">
                Have an account? <a href="/"> Login Here</a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
