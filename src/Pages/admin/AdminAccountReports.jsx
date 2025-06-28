import React, { useState,useEffect} from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Table,
  Button,
  Nav,
} from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {generateExpensesData} from "../../API/incomeTransaction"
import {getFeesOfStudents} from "../../API/studentManagement"
export default function AdminAccountReports() {
  const [activeTab, setActiveTab] = useState("fees");

  //FeesReport
        const [studentData,setStudentData]=useState([]);
        const [regdNo, setRegdNo] = useState("");
        const [fromDate, setFromDate] = useState("");
        const [toDate, setToDate] = useState("");
        const [minAmount, setMinAmount] = useState("");
        const [maxAmount, setMaxAmount] = useState("");
        const [filteredPayments, setFilteredPayments] = useState([]);
        const handleFilter = () => {
            const results = [];
            studentData.forEach((student) => {
            if (regdNo && !student.regdNo.includes(regdNo)) return;
            student.payments.forEach((payment) => {
                const latestHistory = payment.history?.[0];
                if (!latestHistory || !latestHistory.timestamp) return;
                const paymentDate = new Date(latestHistory.timestamp);
                const from = fromDate ? new Date(fromDate) : null;
                const to = toDate ? new Date(toDate) : null;
                if (from && paymentDate < from) return;
                if (to && paymentDate > to) return;
                if (minAmount && Number(latestHistory.amount) < Number(minAmount)) return;
                if (maxAmount && Number(latestHistory.amount) > Number(maxAmount)) return;
                results.push({
                date: latestHistory.timestamp,
                amount: latestHistory.amount,
                description: payment.description,
                });
            });
            });

            setFilteredPayments(results);
        };
  //Expenses Report
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        // History
        const [expensesHistory,setExpensesHistory]=useState([]);
        useEffect(() => {
          const loadStdMngData = async () => {
            try {
              setExpensesHistory(await generateExpensesData());
              setStudentData(await getFeesOfStudents());
            } catch (err) {
              console.error("Error fetching student Fees data:", err);
              setError("Failed to load student fees Data.");
            } finally {
              setLoading(false);
            }
          };
          loadStdMngData();
    }, []);
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPayments); // Replace with your data
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FilteredData");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Filtered_Payments_Report.xlsx");
  };

  return (
    <Container fluid className="mt-3 px-4">
      <div style={{ maxWidth: "100%" }}>
        <h3 className="text-center mb-4">Account Reports</h3>

        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Nav.Item>
            <Nav.Link eventKey="fees">Fees Report</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="expenses">Expenses Report</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* --- FEES REPORT --- */}
        {activeTab === "fees" && (
          <Card className="p-4 shadow-sm w-100">
          <h5 className="mb-3">Filter Fees Transactions</h5>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Registration Number"
                    value={regdNo}
                    onChange={(e) => setRegdNo(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Amount Range</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min Range e.g., 500"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max Range e.g., 1000"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mb-3">
              <Button variant="primary" onClick={handleFilter}>
                Filter
              </Button>
            </div>
          </Form>

          <div className="table-responsive">
            <Table bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-muted">
                      No data found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          <div className="text-end">
            <Button variant="success" onClick={handleDownloadExcel}>
              Download Excel
            </Button>
          </div>
        </Card>
        )}

        {/* --- EXPENSES REPORT --- */}
        {activeTab === "expenses" && (
          <Card className="p-4 shadow-sm">
            <h5 className="mb-4">Expenses Data</h5>

            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="table-light">
                  <tr>
                    <th>Voucher ID</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.voucher}</td>
                      <td>{item.amount}</td>
                      <td>{item.typeOfExpense}</td>
                      <td>{item.particular}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="text-end mt-3">
              <Button variant="success" onClick={handleDownloadExcel}>
                Download Excel
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Container>
  );
}
