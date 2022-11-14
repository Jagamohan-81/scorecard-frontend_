import {  Col,Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RemovePart2_data, } from "../Redux/actions/action";
import { AiOutlineDelete } from "react-icons/ai";
import FormModal2 from "./Form2";
import "./styles/styles.css"
const Part2 = () => {
  const {result_part2} = useSelector(state => state.result_data2)
    // console.log(result_part2);
    const dispatch = useDispatch()
    const handleDelete=(id)=>{
        dispatch(RemovePart2_data(id))}

  return (
    <>
      <Col >
        <Row className="border-bottom border-secondary border-1 d-flex  ">
          <Col className="text-center text-primary fw-bold pt-2">
            Part-II : Co- Scholastic Areas
            <FormModal2 />
          </Col>
        </Row>

        <Row className="border-bottom border-secondary border-1 ">
          <Col
            className="border-end border-secondary"
            md={8}
            sm={8}
            xs={8}
          ></Col>
          <Col
            md={4}
            sm={4}
            xs={4}
            className="fw-5 fs-5 text-center d-flex justify-content-center align-items-center paddingFix fw-bold"
          >
            Grade
          </Col>
        </Row>

        {result_part2.map((item, i) => (
          <Row
            key={Math.random() + Date.now()}
            className="border-bottom border-secondary border-1 "
          >
            <Col
              className="pt-1 pb-1 fw-bold border-end border-secondary"
              md={8}
              sm={8}
              xs={8}
            >
              <span
              onClick={()=>handleDelete(item.id)}
              className="red disapear m-0"
              >
             <AiOutlineDelete />
              </span>
              {item.category.value}
              
            </Col>
            <Col md={4} sm={4} xs={4} className="text-center  fw-bold">
              {item.grade.value}
              
              {/* <span>
                <FormModal2 idx={i} edit={true} data={item} />
              </span> */}
            </Col>
          </Row>
        ))}
      </Col>
    </>
  );
};

export default Part2;
