import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "./Home.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import api from "../Api Config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context";
import { useNavigate } from "react-router-dom";
const Lecturer = () => {
  const { state,logout} = useContext(AuthContext);
  const router=useNavigate()
  const [lecturesList, setlecturesList] = useState([]);
  const getLectures = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    if (token) {
      const response = await api.post("/get-lectures", { token });
      if (response.data.success) {
        setlecturesList(response.data.lectureList);
      }
    }
  };

  useEffect(() => {
    getLectures();
  }, []);
  useEffect(()=>{
    if(state.user && state?.user?.role==="Admin"){
    router('/admin')  
    }
    },[state])

    const handleExit=()=>{
    logout()
    router('/')
    }
  return (
    <div>
      <div className="lec-navbar">
        <div style={{fontSize:"18px",color:"#006400"}}>Hello! {state?.user?.name}</div>
        <div>
          <Button onClick={handleExit}>Logout</Button>
        </div>
      </div>
      <div className="lec-content">
        <h3 className="lec-text">Your Scheduled Lectures</h3>
        <div>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time Duration</Th>
                  <Th>Course</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lecturesList?.map((i) => (
                  <Tr key={i._id}>
                    <Td>{i.date}</Td>
                    <Td>{i.time}</Td>
                    <Td>{i.courseName}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Lecturer;
