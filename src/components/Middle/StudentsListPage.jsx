import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import StudentsListTable from "../components/tables/StudentsListTable";
import Form4 from "./Form4";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import Logout from '../Loginsignup/Logout'
// import StudentsListTable from "../StudentsListTable";
const StudentsListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { students } = useSelector((state) => state.students);

  const [students, setStudents] = useState([]);
  const [activeStudent, setActiveStudent] = useState();

  const Render = () => {
    axios.get("http://localhost:5000/students").then((res) => {
      let filtered = res.data.filter((f) => {
        return f.student_status != "f";
      });
      setStudents(filtered);
    });
  };

  useEffect(() => {
    Render();

    return () => {};
  }, []);
  // const initialValue = {
  //   name: "",
  //   class: "",
  //   section: "",
  //   roll: "",
  // };

  const handleDelete = (e, student) => {
    // e.preventDefault();

    const change = { ...student, student_status: "f" };
    //console.log(change)

    axios
      .put(`http://localhost:5000/students/:${student.student_id}`, change)
      .then((res) => {
        Render();
        Filtered(students);
      })
      .catch((e) => {
        console.log("error : ", e);
      });
  };

  useEffect(() => {
    Filtered(students);
  }, []);

  const Filtered = (data) => {
    let filtered = data.filter((f) => {
      return f.student_status != "f";
    });
    setStudents(filtered);
  };

  // console.log(students);

  const handleEditStudent = (e, student) => {
    setActiveStudent(student);
    e.preventDefault();

    handleShow();

    console.log(activeStudent);
  };
  const submitEdit = (e) => {
    //const {student_class,student_id,student_name,student_roll,student_section}=e
    const { student_id } = e;

    axios
      .put(`http://localhost:5000/students/:${student_id}`, e)
      .then((res) => {
        Render();
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };

  const handleDirect = (e) => {
    localStorage.setItem("student_id", JSON.stringify(e.target.id));
    // console.log(e.target.id)
    navigate("/home");
  };
  // console.log(students);

  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if (!authenticated) {
    navigate('/')



  } else {
    // Redirect

    return (
      <>
        <nav className="navbar navbar-light bg-primary fixed-top">
          <p style={{ paddingLeft: "2%", color: "white" }}>
            Student Dashboard{" "}
          </p>
          <Form4 Render={Render} />
          <div>
          <Logout />
          </div>
        </nav>
        <div>
          <table className="table table-bordered" id="student_list_table">
            <thead>
              <tr>
                <th colSpan={7}>
                  <div>
                    <h5 className="table-name">Students List</h5>
                    {/* modal popup */}
                    {/*  Button trigger modal  */}

                    {/* Attendence Modal */}
                    <div
                      className="modal fade"
                      id="addStudentModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="addStudentModal"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Add Student</h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th rowSpan={2}>SI.No</th>
                <th rowSpan={2}>Student Name</th>
                <th rowSpan={2}>Class</th>
                <th rowSpan={2}>Section</th>
                <th rowSpan={2}>Roll Number</th>
                <th colSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student, index) => {
                return (
                  <tr key={Date.now() + Math.random()}>
                    <td>{index + 1}</td>
                    <td
                      id={student.student_id}
                      onClick={(e) => {
                        handleDirect(e);
                      }}
                    >
                      {student.student_name}
                    </td>
                    <td>{student.student_class}</td>
                    <td>{student.student_section}</td>
                    <td>{student.student_roll}</td>
                    <td>
                      <FiEdit
                        className="edit-icon"
                        name={student.student_id}
                        onClick={(e) => handleEditStudent(e, student)}
                        data-toggle="modal"
                        data-target="#editStudentModal"
                      />
                      {/* Edit Scholastic Areas Modal */}
                      {/* {showEditStudentModal ? (
                      <EditStudentForm
                        editStudent={editStudent}
                        headers={headers}
                      />
                    ) : null} */}
                    </td>
                    <td>
                      <AiOutlineDelete
                        id={student.student_id}
                        className="delete-icon"
                        onClick={(e) => handleDelete(e, student)}
                      />
                      {/*Delete Student Popup */}
                      {/* {deleteStudent ? (
                      <DeleteStudentPopup
                        deleteStudent={deleteStudent}
                        headers={headers}
                      />
                    ) : null} */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Enter Student Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              // validationSchema={Part1Modal}

              initialValues={activeStudent}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                submitEdit(values);
                setTimeout(() => {
                  resetForm();
                  setSubmitting(false);
                }, 1000);
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
                      value={values.student_name}
                    />
                    {touched.name && errors.name && (
                      <span style={{ color: "red" }}>{errors.name}</span>
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
                      value={values.student_class}
                    />
                    {touched.class && errors.class && (
                      <span style={{ color: "red" }}> {errors.class}</span>
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
                      value={values.student_section}
                    />
                    {touched.section && errors.section && (
                      <span style={{ color: "red" }}>{errors.section}</span>
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
                      value={values.student_roll}
                    />
                    {touched.roll && errors.roll ? (
                      <span style={{ color: "red" }}>{errors.roll}</span>
                    ) : null}
                  </Form.Group>
                  <br />
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleClose}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default StudentsListPage;
