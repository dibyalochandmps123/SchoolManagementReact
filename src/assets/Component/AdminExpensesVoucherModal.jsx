import React, { useRef } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AdminExpensesVoucherModal({ show, onClose, expense }) {
  const printRef = useRef();

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Expense-Voucher.pdf");
  };

  if (!expense) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Body>
        <div ref={printRef} className="p-3 bg-white">
          <h4 className="text-center text-success fw-bold">ABC Institution</h4>
          <h5 className="text-center mb-3">Expense Voucher</h5>
          <div className="text-end fw-bold mb-3">
            Date: {new Date().toLocaleDateString()}
          </div>
          <hr />

          <Table bordered>
            <tbody>
              <tr>
                <td><strong>Accounting Year</strong></td>
                <td>{expense.year}</td>
                <td><strong>Voucher/Bill No</strong></td>
                <td>{expense.voucher}</td>
              </tr>
              <tr>
                <td><strong>Amount</strong></td>
                <td>₹{expense.amount}</td>
                <td><strong>Expense Type</strong></td>
                <td>{expense.typeOfExpense}</td>
              </tr>
              <tr>
                <td><strong>Payment Mode</strong></td>
                <td>{expense.paymentMode}</td>
                <td><strong>Particulars</strong></td>
                <td>{expense.particular}</td>
              </tr>
              <tr>
                <td><strong>Paid By</strong></td>
                <td>{expense.paidBy}</td>
                <td><strong>Paid To</strong></td>
                <td>{expense.paidTo}</td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-4">
            <span>__________________<br />Prepared By</span>
            <span>__________________<br />Approved By</span>
            <span>__________________<br />Received By</span>
          </div>
        </div>
        <div className="text-end mt-3">
          <Button variant="primary" className="me-2" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
