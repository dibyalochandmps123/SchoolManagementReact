import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaUsers } from "react-icons/fa";
import {provideListOfAllActor} from "../API/totalData"
import {sendUpdatedStudentData} from "../API/studentManagement"
export default function StudentEditProfileModal({ show, onClose,studentAllForEdit}) {
  const initialData=studentAllForEdit;
  const [student, setStudent] = useState(initialData);
  const [classListActor,setClassListActor]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
          try {
            const getAllActorData = await provideListOfAllActor();
            setClassListActor(getAllActorData[0]);
            console.log(getAllActorData[0]);
             
          }catch (err) {
           console.error("Failed to fetch data:", err);
          }
        };
        fetchData();
        
        console.log("I am here",classListActor);
    // Reset form on modal open
    if (show) {
      setStudent(initialData);
    }
  }, [show]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    const isFatherComplete = student.fatherName && student.fatherOccupation && student.fatherIdProof && student.fatherEmailId && student.fatherNumber;
    const isMotherComplete = student.motherName && student.motherOccupation && student.motherIdProof && student.motherEmailId && student.motherNumber;
    const isGuardianComplete = student.guardianName && student.guardianOccupation && student.guardianIdProof && student.guardianEmailId && student.guardianNumber;
    const atLeastOneComplete = isFatherComplete || isMotherComplete || isGuardianComplete;
    if (!atLeastOneComplete) {
      alert("Please complete all fields of at least one section: Father, Mother, or Guardian.");
      return;
    }
    const payload = {
      id: student.id,
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      bloodGroup: student.bloodGroup,
      admissionClass: student.admissionClass,
      section: student.section,
      rollNo: student.rollNo,
      admissionDate: student.admissionDate,
      previousSchool: student.previousSchool,
      previousClass: student.previousClass,
      address: student.address,
      city: student.city,
      pinCode: student.pinCode,
      mobileNumber: student.mobileNumber,
      email: student.email,
      fatherName: student.fatherName,
      fatherOccupation: student.fatherOccupation,
      fatherIdProof: student.fatherIdProof,
      fatherEmailId: student.fatherEmailId,
      fatherNumber: student.fatherNumber,
      motherName: student.motherName,
      motherOccupation: student.motherOccupation,
      motherIdProof: student.motherIdProof,
      motherEmailId: student.motherEmailId,
      motherNumber: student.motherNumber,
      guardianName: student.guardianName,
      guardianOccupation: student.guardianOccupation,
      guardianIdProof: student.guardianIdProof,
      guardianEmailId: student.guardianEmailId,
      guardianNumber: student.guardianNumber,
      parentMobile: student.parentMobile,
      whatsAppNumber: student.whatsAppNumber,
      feeType: student.feeType,
      scholarshipAmount: student.scholarshipAmount,
      admissionFees: student.admissionFees,
      monthlyFees: student.monthlyFees,
      busServices: student.busServices
    };
    try {
      await sendUpdatedStudentData(payload);
      onClose();
    } catch (error) {
      console.error("Failed to save student data:", error);
    }
  };


  return (
    <Modal show={show} onHide={onClose} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Student Information */}
        <Card className="mb-3">
          <Card.Header><FaUserGraduate /> Student Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>First Name</Form.Label><Form.Control name="firstName" value={student.firstName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Middle Name</Form.Label><Form.Control name="middleName" value={student.middleName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Last Name</Form.Label><Form.Control name="lastName" value={student.lastName} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="dob" value={student.dateOfBirth} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={student.admissionClass} onChange={handleChange}>
                      <option value="">Current: {student.gender}</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                  </Form.Select>
              </Col>
              <Col md={4}><Form.Label>Blood Group</Form.Label><Form.Control name="bloodGroup" value={student.bloodGroup} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Academic Information */}
        <Card className="mb-3">
          <Card.Header><FaBook /> Academic Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}><Form.Label>Admission Class</Form.Label>
                  <Form.Select name="admissionClass" value={student.admissionClass} disabled onChange={handleChange}>
                      <option value={student.admissionClass}>Current: {student.admissionClass}</option>
                      {Object.keys(classListActor).map((classKey) => (
                        <option key={classKey} value={classKey}>
                          {classKey}
                        </option>
                      ))}
                  </Form.Select>
              </Col>
              <Col md={3}><Form.Label>Section</Form.Label><Form.Control disabled name="section" value={student.section} onChange={handleChange} /></Col>
              <Col md={3}><Form.Label>Roll No</Form.Label><Form.Control disabled name="rollNo" value={student.rollNo} onChange={handleChange} /></Col>
              <Col md={3}><Form.Label>Admission Date</Form.Label><Form.Control type="date" name="admissionDate" value={student.admissionDate} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Previous School</Form.Label><Form.Control name="previousSchool" value={student.previousSchool} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Previous Class</Form.Label><Form.Control name="previousClass" value={student.previousClass} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tuition Fees Information */}
        <Card className="mb-3">
          <Card.Header><FaBook /> Tuition Fees Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Fee Type</Form.Label>
                  <Form.Select name="feeType" onChange={handleChange}>
                      <option value="">{student.feeType}</option>
                      <option value="Regular">Regular</option>
                      <option value="Scholarship">Scholarship</option>
                  </Form.Select>
              </Col>
              <Col md={4}><Form.Label>Scholarship Amount</Form.Label><Form.Control name="scholarshipAmount" disabled value={student.scholarshipAmount} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Admission Fees</Form.Label><Form.Control name="admissionFees" disabled value={student.admissionFees} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Monthly Tuition Fees</Form.Label><Form.Control name="monthlyFees" disabled value={student.monthlyFees} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Parent/Guardian Information */}
        <Card className="mb-3">
          <Card.Header><FaUsers /> Father Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Father's Name</Form.Label><Form.Control name="fatherName" value={student.fatherName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Occupation</Form.Label><Form.Control name="fatherOccupation" value={student.fatherOccupation} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>ID Proof</Form.Label><Form.Control name="fatherId" value={student.fatherIdProof} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Email</Form.Label><Form.Control name="fatherEmail" value={student.fatherEmailId} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Phone</Form.Label><Form.Control name="fatherPhone" value={student.fatherNumber} onChange={handleChange} /></Col>
            </Row>
            
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header><FaUsers />Mother Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Name</Form.Label><Form.Control name="motherName" value={student.motherName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Occupation</Form.Label><Form.Control name="motherOccupation" value={student.motherOccupation} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>ID Proof</Form.Label><Form.Control name="motherId" value={student.fatherIdProof} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Email</Form.Label><Form.Control name="motherEmail" value={student.motherEmailId} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Phone</Form.Label><Form.Control name="motherPhone" value={student.motherNumber} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Header><FaUsers />Guardian Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Name</Form.Label><Form.Control name="guardianName" value={student.guardianName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Occupation</Form.Label><Form.Control name="guardianOccupation" value={student.guardianOccupation} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>ID Proof</Form.Label><Form.Control name="guardianId" value={student.guardianIdProof} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Email</Form.Label><Form.Control name="guardianEmail" value={student.guardianEmailId} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Phone</Form.Label><Form.Control name="guardianPhone" value={student.guardianNumber} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>WhatsApp Number</Form.Label><Form.Control name="whatsappNumber" value={student.whatsappNumber} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}><Form.Label>Address</Form.Label><Form.Control name="address" value={student.address} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>City</Form.Label><Form.Control name="city" value={student.city} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>PIN Code</Form.Label><Form.Control name="pinCode" value={student.pinCode} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
