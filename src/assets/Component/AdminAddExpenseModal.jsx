import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default function AdminAddExpenseModal({ show, onClose, onSave }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    accountingYear: "2025-2026",
    voucher: "EXP-0004",
    amount: "",
    particulars: "",
    image: null,
    expenseType: "",
    paymentMode: "",
    paidBy: "",
    paidTo: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Expense Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Accounting Year</Form.Label>
              <Form.Select
                name="accountingYear"
                value={formData.accountingYear}
                onChange={handleChange}
              >
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Voucher/Bill No</Form.Label>
              <Form.Control
                name="voucher"
                value={formData.voucher}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="e.g. 5000"
                value={formData.amount}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Particulars</Form.Label>
            <Form.Control
              name="particulars"
              placeholder="What is this expense for?"
              value={formData.particulars}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Attach Voucher Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Expense Type</Form.Label>
              <Form.Select
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Salary">Salary</option>
                <option value="Stationery">Stationery</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Payment Mode</Form.Label>
              <Form.Select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              >
                <option value="">Select Mode</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
                <option value="UPI">UPI</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Paid By</Form.Label>
              <Form.Control
                name="paidBy"
                placeholder="Person who paid"
                value={formData.paidBy}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Paid To</Form.Label>
              <Form.Control
                name="paidTo"
                placeholder="Vendor/Payee name"
                value={formData.paidTo}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="danger" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
