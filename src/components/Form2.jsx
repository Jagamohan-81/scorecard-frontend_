import { Formik } from 'formik';
import  { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select';
import { useSelector,useDispatch } from 'react-redux';
import { Addpart2_data, Updatepart2_data } from '../Redux/actions/action';
import { Part2Modal } from "./schemas/validation";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options1 =[{value:"Development",label:"Development"},
 {value:"Responsiblity",label:"Responsiblity"},
 {value:"Self Confidence", label:"Self Confidence"},
 {value:"Craft", label:"Craft"},
 {value:"Neatness",label:"Neatness"},
 {value:"Discipline",label:"Regularity & Punctuality"},
 {value:"Music",label:"Music"},
 {value:"Hard Work",label:"Hard Work"}
]
const options2 =[{value:"A1",label:"A1"},
{value:"A2",label:"A2"},
{value:"B1",label:"B1"},
{value:"B2",label:"B2"},
{value:"C1",label:"C2"}

]
const initialValues ={
    category:"",
    grade:""
}
const FormModal2 = ({edit, idx,  data}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list, setList] = useState("");

  const dispatch = useDispatch()
  const {result_part2} = useSelector(state => state.result_data2)
  // console.log(result_part2)
  const category_selected = result_part2.map((item)=>item.category.value)
  useEffect(()=>{
    let data = options1.filter(item => !category_selected.includes(item.value))
    setList(data)
  },[result_part2])
  return (
    <>
    
    {
      edit ?  (
        <span variant="light" onClick={handleShow}>
          &nbsp; < AiFillEdit onMouseOver={({target})=>target.style.backgroundColor="silver" } onMouseOut={({target})=>target.style.backgroundColor="white"} />
        </span>
      ):
      (
        <Button
        variant="warning"
        onClick={handleShow}
        size="sm"
        className="float-start disapear"
      >
        Add
      </Button>
      )
    }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header  closeButton>
          <Modal.Title >Co-Scholastic Grades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={edit ? data :initialValues}
            validationSchema={Part2Modal}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              edit ? dispatch(Updatepart2_data(idx,values)):
              dispatch(Addpart2_data({...values,id:Math.random()+Date.now()}))
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(true);
                resetForm();
                setSubmitting(false);
                // toast.success(`Grades  is successfully Added`, {
                //   position: "bottom-right",
                // });
              }, 500);
            }}
          >
            {({
              values,
              setFieldValue,
              touched,
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="drop-down">
                    <Select
                      options={list}
                      onChange={(options) => setFieldValue("category", options)}
                      name="category"
                      placeholder="subject"
                      value={values.category}
                      isDisabled={edit}
                    />
                    {touched.category && errors.category ? (
                      <span style={{color:"red"}} >{errors.category}</span>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <div className="drop-down">
                    <br />
                    <Select
                      options={options2}
                      onChange={(options) => setFieldValue("grade", options)}
                      name="grade"
                      placeholder="Grades"
                      value={values.grade}
                    />
                    {touched.grade && errors.grade ? (
                      <span style={{color:"red"}} >{errors.grade}</span>
                    ) : null}
                  </div>
                </div>
                <br />
                <Button
                  variant="success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {edit ?"Edit Grades" : "Add Grades"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default FormModal2