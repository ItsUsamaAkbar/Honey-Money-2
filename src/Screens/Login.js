import logo from "../asstes/Logoapp.png";
import "../App.css";
import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerror] = useState("");
  const [passworderr, setPassworderror] = useState("");
  const [sinedin, setSingin] = useState(false);
  const [uid, setuid] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    if (password === null) {
      setPassworderror("Your E-mail or Password is incorrect");
    } else
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          setuid(data.user.uid);
          console.log("User ID is :", data.user.uid);
          navigate(`/Welcome?ID=${data.user.uid}`);
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-not-found":
            case "auth/wrong-password":
            case "auth/internal-error":
              setEmailerror("Your E-mail or Password is incorrect");
              setTimeout(() => {
                setEmailerror("");
              }, 6000);
              break;
            case "Wrong Password":
              setPassworderror(err.message);
          }
          console.log(err.code);
        });
  };
  return (
    <div>
      <div className="mainbg">
        <Row className="centeritem  h100vh">
          <Col md={5} className="formbg ">
            <Form className="forminput radius contentcenter">
              <Row>
                <Col></Col>
                <Col>
                  <img src={logo} className="logo" alt="logo" />
                </Col>
                <Col></Col>
              </Row>
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <p className="text-form  mb-3">
                  Why go to banks when you can exchange with other people
                </p>

                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(`Email is ${e.target.value}`);
                  }}
                  value={email}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
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
              <h6 style={{ marginBottom: 14, color: "red" }}>{emailerr}</h6>
              <h6 style={{ marginBottom: 14, color: "red" }}>{passworderr}</h6>
              <Button
                variant="primary"
                className="btnlogin"
                style={{ width: "100%" }}
                // type="submit"
                onClick={login}
              >
                Login
              </Button>
              <Row className="mt-3">
                <a className="fpass">Forget password?</a>
              </Row>
              <p className="text-form  mt-3">
                Don't have an account? <a href="/SignUp"> Create one here</a>
              </p>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
