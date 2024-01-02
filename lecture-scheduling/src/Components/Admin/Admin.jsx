import React, { useContext } from "react";
import api from "../Api Config";
import { useState } from "react";
import { useEffect } from "react";
import "./Admin.css";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,useDisclosure } from "@chakra-ui/react";
import AddCourseBox from "./AddCourseBox";
import LecturesScheduler from "./LecturesScheduler";
import { AuthContext } from "../../Context";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const [lecturers, setLecturers] = useState([]);
  const router=useNavigate()
  const { isOpen:isCourseOpen, onOpen:onCourseOpen, onClose:onCourseClose} = useDisclosure()
  const { isOpen:isLectureOpen, onOpen:onLectureOpen, onClose:onLectureClose } = useDisclosure()
  const{state,logout}=useContext(AuthContext)
  const getLecturers = async () => {
    try {
    const token = JSON.parse(localStorage.getItem("Token"));
    const response = await api.post("/get-lecturers",{token});
      if (response.data.success) {
        setLecturers(response.data.list);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getLecturers();
  }, []);

  useEffect(()=>{
  if(state.user && state?.user?.role==="Lecturer"){
  router('/lecturer')  
  }
  },[state])
  const handleExit=()=>{
    logout()
    router('/')
    }
  return (
    <div className="admin-main">
      <div className="navbar">
        <div className="admin-panel"> Admin Panel</div>
        <div className="admin-sec">
        <Button onClick={onLectureOpen}>Schedule Lectures</Button>
        <Button onClick={onCourseOpen}>Add New Course</Button>
        <Button onClick={handleExit}>Logout</Button>
        </div>
      </div>
      <div className="admin-content">
      <h3 className="admin-text">Details of the Lecturers</h3>
      <div className="admin-flex">
        <p>Lecturer Name</p>
        <p>Email Id</p>
      </div>
      {
        lecturers?.map((list)=>(
        <div className="admin-list">
        <p>{list?.name}</p>
        <p>{list?.email}</p>
        </div>
        ))
      }
      <Modal isOpen={isCourseOpen} onClose={onCourseClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Course Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCourseBox close={onCourseClose}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCourseClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isLectureOpen} onClose={onLectureClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lecture Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <LecturesScheduler close={onLectureClose}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onLectureClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
    </div>
  );
};

export default Admin;
