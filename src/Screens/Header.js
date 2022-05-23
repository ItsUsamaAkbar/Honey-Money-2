import "../App.css";
import { Row, Navbar, Container, Nav, Col } from "react-bootstrap";
import Logo from "../asstes/HoneyLogo.svg";
import { useNavigate } from "react-router-dom";
import Notify from "../asstes/notifywithdot.svg";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, collection } from "firebase/firestore/lite";

function Header() {
  const navigate = useNavigate();

  const [list, setlist] = useState("");
  const [uid, setUID] = useState("");

  //   const [radiobtn, setradiobtn] = useState(true);

  //   const [radiobtn, setradiobtn] = useState(true);

  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
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

  function signout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      window.location.href = `/`;
    });
  }

  return (
    <div className="">
      <Row className="centeritem">
        <Navbar collapseOnSelect expand="lg" className="bgnav" variant="dark">
          <Container>
            <Col md={3}>
              <Navbar.Brand href="#home">
                {" "}
                <img src={Logo} className="Logo" alt="Logo" />
              </Navbar.Brand>
            </Col>
            <Col md={9} style={{ justifyContent: "space-between" }}>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="">
                  <Nav.Link
                    href="#features"
                    onClick={() => {
                      navigate(`/OrderCom?ID=${uid}`);
                    }}
                  >
                    My Orders
                  </Nav.Link>
                  <Nav.Link
                    href="#Matches"
                    onClick={() => {
                      navigate(`/Matche?ID=${uid}`);
                    }}
                  >
                    Matches
                  </Nav.Link>
                  <Nav.Link
                    href="#Finalize"
                    onClick={() => {
                      navigate(`/Chatepage?ID=${uid}`);
                    }}
                  >
                    Finalize
                  </Nav.Link>
                  <Nav.Link
                    href="#Watchlist"
                    onClick={() => {
                      navigate(`/Watchlist?ID=${uid}`);
                    }}
                  >
                    Watchlist
                  </Nav.Link>
                  <Nav.Link
                    href="#MC"
                    onClick={() => {
                      navigate(`/Matche?ID=${uid}`);
                    }}
                  >
                    MC
                  </Nav.Link>
                  <Nav.Link
                    href="#Tips"
                    onClick={() => {
                      navigate(`/Matche?ID=${uid}`);
                    }}
                  >
                    Tips
                  </Nav.Link>
                </Nav>

                <Col md={3}>
                  <div style={{ textAlign: "end" }}>
                    <Row className="mt-2">
                      <Col>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={signout}
                          className="user-name"
                        >
                          {list.FirstName}
                        </p>
                      </Col>
                      <Col md={1}>
                        <a href="#deets">
                          <img
                            src={Notify}
                            className="notify"
                            style={{ width: 20, height: 25.5 }}
                            alt="logo"
                          />
                        </a>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Navbar.Collapse>
            </Col>
          </Container>
        </Navbar>
      </Row>
    </div>
  );
}

export default Header;
