import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AddResult, EditeResult,add_student,remove_student } from "../../Redux/actions/action";
import { useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentValidation } from '../schemas/validation'

const initialValue = {
  student_name: "",
  student_class: "",
  student_section: "",
  student_roll: "",
  student_id: Date.now() ,
  student_status:'t'
};

const Form4 = ({ edit, idx, data,Render }) => {
  //   const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list, setList] = useState("");
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

const submitStudentDetails=(values)=>{
  axios
      .post('http://localhost:5000/students/', values)
      .then((res) => {
        console.log("added")
        Render()
      })
      .catch((e) => {
        console.log("error : ", e);
        
      });

}

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
        size="sm"
        className={edit ? null : "float-start  "}
      >
        ADD STUDENT 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Enter Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={studentValidation}

            initialValues={initialValue}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              submitStudentDetails(values)
              console.log(values)
              
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
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Student Name"
                    name="student_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {touched.student_name && errors.student_name && (
                    <span style={{ color: "red" }}>{errors.student_name}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Class"
                    name="student_class"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.class}
                  />
                  {touched.student_class && errors.student_class && (
                    <span style={{ color: "red" }}> {errors.student_class}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Section</Form.Label>
                  <Form.Control
                    type="text"
                    name="student_section"
                    placeholder="Section"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.section}
                  />
                  {touched.student_section && errors.student_section && (
                    <span style={{ color: "red" }}>{errors.student_section}</span>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Roll Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Roll number"
                    name="student_roll"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.roll}
                  />
                  {touched.student_roll && errors.student_roll ? (
                    <span style={{ color: "red" }}>{errors.student_roll}</span>
                  ) : null}
                </Form.Group>
                <br />
                <Button variant="success" type="submit" disabled={isSubmitting}>
                  Submit
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

export default Form4;
