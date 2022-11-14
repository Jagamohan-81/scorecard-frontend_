import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Part2 from "./Part2";
import Part1 from "./Part1";
import Part3 from "./Part3";

const Page = () => {
  const navigate = useNavigate();
  const student_id = JSON.parse(localStorage.getItem("student_id"));
  const [user, setUser] = useState({});
  //console.log(student_id)
  // console.log(user);
  const render = () => {
    axios.get(`http://localhost:5000/students/:${student_id}`).then((res) => {
      setUser(res.data[0]);
    });
  };
  useEffect(() => {
    render();
  }, []);

  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("student_id");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    navigate("/input");
  } else {
    return (
      <>
        {" "}
        <Container className="border border-secondary border-3 ">
          <Row className="border-bottom border-secondary border-1 ">
            <Col className="text-center ">
              <p className=" fs-3 fw-3  text-center pt-1 text-danger fw-bold">
                {" "}
                First Terminal Examination 2022-23
              </p>
            </Col>
          </Row>
          <Row className="border-bottom border-secondary border-1">
            <Col className="text-center">
              <p className="fs-4 fw-bold "> ACADEMIC PERFORMANCE</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Row className="border-bottom border-secondary border-1">
                <Container>
                  <Row>
                    <Col sm={5}>Name : {user.student_name}</Col>
                    <Col sm={2}>Class : {user.student_class}</Col>
                    <Col sm={2}>Section : {user.student_section}</Col>
                    <Col sm={2}>Roll : {user.student_roll}</Col>
                  </Row>
                </Container>
                <Part1 user={user} />
                <Part2 />
              </Row>
            </Col>
          </Row>
          <Part3 />
        </Container>
      </>
    );
  }
};

export default Page;
