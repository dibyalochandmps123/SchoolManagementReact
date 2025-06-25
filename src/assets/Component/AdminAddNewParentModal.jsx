import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Card,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaEye } from "react-icons/fa";

export default function AdminAddNewParentModal({ show, handleClose, onSave, studentList }) {
  const [parentData, setParentData] = useState({
    parentId: "",
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profession: "",
    username: "",
    password: "",
    studentId: [],
  });

  const [searchId, setSearchId] = useState("");
  const [foundStudent, setFoundStudent] = useState(null);

  // Auto generate ID on open
  useEffect(() => {
    if (show) {
      const newId = `PAR${Math.floor(100 + Math.random() * 900)}NCE`;
      setParentData((prev) => ({
        ...prev,
        parentId: newId,
        username: newId,
      }));
      setSearchId("");
      setFoundStudent(null);
    }
  }, [show]);

  const handleSearchStudent = () => {
    const student = studentList.find((s) => s.studentId === searchId.trim());
    setFoundStudent(student || null);
  };

  const handleAddStudent = () => {
    if (foundStudent && !parentData.studentId.includes(foundStudent.studentId)) {
      setParentData((prev) => ({
        ...prev,
        studentId: [...prev.studentId, foundStudent.studentId],
      }));
    }
    setSearchId("");
    setFoundStudent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(parentData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Parent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={9}>
            <Form.Control
              placeholder="Enter Student ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button onClick={handleSearchStudent} className="w-100">
              <FaSearch /> Search
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Card className="p-3">
              <Form.Label className="fw-bold">Children Name</Form.Label>
              {parentData.studentId.length > 0 ? (
                parentData.studentId.map((id) => {
                  const stu = studentList.find((s) => s.studentId === id);
                  return (
                    <div key={id} className="mb-2 bg-light p-2 rounded border">
                      {stu?.name} ({id})
                    </div>
                  );
                })
              ) : (
                <div className="text-muted">No students added</div>
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Check Child Name</Form.Label>
              <Form.Control
                readOnly
                value={foundStudent ? foundStudent.name : ""}
              />
              <Button
                className="mt-2"
                onClick={handleAddStudent}
                disabled={!foundStudent}
              >
                <FaPlus /> Add Student
              </Button>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                name="name"
                value={parentData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Parent ID</Form.Label>
              <Form.Control value={parentData.parentId} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                name="email"
                value={parentData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={parentData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Gender *</Form.Label>
              <Form.Select
                name="gender"
                value={parentData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Profession *</Form.Label>
              <Form.Control
                name="profession"
                value={parentData.profession}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <h6 className="fw-bold mb-3">Login Credentials</h6>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Username *</Form.Label>
              <Form.Control value={parentData.username} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={parentData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Parent
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
