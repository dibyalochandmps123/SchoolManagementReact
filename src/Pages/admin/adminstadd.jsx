import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Card
} from "react-bootstrap";
import {
  postSingleStudents
} from "../../API/studentManagement";
import { FaArrowLeft, FaUserGraduate, FaMoneyCheckAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Unified JSON structure
const studentData = {
  studentInfo: {
    studentName: "",
    rollNumber: "",
    registrationNumber: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    city: "",
    pinCode: "",
    whatsappNumber: "",
    photo: ""
  },
  academicInfo: {
    admissionClass: "",
    section: "",
    rollNo: "",
    admissionDate: "",
    previousSchool: "",
    previousClass: ""
  },
  feesInfo: {
    feeType: "",
    scholarshipAmount: "",
    admissionFees: "",
    monthlyFees: "",
    busServices: false
  },
  parentInfo: {
    fatherName: "",
    fatherOccupation: "",
    fatherIdProof: "",
    fatherEmailId: "",
    fatherNumber: "",
    motherName: "",
    motherOccupation: "",
    motherIdProof: "",
    motherEmailId: "",
    motherNumber: "",
    guardianName: "",
    guardianOccupation: "",
    guardianIdProof: "",
    guardianEmailId: "",
    guardianNumber: ""
  }
};

export default function AdminAddSingleStudent({ setActiveComponent }) {
  const [studentInfo, setStudentInfo] = useState(studentData.studentInfo);
  const [academicInfo, setAcademicInfo] = useState(studentData.academicInfo);
  const [feesInfo, setFeesInfo] = useState(studentData.feesInfo);
  const [parentInfo, setParentInfo] = useState(studentData.parentInfo);

  const handleSave = () => {
    const val = {
      studentInfo,
      academicInfo,
      feesInfo,
      parentInfo
    };
    alert("Student data will be submitted.");
    postSingleStudents(val);
  };

  return (
    <Container fluid className="p-4 bg-light">
      <Button variant="secondary" className="mb-3" onClick={() => setActiveComponent("2")}>
        <FaArrowLeft /> Back
      </Button>

      {/* Student Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold"><FaUserGraduate /> Student Information</Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}><Form.Control placeholder="First Name *" value={studentInfo.studentName} onChange={(e) => setStudentInfo({ ...studentInfo, studentName: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Roll Number" value={studentInfo.rollNumber} onChange={(e) => setStudentInfo({ ...studentInfo, rollNumber: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Registration Number" value={studentInfo.registrationNumber} onChange={(e) => setStudentInfo({ ...studentInfo, registrationNumber: e.target.value })} /></Col>
            <Col md={4}><Form.Control type="date" value={studentInfo.dob} onChange={(e) => setStudentInfo({ ...studentInfo, dob: e.target.value })} /></Col>
            <Col md={4}>
              <Form.Select value={studentInfo.gender} onChange={(e) => setStudentInfo({ ...studentInfo, gender: e.target.value })}>
                <option>Select Gender *</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={studentInfo.bloodGroup} onChange={(e) => setStudentInfo({ ...studentInfo, bloodGroup: e.target.value })}>
                <option>Select Blood Group *</option>
                <option>A+</option><option>B+</option><option>O+</option><option>AB+</option><option>Other</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Academic Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold"><FaUserGraduate /> Academic Information</Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}><Form.Select value={academicInfo.admissionClass} onChange={(e) => setAcademicInfo({ ...academicInfo, admissionClass: e.target.value })}><option>Select Class *</option><option>I</option><option>II</option></Form.Select></Col>
            <Col md={4}><Form.Control placeholder="Section" value={academicInfo.section} onChange={(e) => setAcademicInfo({ ...academicInfo, section: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Roll No" value={academicInfo.rollNo} onChange={(e) => setAcademicInfo({ ...academicInfo, rollNo: e.target.value })} /></Col>
            <Col md={4}><Form.Control type="date" value={academicInfo.admissionDate} onChange={(e) => setAcademicInfo({ ...academicInfo, admissionDate: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Previous School (if any)" value={academicInfo.previousSchool} onChange={(e) => setAcademicInfo({ ...academicInfo, previousSchool: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Previous Class" value={academicInfo.previousClass} onChange={(e) => setAcademicInfo({ ...academicInfo, previousClass: e.target.value })} /></Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fees Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold"><FaMoneyCheckAlt /> Tuition Fees Information</Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}><Form.Select value={feesInfo.feeType} onChange={(e) => setFeesInfo({ ...feesInfo, feeType: e.target.value })}><option>Fee Type</option><option>Regular</option><option>Scholarship</option></Form.Select></Col>
            <Col md={4}><Form.Control placeholder="Scholarship Amount" value={feesInfo.scholarshipAmount} onChange={(e) => setFeesInfo({ ...feesInfo, scholarshipAmount: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Admission Fees *" value={feesInfo.admissionFees} onChange={(e) => setFeesInfo({ ...feesInfo, admissionFees: e.target.value })} /></Col>
            <Col md={4}><Form.Control placeholder="Monthly Tuition Fees *" value={feesInfo.monthlyFees} onChange={(e) => setFeesInfo({ ...feesInfo, monthlyFees: e.target.value })} /></Col>
            <Col md={8}>
              <Form.Check type="checkbox" label="Are you interested in taking bus services?" checked={feesInfo.busServices} onChange={(e) => setFeesInfo({ ...feesInfo, busServices: e.target.checked })} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Parent Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold"><MdFamilyRestroom /> Parent/Guardian Information</Card.Header>
        <Card.Body>
          <Row className="g-3">
            {Object.entries(parentInfo).map(([key, value]) => (
              <Col md={4} key={key}>
                <Form.Control
                  placeholder={key.replace(/([A-Z])/g, ' $1').replace(/Id/g, 'ID')}
                  value={value}
                  onChange={(e) => setParentInfo({ ...parentInfo, [key]: e.target.value })}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => window.location.reload()}>Reset Form</Button>
        <Button variant="primary" onClick={handleSave}>Save Student</Button>
      </div>
    </Container>
  );
}
