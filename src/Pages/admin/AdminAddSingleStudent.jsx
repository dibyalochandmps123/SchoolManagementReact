import React, { useState,useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Card
} from "react-bootstrap";
import { postSingleStudents,adminGetAllStudentManagement} from "../../API/studentManagement";
import {sendClassAvailableData,getFeesOfStudents} from "../../API/totalData"
import { FaArrowLeft, FaUserGraduate, FaMoneyCheckAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

export default function AdminAddSingleStudent({ setActiveComponent }){
const classOrder = ["Nursery", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

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
  const [classListActor,setClassListActor]=useState([]);
  const [classFees,setClassFees]=useState({});
  useEffect(() => {
      const fetchData = async () => {
            try {
              let studentAllData=await adminGetAllStudentManagement()
              let studentCount=studentAllData.length;
              const suffix =`${formData.rollNo}NCE`;
              const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
              const id = `STU${currentDate}${String(studentCount + 1).padStart(4, '0')}${suffix}`;
              setClassFees(await getFeesOfStudents())
              setClassListActor(await sendClassAvailableData());
              formData.id=id;
            }catch (err) {
             console.error("Failed to fetch data:", err);
            }
          };
          fetchData();
    }, []);
    useEffect(() => {
      if (formData.admissionClass && classListActor[formData.admissionClass]) {
        const sections = classListActor[formData.admissionClass];
        // Set previous class
        const currentIndex = classOrder.indexOf(formData.admissionClass);
        const prevClass = currentIndex > 0 ? classOrder[currentIndex - 1] : "";
        // Find first available section
        const availableSection = Object.keys(sections).find((sectionKey) => {
          const sectionData = sections[sectionKey];
          const current = parseInt(sectionData.currentStudents ?? "0", 10);
          const total = parseInt(sectionData.totalStudents ?? "0", 10);
          return !isNaN(current) ? current + 1 : 1;
        });
        if (availableSection) {
          const sectionData = sections[availableSection];
          const nextRoll = parseInt(sectionData.currentStudents)+1;
          setFormData((prev) => ({
            ...prev,
            section: availableSection,
            rollNo: nextRoll.toString(),
            previousClass: prevClass,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            section: '',
            rollNo: '',
            previousClass: prevClass,
          }));
          alert("No available sections in this class.");
        }
      }
    }, [formData.admissionClass, classListActor]);
  const handleChange = (field) => (e) => {
    const value =e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (formData.admissionClass && classFees[formData.admissionClass]) {
      setFormData((prev) => ({
        ...prev,
        admissionFees: classFees[formData.admissionClass].admissionFees,
        monthlyFees: classFees[formData.admissionClass].monthlyFees,
      }));
    }
  }, [formData.admissionClass, classFees]);
    const isFatherComplete = formData.fatherName && formData.fatherOccupation && formData.fatherIdProof && formData.fatherEmailId && formData.fatherNumber;
    const isMotherComplete = formData.motherName && formData.motherOccupation && formData.motherIdProof && formData.motherEmailId && formData.motherNumber;
    const isGuardianComplete = formData.guardianName && formData.guardianOccupation && formData.guardianIdProof && formData.guardianEmailId && formData.guardianNumber;
    const atLeastOneComplete = isFatherComplete || isMotherComplete || isGuardianComplete;
  const handleSubmit = async () => {
    if (!atLeastOneComplete) {
      alert("Please complete all fields of at least one section: Father, Mother, or Guardian.");
      return;
    }
    try {
      await postSingleStudents(formData);
      alert("Student saved successfully!");
      setActiveComponent("2");
      console.log(formData);
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
              <Form.Control placeholder="Section" disabled value={formData.section}/>
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Roll No" value={formData.rollNo} disabled style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}/>
            </Col>
            <Col md={4}>
              <Form.Control type="date" placeholder="Admission Date *" value={formData.admissionDate} onChange={handleChange("admissionDate")} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Previous School (if any)" value={formData.previousSchool} onChange={handleChange("previousSchool")} />
            </Col>
            <Col md={4}>
              <Form.Control
                placeholder="Previous Class"
                value={formData.previousClass}
                readOnly
                style={{ backgroundColor: "#f8f9fa", cursor: "not-allowed" }}
              />

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
                <option value="regular">Regular</option>
                <option value="scholarship">Scholarship</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Scholarship Amount"
                value={formData.scholarshipAmount}
                onChange={handleChange("scholarshipAmount")}
                disabled={formData.feeType==="scholarship"?false:true}
                />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Admission Fees *" disabled value={formData.admissionFees} />
            </Col>
            <Col md={4}>
              <Form.Control placeholder="Monthly Tuition Fees *" disabled value={formData.monthlyFees} />
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
