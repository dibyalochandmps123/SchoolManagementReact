import React, { useState,useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Card
} from "react-bootstrap";
import { postSingleStudents } from "../../API/studentManagement";
import {provideListOfAllActor} from "../../API/totalData"
import { FaArrowLeft, FaUserGraduate, FaMoneyCheckAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

export default function AdminAddSingleStudent({ setActiveComponent }) {
  const [classListActor,setClassListActor]=useState([]);
  useEffect(() => {
      const fetchData = async () => {
            try {
              const getAllActorData = await provideListOfAllActor();
              setClassListActor(getAllActorData[0]);
          
            }catch (err) {
             console.error("Failed to fetch data:", err);
            }
          };
          fetchData();
    }, []);
  const [formData, setFormData] = useState({
    id: "",
    image: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    admissionClass: "",
    section: "",
    rollNo: "",
    admissionDate: "",
    previousSchool: "",
    previousClass: "",
    address: "",
    city: "",
    pinCode: "",
    mobileNumber: "",
    email: "",
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
    guardianNumber: "",
    parentMobile: "",
    whatsAppNumber: "",
    feeType: "",
    scholarshipAmount: "",
    admissionFees: "",
    monthlyFees: "",
    busServices: false,
    imageUrl: null,
  });

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      // await postSingleStudents(formData);
      alert("Student saved successfully!");
      setActiveComponent("2");
    } catch (err) {
      alert("Error saving student: " + err.message);
    }
  };

  return (
    <Container fluid className="p-4 bg-light">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => {
          setActiveComponent("2");
        }}
      >
        <FaArrowLeft /> Back
      </Button>

      {/* Student Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold">
          <FaUserGraduate /> Student Information
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Control placeholder="First Name *" value={formData.firstName} onChange={handleChange("firstName")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Middle Name" value={formData.middleName} onChange={handleChange("middleName")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Last Name *" value={formData.lastName} onChange={handleChange("lastName")} />
            </Col>
            <Col md={4}>
              <Form.Control type="date" value={formData.dateOfBirth} onChange={handleChange("dateOfBirth")} />
            </Col>
            <Col md={4}>
              <Form.Select value={formData.gender} onChange={handleChange("gender")}>
                <option value="">Select Gender *</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={formData.bloodGroup} onChange={handleChange("bloodGroup")}>
                <option value="">Select Blood Group *</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
                <option>Other</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Academic Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold">
          <FaUserGraduate /> Academic Information
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Select
                value={formData.admissionClass}
                onChange={handleChange("admissionClass")}
              >
                <option value="">Select Class *</option>
                {Object.keys(classListActor).map((classKey) => (
                  <option key={classKey} value={classKey}>
                    {classKey}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Select
                value={formData.section}
                onChange={handleChange("section")}
                disabled={!formData.admissionClass || classListActor[formData.admissionClass]?.length === 0}
              >
                <option value="">Select Section *</option>
                {classListActor[formData.admissionClass]?.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Roll No" value={formData.rollNo} onChange={handleChange("rollNo")} />
            </Col>
            <Col md={4}>
              <Form.Control type="date" placeholder="Admission Date *" value={formData.admissionDate} onChange={handleChange("admissionDate")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Previous School (if any)" value={formData.previousSchool} onChange={handleChange("previousSchool")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Previous Class" value={formData.previousClass} onChange={handleChange("previousClass")} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fees Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold">
          <FaMoneyCheckAlt /> Tuition Fees Information
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Select value={formData.feeType} onChange={handleChange("feeType")}>
                <option value="">Fee Type</option>
                <option>Regular</option>
                <option>Scholarship</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Scholarship Amount" value={formData.scholarshipAmount} onChange={handleChange("scholarshipAmount")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Admission Fees *" value={formData.admissionFees} onChange={handleChange("admissionFees")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Monthly Tuition Fees *" value={formData.monthlyFees} onChange={handleChange("monthlyFees")} />
            </Col>
            <Col md={8}>
              <Form.Check
                type="checkbox"
                label="Are you interested in taking bus services?"
                checked={formData.busServices}
                onChange={handleChange("busServices")}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Parent Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold">
          <MdFamilyRestroom /> Parent/Guardian Information
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {/* Father */}
            <Col md={4}><Form.Control placeholder="Father's Name" value={formData.fatherName} onChange={handleChange("fatherName")} /></Col>
            <Col md={4}><Form.Control placeholder="Father's Occupation" value={formData.fatherOccupation} onChange={handleChange("fatherOccupation")} /></Col>
            <Col md={4}><Form.Control placeholder="Father's Email" value={formData.fatherEmailId} onChange={handleChange("fatherEmailId")} /></Col>
            <Col md={4}><Form.Control placeholder="Father's Phone" value={formData.fatherNumber} onChange={handleChange("fatherNumber")} /></Col>
            <Col md={4}><Form.Control placeholder="Father's ID Proof" value={formData.fatherIdProof} onChange={handleChange("fatherIdProof")} /></Col>

            {/* Mother */}
            <Col md={4}><Form.Control placeholder="Mother's Name" value={formData.motherName} onChange={handleChange("motherName")} /></Col>
            <Col md={4}><Form.Control placeholder="Mother's Occupation" value={formData.motherOccupation} onChange={handleChange("motherOccupation")} /></Col>
            <Col md={4}><Form.Control placeholder="Mother's Email" value={formData.motherEmailId} onChange={handleChange("motherEmailId")} /></Col>
            <Col md={4}><Form.Control placeholder="Mother's Phone" value={formData.motherNumber} onChange={handleChange("motherNumber")} /></Col>
            <Col md={4}><Form.Control placeholder="Mother's ID Proof" value={formData.motherIdProof} onChange={handleChange("motherIdProof")} /></Col>

            {/* Guardian */}
            <Col md={4}><Form.Control placeholder="Guardian's Name" value={formData.guardianName} onChange={handleChange("guardianName")} /></Col>
            <Col md={4}><Form.Control placeholder="Guardian's Occupation" value={formData.guardianOccupation} onChange={handleChange("guardianOccupation")} /></Col>
            <Col md={4}><Form.Control placeholder="Guardian's Email" value={formData.guardianEmailId} onChange={handleChange("guardianEmailId")} /></Col>
            <Col md={4}><Form.Control placeholder="Guardian's Phone" value={formData.guardianNumber} onChange={handleChange("guardianNumber")} /></Col>
            <Col md={4}><Form.Control placeholder="Guardian's ID Proof" value={formData.guardianIdProof} onChange={handleChange("guardianIdProof")} /></Col>

            {/* Address */}
            <Col md={12}><Form.Control placeholder="Address" value={formData.address} onChange={handleChange("address")} /></Col>
            <Col md={4}><Form.Control placeholder="Country" value={formData.city} onChange={handleChange("city")} /></Col>
            <Col md={4}><Form.Control placeholder="District" value={formData.email} onChange={handleChange("email")} /></Col>
            <Col md={2}><Form.Control placeholder="PIN Code *" value={formData.pinCode} onChange={handleChange("pinCode")} /></Col>
            <Col md={2}><Form.Control placeholder="WhatsApp Number *" value={formData.whatsAppNumber} onChange={handleChange("whatsAppNumber")} /></Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={() => setFormData({ ...formData, ...Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: "" }), {}) })}>
          Reset Form
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Student
        </Button>
      </div>
    </Container>
  );
}
