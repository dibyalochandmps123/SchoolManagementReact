import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function AdminEditStaffModal({ showEdit, handleCloseEdit, edit, handleUpdate }) {
  const [editForm, setEditForm] = useState(edit);

  useEffect(() => {
    setEditForm(edit);
  }, [edit]);

  const handleChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!editForm.fullName || !editForm.email || !editForm.phoneNumber || !editForm.loginId || !editForm.loginPassword) {
      alert("Please fill all required fields.");
      return;
    }
    handleUpdate(editForm);
    handleCloseEdit();
  };

  return (
    <Modal show={showEdit} onHide={handleCloseEdit} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  value={editForm.fullName || ""}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Staff ID</Form.Label>
                <Form.Control value={editForm.staffId} readOnly disabled/>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  value={editForm.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone *</Form.Label>
                <Form.Control
                  value={editForm.phoneNumber || ""}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  value={editForm.gender || ""}
                  onChange={(e) => handleChange("gender", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={editForm.dateOfBirth || ""}
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
                  value={editForm.joinDate || ""}
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
                <Form.Control
                  value={editForm.department || ""}
                  onChange={(e) => handleChange("department", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Staff Designation</Form.Label>
                <Form.Control
                  value={editForm.designation || ""}
                  onChange={(e) => handleChange("designation", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  value={editForm.qualification || ""}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                />
                <Form.Text muted>e.g B.Sc M.Sc Ph.D M.Tech</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h6>Login Credentials</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  value={editForm.loginId || ""}
                  onChange={(e) => handleChange("loginId", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  value={editForm.loginPassword || ""}
                  onChange={(e) => handleChange("loginPassword", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEdit}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update Staff
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
