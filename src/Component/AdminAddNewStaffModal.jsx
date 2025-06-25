import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { provideListOfAllActor } from "../API/totalData";
export default function AdminAddNewStaffModal({
  showAddNew,
  handleCloseAddNew,
  handleAddNewStaff,
  currentCount,
}) {
  const [staffDeptpartmentList,setStaffDeptpartmentList]=useState([]);
  const [staffListDesignation,setStaffListDesignation]=useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const getAllActorData = await provideListOfAllActor();
          setStaffDeptpartmentList(getAllActorData[2]);
          setStaffListDesignation(getAllActorData[3]);
        } catch (err) {
          console.error("Failed to fetch data:", err);
        }
      };
      fetchData();
  }, []);
  const [AddNew, setAddNew] = useState({
    fullName: "",
    staffId: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    joinDate: "",
    department: "",
    designation: "",
    qualification: "",
    loginId: "",
    loginPassword: "",
    profile: "",
  });

  useEffect(() => {
    const newIdNum = currentCount + 1;
    const newStaffId = `STF${newIdNum.toString().padStart(3, "0")}NCE`;
    setAddNew((prev) => ({
      ...prev,
      staffId: newStaffId,
      loginId: newStaffId,
    }));
  }, [showAddNew, currentCount]);

  const handleChange = (field, value) => {
    setAddNew((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = ["fullName", "email", "phoneNumber", "loginPassword"];
    const missing = requiredFields.filter((f) => !AddNew[f]);
    if (missing.length > 0) {
      alert("Please fill all required fields.");
      return;
    }
    handleAddNewStaff(AddNew);
    handleCloseAddNew();
  };

  return (
    <Modal show={showAddNew} onHide={handleCloseAddNew} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Add New Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  value={AddNew.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Staff ID</Form.Label>
                <Form.Control value={AddNew.staffId} readOnly />
                <Form.Text className="text-muted">Auto-generated ID for new staff</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={AddNew.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone *</Form.Label>
                <Form.Control
                  type="text"
                  value={AddNew.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder="+91 (India)"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={AddNew.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={AddNew.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Join Date</Form.Label>
                <Form.Control
                  type="date"
                  value={AddNew.joinDate}
                  onChange={(e) => handleChange("joinDate", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Staff Department</Form.Label>
                <Form.Select
                  value={AddNew.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                >
                  <option value="">Select Section</option>
                    {staffDeptpartmentList.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Staff Designation</Form.Label>
                <Form.Select
                  value={AddNew.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                >
                  <option value="">Select Section</option>
                    {staffListDesignation.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  value={AddNew.qualification}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                  placeholder="e.g B.Sc M.Sc Ph.D M.Tech"
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h6>Login Credentials</h6>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Username *</Form.Label>
                <Form.Control value={AddNew.loginId} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  value={AddNew.loginPassword}
                  onChange={(e) => handleChange("loginPassword", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddNew}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Staff
        </Button>
      </Modal.Footer>
    </Modal>
  );
}