import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import {putUpdateExistsParent} from "../API/parentManagement"
export default function EditParentModal({ show, handleClose, parentData, onSave, studentList }) {
  const [formData, setFormData] = useState(null);
  const [studentInput, setStudentInput] = useState("");
  const [studentError, setStudentError] = useState("");

  useEffect(() => {
    if (parentData) {
      setFormData({
        ...parentData,
        studentId: parentData.studentId.map(child =>
          typeof child === "object" ? child.student_id : child
        ),
      });
    }
  }, [parentData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChild = () => {
    if (!studentInput.trim()) return;
    const match = studentList.find((s) => s.studentId === studentInput.trim());
    if (match) {
      if (!formData.studentId.includes(studentInput)) {
        setFormData((prev) => ({
          ...prev,
          studentId: [...prev.studentId, studentInput.trim()],
        }));
        setStudentError("");
      } else {
        setStudentError("Student already added.");
      }
    } else {
      setStudentError("Invalid Student ID.");
    }
    setStudentInput("");
  };

  const matchedStudents = studentList.filter((stu) =>
    formData?.studentId.includes(stu.studentId)
  );

  const handleSubmit = async () => {
    if (formData) {
      const children = formData.studentId.map((studentId) => {
        const student = studentList.find((s) => s.studentId === studentId);
        return {
          student_id: studentId,
          student_name: student ? student.name : "",
        };
      });

      const payload = {
        id: formData.parentId,
        full_name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        gender: formData.gender,
        profession: formData.profession,
        username: formData.username,
        password: formData.password,
        children,
      };

      try {
        await putUpdateExistsParent(payload); // replace with your API function
        onSave(payload);
        handleClose();
      } catch (error) {
        console.error("Failed to update parent:", error);
      }
    }
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Parent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Parent ID *</Form.Label>
            <Form.Control value={formData.parentId} disabled />
          </Col>
          <Col md={6}>
            <Form.Label>Full Name *</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Email *</Form.Label>
            <Form.Control name="email" value={formData.email} onChange={handleChange} />
          </Col>
          <Col md={6}>
            <Form.Label>Phone *</Form.Label>
            <Form.Control name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Gender *</Form.Label>
            <Form.Control name="gender" value={formData.gender} onChange={handleChange} />
          </Col>
          <Col md={6}>
            <Form.Label>Profession *</Form.Label>
            <Form.Control name="profession" value={formData.profession} onChange={handleChange} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={9}>
            <Form.Label>Student ID *</Form.Label>
            <Form.Control
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              placeholder="Enter student ID to add"
            />
            {studentError && <div className="text-danger small mt-1">{studentError}</div>}
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button onClick={handleAddChild} className="w-100">
              + Add Child
            </Button>
          </Col>
        </Row>

        <Card className="p-3 mb-3">
          <Form.Label className="fw-bold">List Of Student Name</Form.Label>
            {matchedStudents.length ? matchedStudents.map((stu) => (
              <div key={stu.studentId} className="border rounded p-2 mb-2">
                <strong>{stu.name}</strong> ({stu.studentId}) - <em>{stu.class}</em>
              </div>
            )) : (
              <div className="text-muted">
                {parentData.studentId.length === 0 ? (
                  "Student Not Found"
                ) : (
                  <ul className="mb-0 ps-3">
                    {parentData.studentId.map((item, index) => (
                      <li key={index}>{item.student_name}</li>
                    ))}
                  </ul>
                )}
              </div>

            )}
        </Card>

        <Row>
          <Col md={6}>
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={formData.username} onChange={handleChange} />
          </Col>
          <Col md={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={formData.password} onChange={handleChange} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update Parent
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
