import React, { useState, useEffect } from "react";
import Profile from "../../asstes/Profilepic.png";
import Stars from "../../asstes/rattingstar.svg";
import Halfstar from "../../asstes/halfstar.svg";
import Delete from "../../asstes/delete.svg";
import { db } from "../../firebase";
import { doc, getDocs, collection } from "firebase/firestore/lite";
import { Row, Col, Tab, Container, Button } from "react-bootstrap";
import ContentLoader from "react-content-loader";
const User = (props) => {
  const [list, setlist] = useState("");
  const [uid, setUID] = useState("");
  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
  }, [null]);
  useEffect(() => {
    Getdata();
  }, [uid]);

  const Getdata = async () => {
    const getdata = await getDocs(collection(db, "users"));
    setlist(
      getdata.docs.map((doc) => ({
        ...doc.data(),
        FirstName: doc.data().FirstName,
        Image: doc.data().Image,
        PicAvailability: doc.data().PicAvailability,
      }))
    );
  };

  return (
    <div>
      <Row className="mt-2 " style={{ marginRight: 5 }}>
        <Col className="userbar">
          {list.length > 0 ? (
            list.map((Task, key) => (
              <Row key={key} className="mt-2">
                <Row className="m-2">
                  <Col md={3}>
                    <img
                      style={{ borderRadius: "35px" }}
                      className="profilrpic"
                      src={Task.Image}
                      alt="Profile"
                    />
                  </Col>
                  <Col style={{ lineHeight: "0.8" }} md={7}>
                    <h6>{Task.FirstName}</h6>
                    <span></span>
                    <br></br>
                    <Row>
                      <Col>
                        <img className="rating-fill" src={Stars} alt="Stars" />
                        <img className="rating-fill" src={Stars} alt="Stars" />
                        <img className="rating-fill" src={Stars} alt="Stars" />
                        <img
                          className="rating-unfill"
                          src={Stars}
                          alt="Stars"
                        />
                        <img
                          className="rating-unfill"
                          src={Stars}
                          alt="Stars"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    style={{
                      cursor: "pointer",
                      textAlign: "inherit",
                      alignSelf: "center",
                    }}
                    md={1}
                  >
                    <img
                      src={Halfstar}
                      style={{ alignSelf: "center" }}
                      alt="Halfstar"
                    />
                  </Col>
                  <Col
                    style={{
                      cursor: "pointer",
                      textAlign: "inherit",
                      alignSelf: "center",
                    }}
                    md={1}
                  >
                    <img src={Delete} alt="Delete" />
                  </Col>
                </Row>
              </Row>
            ))
          ) : list != [] ? (
            <h5 style={{ textAlign: "center" }}>
              There is No Orders Available!
            </h5>
          ) : (
            <ContentLoader
              height={140}
              speed={1}
              backgroundColor={"#333"}
              foregroundColor={"#999"}
              viewBox="0 0 380 70"
            >
              {/* Only SVG shapes */}
              <rect x="5" y="0" rx="5" ry="5" width="30" height="30" />
              <rect x="40" y="4" rx="4" ry="4" width="110" height="6" />
              <rect x="40 " y="20" rx="3" ry="3" width="110" height="6" />
            </ContentLoader>
          )}

          {/* <Row className="m-2">
            <Col md={3}>
              <img className="profilrpic" src={Profile} alt="Profile" />
            </Col>
            <Col style={{ lineHeight: "0.8" }} md={7}>
              <h6>husf</h6>
              <span>325</span>
              <br></br>
              <Row>
                <Col>
                  <img className="rating-fill" src={Stars} alt="Stars" />
                  <img className="rating-fill" src={Stars} alt="Stars" />
                  <img className="rating-fill" src={Stars} alt="Stars" />
                  <img className="rating-unfill" src={Stars} alt="Stars" />
                  <img className="rating-unfill" src={Stars} alt="Stars" />
                </Col>
              </Row>
            </Col>
            <Col
              style={{
                cursor: "pointer",
                textAlign: "inherit",
                alignSelf: "center",
              }}
              md={1}
            >
              <img
                src={Halfstar}
                style={{ alignSelf: "center" }}
                alt="Halfstar"
              />
            </Col>
            <Col
              style={{
                cursor: "pointer",
                textAlign: "inherit",
                alignSelf: "center",
              }}
              md={1}
            >
              <img src={Delete} alt="Delete" />
            </Col>
          </Row> */}
        </Col>
      </Row>
    </div>
  );
};

export default User;
