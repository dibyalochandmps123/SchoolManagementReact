import React, { useRef, useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import html2pdf from "html2pdf.js";

export default function AdminViewParentModal({ show, handleClose, parent, students }) {
  const printRef = useRef();
  const [studentList,setStudentList]=useState(null);
  if (!parent) return null;
console.log("Parent is :",parent);

  const matchedStudents = students.filter((stu) =>
    parent.studentId.includes(stu.studentId)
  );

  const handlePrintPDF = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.3,
      filename: `${parent.name.replace(/\s/g, "_")}_Details.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Parent Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={printRef} className="bg-white p-3" style={{ fontFamily: "Segoe UI" }}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Parent ID</strong></Form.Label>
                <Form.Control readOnly value={parent.parentId} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Full Name</strong></Form.Label>
                <Form.Control readOnly value={parent.name} />
              </Form.Group>
            </Col>
          </Row>

          <Card className="p-3 mb-3 shadow-sm">
            <Form.Label className="fw-bold">List Of Student(s)</Form.Label>
            {matchedStudents.length ? matchedStudents.map((stu) => (
              <div key={stu.studentId} className="border rounded p-2 mb-2">
                <strong>{stu.name}</strong> ({stu.studentId}) - <em>{stu.class}</em>
              </div>
            )) : (
              <div className="text-muted">
                {parent.studentId.length === 0 ? (
                  "Student Not Found"
                ) : (
                  <ul className="mb-0 ps-3">
                    {parent.studentId.map((item, index) => (
                      <li key={index}>{item.student_name}</li>
                    ))}
                  </ul>
                )}
              </div>

            )}
          </Card>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Email</strong></Form.Label>
                <Form.Control readOnly value={parent.email} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Phone</strong></Form.Label>
                <Form.Control readOnly value={parent.phoneNumber} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Gender</strong></Form.Label>
                <Form.Control readOnly value={parent.gender} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Profession</strong></Form.Label>
                <Form.Control readOnly value={parent.profession} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Username</strong></Form.Label>
                <Form.Control readOnly value={parent.username} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label><strong>Password</strong></Form.Label>
                <Form.Control readOnly value={parent.password} />
              </Form.Group>
            </Col>
          </Row>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrintPDF}>
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
