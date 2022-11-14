import React from "react";
import { Row, Col } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RemovePart3_data } from "../Redux/actions/action";
import result from "../data/db.json";
import FormModal3 from "./Form3";
import "./styles/styles.css";

const Part3 = () => {
  const { result_part3 } = useSelector((state) => state.result_data3);
  const dispacth = useDispatch();
  const handleDelete = (id) => {
    dispacth(RemovePart3_data(id));
  };
  const { result_part1 } = useSelector((state) => state.result_data);
  let  sum=(data)=>{
    let totalSum = 0;
  for(let i=0; i<data.length; i++){
    totalSum+=(data[i].Oral_num2+data[i].BA_num+data[i].FA_num+data[i].Oral_num1)
    
  }
    return totalSum
  }

let  percentage=(data)=>{
    let totalNumber = data.filter((item)=> item.name !== "Drawing").length * 100 || 0
    // console.log(totalNumber)
    if(sum(data)){
      
      return (((sum(data)*100)/totalNumber).toFixed(2))

    }else{return null}
  
  }
  const Rank=(data)=>{
    
    if(percentage(data)==null){
      return ""
    }
    else if(percentage(data)>90){
      return "A1"
    }
    else if(percentage(data)>80){
      return "A2"
    }
    else if(percentage(data)>70){
      return "B1"
    }
    else if(percentage(data)>60){
      return "B2"
    }
    else if(percentage(data)>50){
      return "C1"
    }
    else if(percentage(data)>44){
      return "C2"
    }
    else if(percentage(data)<44){
      return "Fail"
    }
  }
  const Cgpa=(data)=>{
    if(percentage(data)==null){
      return ""
    }
    else if(percentage(data)>90){
      return "9.1"
    }
    else if(percentage(data)>80){
      return "8.5"
    }
    else if(percentage(data)>70){
      return "7.8"
    }
    else if(percentage(data)>60){
      return "7.2"
    }
    else if(percentage(data)>50){
      return "6.8"
    }
    else if(percentage(data)>44){
      return "5.2"
    }
    else if(percentage(data)<44){
      return "Less than 3"
    }
  }
  const Remark=(data)=>{
    if(percentage(data)==null){
      return ""
    }
    else if(percentage(data)>90){
      return "Excellent"
    }
    else if(percentage(data)>80){
      return "Out Standing"
    }
    else if(percentage(data)>70){
      return "Very Good"
    }
    else if(percentage(data)>60){
      return "Good"
    }
    else if(percentage(data)>50){
      return "Average"
    }
    else if(percentage(data)>44){
      return "Below Average"
    }
    else if(percentage(data)<44){
      return "Fail"
    }
  }

  return (
    <>
      <Row>
        <Col md={1} sm={1} xs={1}>
          <FormModal3 />
        </Col>
        <Col className="text-center fw-bold">PART-lll Attendence</Col>
      </Row>

      <Row>
        <Col className="border border-secondary border-1 text-center m-2">
          <Row className="border-bottom border-secondary">
            <Col
              md={3}
              sm={3}
              xs={3}
              className="border-end border-secondary"
            ></Col>
            <Col
              md={3}
              sm={3}
              xs={3}
              className="border-end border-secondary fw-bold"
            >
              No. of Working Days
            </Col>
            <Col
              md={3}
              sm={3}
              xs={3}
              className="border-end border-secondary fw-bold"
            >
              No. of Days Present
            </Col>
            <Col
              md={3}
              sm={3}
              xs={3}
              className="text-xs-start paddingZero fw-bold"
            >
              Percentage
            </Col>
          </Row>
          {result_part3.map((item, i) => (
            <Row key={item.id}>
              <Col md={3} sm={3} xs={3} className="border-end border-secondary">
                
                <span className="fw-bold">
                <span
                  className="float-start print red disapear"
                  onClick={() => handleDelete(item.id)}
                >
                  <AiOutlineDelete />
                </span>{item.term.value}</span>
              </Col>
              <Col md={3} sm={3} xs={3} className="border-end border-secondary">
                {item.working}
              </Col>
              <Col md={3} sm={3} xs={3} className="border-end border-secondary">
                {item.present}
              </Col>
              <Col md={3} sm={3} xs={3}>
                {((item.present * 100) / item.working).toFixed(2)}

                {/* <span className='float-end print'>
                                        <FormModal3 edit={true} data={item} idx={i} />

                                    </span> */}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>

      <Row>
        <Col>
          <Row>
            <Col xs={{ span: 4 }} className="fw-bold">
              {" "}
              <span className="fw-bold">C.G.P:</span> {Cgpa(result_part1)}
            </Col>
            <Col xs={{ span: 3, offset: 5 }} className="text-end fw-bold">
              {" "}
              <span className="fw-bold fw-bold fw-bold"> Grade:</span> {Rank(result_part1)}
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 8 }} className="fw-bold">
              Teacher's Remarks - <span className="fw-bold" >{Remark(result_part1)}</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Row>
            <Col xs={{ span: 3 }}>
              <span className="fntFamily fw-bold">Student's Signature</span>
            </Col>
            <Col xs={{ span: 6 }} className="text-center ">
              <span className="fntFamily fw-bold">Teacher's Signature</span>
            </Col>
            <Col xs={{ span: 3 }} className="text-end">
              <span className="fntFamily fw-bold">Parent Signature</span>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 6, offset: 3 }} className="text-center fw-bold ">
              <span className="fs-2">G</span>RADING
              <span className="fs-2"> S</span>CALE
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ span: 10, offset: 1 }}
              md={{ span: 6, offset: 3 }}
              className="border-top border-start border-end border-secondary border-1"
            >
              <Row className="border-bottom border-secondary">
                <Col
                  sm={4}
                  xs={4}
                  className="border-end border-secondary text-center fw-bold fw-bold"
                >
                  MARKS RANGE
                </Col>
                <Col
                  sm={4}
                  xs={4}
                  className="border-end border-secondary text-center fw-bold fw-bold"
                >
                  GRADES
                </Col>
                <Col sm={4} xs={4} className="text-center  fw-bold fw-bold">
                  REMARKS
                </Col>
              </Row>
              {result.part_3.map((item, i) => (
                <Row
                  key={Date.now() + Math.random()}
                  className="fw-bold border-bottom border-1 border-secondary"
                >
                  <Col
                    sm={4}
                    xs={4}
                    className="border-end border-secondary text-center"
                  >
                    {item.marks_range}
                  </Col>
                  <Col
                    sm={4}
                    xs={4}
                    className="border-end border-secondary text-center"
                  >
                    {item.grade}
                  </Col>
                  <Col sm={4} xs={4}>
                    {item.remarks}
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="border-top border-secondary border-1 text-center mt-1">
        <Col className="font-italic fw-bold">
          <em>Our Parents are seen Good on the Earth</em>
        </Col>
      </Row>
    </>
  );
};

export default Part3;
