import React, { useState } from "react";
import {Container,Card,Form,Button,Row,Col,} from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";

export default function AdminAutoMessages() {
  const [customMessage, setCustomMessage] = useState("");

  return (
    <Container className="my-4">
      <Card className="shadow-sm p-4">
        <h5 className="fw-bold mb-3">📩 Message To Fee Defaulters</h5>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Custom Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your custom message here"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Professional Default Message</Form.Label>
          <Card className="p-3 bg-light border-0">
            <p>
              <strong>Subject:</strong> Fee Payment Reminder – Immediate Action Required
            </p>
            <p>Dear Parent/Guardian,</p>
            <p>We hope this message finds you well.</p>
            <p>
              This is a gentle reminder that the school fee for your child{" "}
              <strong>[Student Name]</strong> (Admission No: <strong>[XXXX]</strong>), studying in{" "}
              <strong>[Class/Grade]</strong>, is still outstanding as of{" "}
              <strong>[Due Date]</strong>.
            </p>
            <p>
              We kindly request you to clear the pending dues at the earliest to avoid any
              late fees or disruption to your child’s academic progress.
            </p>
            <ul>
              <li><strong>Total Due:</strong> $[Amount]</li>
              <li><strong>Due Date:</strong> [Original Due Date]</li>
              <li><strong>Status:</strong> Unpaid</li>
            </ul>
            <p>
              If you have already made the payment, please disregard this notice or share the
              payment details with us.
            </p>
            <p>Thank you for your prompt attention to this matter.</p>
            <p className="mb-0">Warm regards,</p>
            <p className="mb-0"><strong>Accounts Office</strong></p>
            <p className="mb-0">[School Name]</p>
            <p className="mb-0">[Contact Info]</p>
          </Card>
        </Form.Group>

        <Row className="text-end">
          <Col>
            <Button variant="primary" className="px-4">
              <FaPaperPlane className="me-2" />
              Send To Defaulters
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
