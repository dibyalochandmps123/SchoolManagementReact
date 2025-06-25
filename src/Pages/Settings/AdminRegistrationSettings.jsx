import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { addProtocols, getProtocols } from "../../API/adminSettings";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AdminRegistrationSettings() {
  const [staffPrefix, setStaffPrefix] = useState("");
  const [staffSuffix, setStaffSuffix] = useState("");
  const [studentPrefix, setStudentPrefix] = useState("");
  const [studentSuffix, setStudentSuffix] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getProtocols();
        console.log("Fetched from backend:", data);

        setStaffPrefix(data.staff_reg?.prefix || "");
        setStaffSuffix(data.staff_reg?.suffix || "");
        setStudentPrefix(data.student_reg?.prefix || "");
        setStudentSuffix(data.student_reg?.suffix || "");
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setError("Failed to load registration settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 💾 Save new settings
  const handleSave = async () => {
    const registrationSettings = {
      staff_reg: {
        prefix: staffPrefix,
        suffix: staffSuffix
      },
      student_reg: {
        prefix: studentPrefix,
        suffix: studentSuffix
      }
    };
    try {
      await addProtocols(registrationSettings);
      const updatedData = await getProtocols();
      setStaffPrefix(updatedData.staff_reg?.prefix || "");
      setStaffSuffix(updatedData.staff_reg?.suffix || "");
      setStudentPrefix(updatedData.student_reg?.prefix || "");
      setStudentSuffix(updatedData.student_reg?.suffix || "");
      alert("Registration settings saved successfully.");
    } catch (err) {
      console.error("Add Item Failed:", err);
      alert("Failed to save settings.");
    }
  };
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading settings...</p>
      </div>
    );
  }
  return (
    <Card className="p-4 shadow-sm">
      <h5 className="fw-bold mb-4">Registration Number Settings</h5>

      {error && <Alert variant="danger">{error}</Alert>}
      <Form>
        <Row className="mb-3">
          <Col md={6} className="mb-3">
            <Form.Label>Staff Prefix</Form.Label>
            <Form.Control
              value={staffPrefix}
              onChange={(e) => setStaffPrefix(e.target.value)}
              placeholder="Enter staff prefix"
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Staff Suffix</Form.Label>
            <Form.Control
              value={staffSuffix}
              onChange={(e) => setStaffSuffix(e.target.value)}
              placeholder="Enter staff suffix"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} className="mb-3">
            <Form.Label>Student Prefix</Form.Label>
            <Form.Control
              value={studentPrefix}
              onChange={(e) => setStudentPrefix(e.target.value)}
              placeholder="Enter student prefix"
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Student Suffix</Form.Label>
            <Form.Control
              value={studentSuffix}
              onChange={(e) => setStudentSuffix(e.target.value)}
              placeholder="Enter student suffix"
            />
          </Col>
        </Row>

        <div className="text-end mt-4">
          <Button className="animated-btn" onClick={handleSave}>
            💾 Save Changes
          </Button>
        </div>
      </Form>
    </Card>
  );
}
