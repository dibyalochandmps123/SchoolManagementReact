import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default function AdminViewStaffModal({ view, showView, handleCloseView }) {
  return (
    <Modal show={showView} onHide={handleCloseView} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Staff Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control value={view.fullName} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Staff ID</Form.Label>
                <Form.Control value={view.staffId} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={view.email} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control value={view.phoneNumber} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control value={view.gender} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control value={view.dateOfBirth} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Join Date</Form.Label>
                <Form.Control value={view.joinDate} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Designation</Form.Label>
                <Form.Control value={view.designation} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Control value={view.department} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Qualification</Form.Label>
                <Form.Control value={view.qualification} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <h6>Login Credentials</h6>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control value={view.loginId} readOnly />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control value={view.loginPassword} readOnly />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseView}>
          Close
        </Button>
        <Button variant="primary" onClick={() => window.print()}>
          Print Details
        </Button>
      </Modal.Footer>
    </Modal>
  );
}