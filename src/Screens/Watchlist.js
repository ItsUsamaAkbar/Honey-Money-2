import logo from "../asstes/Logoapp.png";
import "../App.css";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import Location from "../asstes/bluelocation.svg";
import Stars from "../asstes/rattingstar.svg";
import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

function Watchlist() {
  return (
    <div>    
        <div className="">
          <Row className="centeritem ">
            <Row className="Locationbar ">
              <h6 style={{ textAlign: "center", verticalAlign: "center" }}>
                <img
                  className="locationbtn"
                  src={Location}
                  alt="Location"
                ></img>
                Current Location: London Metropolitan Area, 28 002
              </h6>
            </Row>
            <Col md={5} className=" ">
              <Row className="mt-4">
                <Row className="dealstats">
                  <Col>
                    <h6>Completed deals 0</h6>
                    <img className="rating-unfill" src={Stars} alt="Stars" />
                    <img className="rating-unfill" src={Stars} alt="Stars" />
                    <img className="rating-unfill" src={Stars} alt="Stars" />
                    <img className="rating-unfill" src={Stars} alt="Stars" />
                    <img className="rating-unfill" src={Stars} alt="Stars" />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col style={{ padding: 0 }}>
                    <h6>Choose upto 10 Currency pairs & change country</h6>
                  </Col>
                </Row>
                <Row style={{ padding: 0 }}>
                  <Col>
                    <InputGroup className="mb-3 mt-2">
                      <Form.Select aria-label="You want to Give">
                        <option>You want to Give</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>
                </Row>
                <Row style={{ padding: 0 }}>
                  <Col>
                    <InputGroup className="mb-3">
                      <Form.Select aria-label="You want to Take">
                        <option>You want to Take</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <MDBTable striped bordered borderColor="secondary">
                    <MDBTableHead>
                      <tr className="tableheading">
                        <th scope="col">You Give</th>
                        <th scope="col">Give country</th>
                        <th scope="col">You Take</th>
                        <th scope="col">Take country</th>
                        <th scope="col">Google Rate</th>
                        <th scope="col">Honey Money</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody className="tablebody">
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </Row>
                <Row className="mt-4">
                  <Col md={2} style={{ marginTop: "6px" }}>
                    <p>Sort by</p>
                  </Col>
                  <Col md={10}>
                    <InputGroup className="mb-3">
                      <Form.Select aria-label="">
                        <option></option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Row>
        </div>
      
    </div>
  );
}

export default Watchlist;
