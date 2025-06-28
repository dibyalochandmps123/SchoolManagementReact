// Add this inside the same component file or import from another file
import React, { useState } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

export default function HrEditEmployeeModal({ show, onHide, staff, onUpdate }){
  const [formData, setFormData] = useState(staff || {});

  React.useEffect(() => {
    setFormData(staff || {});
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Full Name</Form.Label><Form.Control name="name" value={formData.name || ''} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Staff ID</Form.Label><Form.Control name="id" value={formData.id || ''} readOnly /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Email</Form.Label><Form.Control name="email" value={formData.email || ''} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Phone</Form.Label><Form.Control name="mobile" value={formData.mobile || ''} onChange={handleChange} /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Gender</Form.Label><Form.Control name="gender" value={formData.gender || ''} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="dob" value={formData.dob || ''} onChange={handleChange} /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Join Date</Form.Label><Form.Control type="date" name="joinDate" value={formData.joinDate || ''} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Profile Picture</Form.Label><Form.Control type="file" /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Staff Department</Form.Label><Form.Control name="department" value={formData.department || ''} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Staff Designation</Form.Label><Form.Control name="designation" value={formData.designation || ''} onChange={handleChange} /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}><Form.Label>Qualification</Form.Label><Form.Control name="qualification" value={formData.qualification || ''} onChange={handleChange} /></Col>
          </Row>
          <hr />
          <h6>Login Credentials</h6>
          <Row>
            <Col md={6}><Form.Label>Username</Form.Label><Form.Control name="username" value={formData.username || ''} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Password</Form.Label><Form.Control name="password" value={formData.password || ''} onChange={handleChange} /></Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Update Staff</Button>
      </Modal.Footer>
    </Modal>
  );
};
