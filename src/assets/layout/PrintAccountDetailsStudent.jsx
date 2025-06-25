import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../layoutCss/PrintAccountDetailsStudent.css";

export default function PrintAccountDetailsStudent({ show, onHide, data }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Fee Payment Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="receipt-container">
          <div className="header">
            <img src="../../../static/images/logos/school_logo.svg" alt="School Logo" />
            <div className="header-center">
              <h2>ABC International School</h2>
              <div style={{ fontSize: "14px" }}>123 Main Street, City, Country</div>
            </div>
            <div className="header-right">
              <div>No : <span id="receipt-no">{data?.receiptNo || "[No]"}</span></div>
              <div>Date : <span id="receipt-date">{data?.date || "[Date]"}</span></div>
            </div>
          </div>

          <div className="section">
            <div><span className="label">Registration No :</span> <span id="receiver-id">{data?.regdNo || "[Regd Id]"}</span></div>
            <div><span className="label">Name :</span> <span id="receiver-name">{data?.name || "[Name]"}</span></div>
            <div><span className="label">Amount :</span> <span id="amount-words">{data?.amountWords || "[Amount in Words]"}</span></div>
          </div>

          <div className="line"></div>

          <div className="section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: "1" }}>
              <div className="label">Payment For: </div>
              <div id="payment_remark">{data?.description || "[Description]"}</div>
            </div>
            <div className="amount-box">
              Amount <br /> <span id="amount-number">{data?.amount || "[Amount]"}</span>
            </div>
          </div>

          <div className="line"></div>

          <div className="signature-section">
            <div className="signature-box">
              <div className="signature-label">Received By:</div>
              <div id="received-by">{data?.receivedBy || "[Received By]"}</div>
              <div className="signature-line">Signature</div>
            </div>
            <div className="signature-box">
              <div className="signature-label">Authorized By:</div>
              <div id="authorized-by">{data?.authorizedBy || "[Authorized By]"}</div>
              <div className="signature-line">Signature</div>
            </div>
          </div>

          <div className="footer-bar"></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => window.print()} variant="success">Print Receipt</Button>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
