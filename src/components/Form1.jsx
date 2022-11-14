import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import Select from "react-select";
import { Part1Modal } from "./schemas/validation";
import { useDispatch, useSelector } from "react-redux";
import { AddResult, EditeResult } from "../Redux/actions/action";
import { useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/bs";
import "./styles/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let Option = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Sanskrit", label: "Sanskrit" },
  { value: "Moral", label: "Moral" },
  // { value: "Computer", label: "Communication" },
  { value: "G.K", label: "G.K." },
  { value: "EVS", label: "EVS" },
  { value: "Computer", label: "Computer" },
  { value: "Math", label: "Math" },
  { value: "Drawing", label: "Drawing" },
];

// let Option=["English","Hindi","Sanskrit","Moral","G.K","EVS","Computer","Math"]
// const {student_id}=user
const student_id=JSON.parse(localStorage.getItem('student_id'))
const Form1 = ({ edit, idx, data, user ,getResultUI}) => {
  const [show, setShow] = useState(false);
  
  const handleShow = () => setShow(true);
  const [list, setList] = useState("");
  const dispatch = useDispatch();
  const [result_part1, setResult_part1] = useState([]);
  const [sub, setSub] = useState([]);

  const initialValues = {
    subject: "",
    fa: "",
    ba: "",
    o1: "",
    o2: "",
    student_id:student_id,
    result_id: "",
    total: null,
  };
  const sum = (data) => {
    let total = 0;
    for (let key in data) {
      if (key == "fa" || key == "ba" || key == "o1" || key == "o2") {
        total += Number(data[key]);
      }
    }
    return total;
  };

  const handleClose = () =>{
    setShow(false);
    getResult();
  }

  useEffect(() => {
    getResult();
    console.log("here")
  }, []);

  const getResult = () => {
    axios
      .get(`http://localhost:5000/result/:${student_id}`)
      .then((res) => {
        setResult_part1(res.data);
        //console.log("UPDATED",result_part1)
      });
  };

  const submitResult = (values) => {
    const { subject, result_id } = values;
    values.total = sum(values);
    values = { ...values, subject: `${subject.value}` };
    values = { ...values, result_id: `${student_id}${subject.value}` };

    // console.log(values);

    axios
      .post("http://localhost:5000/result/", values)
      .then((res) => {
        getResultUI();
        // handleClose();
      })
      .catch((e) => {
        // alert("That Subject Already Filled")
        console.log("submission error :", e);
      });
     
     
  };
  const filteredSelection = () => {
    const subject_selected = result_part1.map((item) => item.subject);
    let data = Option.filter((item) => !subject_selected.includes(item.value));

    setList(data);
    console.log(
      "selected",
      subject_selected,
      "res",
      result_part1,
      "filtered",
      data
    );
  };
  useEffect(() => {
    filteredSelection();
  }, []);

  useEffect(() => {
    filteredSelection();
  }, [result_part1]);
  // console.log(subject_selected, result_part1,data);
  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        size="sm"
        className={edit ? null : "float-start disapear "}
      >
        {edit ? "Edit" : "Add"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit Marks" : "Add Marks"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={edit ? data : initialValues}
            validationSchema={Part1Modal}
            // console.log(onSubmit)

            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              //console.log(values);
              submitResult(values);

              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2))
                resetForm();
                setSubmitting(false);
              }, 500);
            }}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="drop-down">
                    <Select
                      options={list}
                      onChange={(option) => setFieldValue("subject", option)}
                      name="subject"
                      placeholder="Click To Select Subject"
                      value={values.subject}
                      isDisabled={edit}
                    />
                    {touched.subject && errors.subject && (
                      <span style={{ color: "red" }}>{errors.subject}</span>
                    )}
                  </div>
                </div>
                <Form.Group>
                  <Form.Label>FA</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="FA-mark"
                    name="fa"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fa}
                  />
                  {touched.fa && errors.fa && (
                    <span style={{ color: "red" }}>{errors.fa}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>O1</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Oral-1 mark"
                    name="o1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.o1}
                  />
                  {touched.o1 && errors.o1 && (
                    <span style={{ color: "red" }}> {errors.o1}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>SA</Form.Label>
                  <Form.Control
                    type="number"
                    name="ba"
                    placeholder="SA mark"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ba}
                  />
                  {touched.ba && errors.ba && (
                    <span style={{ color: "red" }}>{errors.ba}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>O2</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Oral-2 mark"
                    name="o2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.o2}
                  />
                  {touched.o2 && errors.o2 ? (
                    <span style={{ color: "red" }}>{errors.o2}</span>
                  ) : null}
                </Form.Group>
                <br />
                <Button variant="success" type="submit">
                  {edit ? "Edit Marks" : "Add Marks"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Form1;
