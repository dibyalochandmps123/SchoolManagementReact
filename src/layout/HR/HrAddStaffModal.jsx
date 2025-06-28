import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

export default function HrAddStaffModal({ show, onHide, onSave, existingStaff }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const newId = `STF${((existingStaff?.length || 0) + 1).toString().padStart(3, '0')}NCE`;
    setFormData({
      id: newId,
      name: '',
      email: '',
      mobile: '',
      gender: '',
      dob: '',
      joinDate: '',
      department: '',
      designation: '',
      qualification: '',
      username: newId,
      password: '',
    });
  }, [existingStaff, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.mobile && formData.password) {
      onSave(formData);
      onHide();
    } else {
      alert('Please fill all required fields.');
    }
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Full Name *</Form.Label><Form.Control name="name" value={formData.name} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Staff ID</Form.Label><Form.Control value={formData.id} disabled /><Form.Text>Auto-generated ID for new staff</Form.Text></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Email *</Form.Label><Form.Control name="email" value={formData.email} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Phone *</Form.Label><Form.Control name="mobile" value={formData.mobile} onChange={handleChange} /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Col>
            <Col md={6}><Form.Label>Date of Birth</Form.Label><Form.Control name="dob" type="date" value={formData.dob} onChange={handleChange} /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Join Date</Form.Label><Form.Control name="joinDate" type="date" value={formData.joinDate} onChange={handleChange} /></Col>
            <Col md={6}><Form.Label>Profile Picture</Form.Label><Form.Control type="file" disabled /></Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Staff Department</Form.Label>
              <Form.Select name="department" value={formData.department} onChange={handleChange}>
                <option>Select Department</option>
                <option>Teaching</option>
                <option>Finance</option>
                <option>Human Resources</option>
                <option>IT</option>
              </Form.Select>
            </Col>
            <Col md={6}><Form.Label>Staff Designation</Form.Label>
              <Form.Select name="designation" value={formData.designation} onChange={handleChange}>
                <option>Select Designation</option>
                <option>Lead Teacher</option>
                <option>Assistant Teacher</option>
                <option>Accountant</option>
                <option>HR Manager</option>
                <option>IT Support</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}><Form.Label>Qualification</Form.Label><Form.Control name="qualification" value={formData.qualification} onChange={handleChange} placeholder="e.g B.Sc M.Sc Ph.D M.Tech" /></Col>
          </Row>
          <hr />
          <h6>Login Credentials</h6>
          <Row className="mb-3">
            <Col md={6}><Form.Label>Username *</Form.Label><Form.Control value={formData.username} disabled /></Col>
            <Col md={6}><Form.Label>Password *</Form.Label><Form.Control name="password" value={formData.password} onChange={handleChange} /></Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>
            Save Staff
        </Button>



      </Modal.Footer>
    </Modal>
  );
}