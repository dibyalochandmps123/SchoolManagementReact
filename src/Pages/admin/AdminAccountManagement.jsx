import React, { useState,useEffect} from "react";
import { Button, Container, Row, Col, Card, Form, Table } from "react-bootstrap";
import { FaEye, FaDownload } from "react-icons/fa";
import AdminAcMngStdFees from "../../Component/AdminAcMngStdFees.jsx"
import {getExpensesData,generateIncomeData,generateExpensesData} from "../../API/incomeTransaction.js"
import {getPaidAmountDataOfStudent} from "../../API/studentManagement.js"
import AdminExpensesVoucherModal  from "../../Component/AdminExpensesVoucherModal.jsx";
import AdminAddExpenseModal from "../../Component/AdminAddExpenseModal.jsx";



export default function AdminAccountManagement(){
  const [activeTab, setActiveTab] = useState("studentFees");
 
// This is for balance sheet
    const [totalPaidAmountStudent, setTotalPaidAmountStudent] = useState([]);
    const [totalExpensesAmount, setTotalExpensesAmount] = useState([]);
    const [totalIncomeBalanceSheet, setTotalIncomeBalanceSheet] = useState(0);
    const [totalExpensesBalanceSheet, setTotalExpensesBalanceSheet] = useState(0);
    const [netBalance, setNetBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // History
    const [incomeHistory,setIncomeHistory]=useState([]);
    const [expensesHistory,setExpensesHistory]=useState([]);
    useEffect(() => {
      const loadStdMngData = async () => {
        try {
          const studentAllFeesDetails = await getPaidAmountDataOfStudent();
          const expensesData = await getExpensesData();
          const totalIncome = studentAllFeesDetails.reduce((sum, s) => sum + s.paidAmount, 0);
          const totalExpenses = expensesData.reduce((sum, s) => sum + Number(s.amount), 0);
;
          setIncomeHistory(await generateIncomeData());
          setExpensesHistory(await generateExpensesData());
          setTotalPaidAmountStudent(studentAllFeesDetails);
          setTotalExpensesAmount(expensesData);
          setTotalIncomeBalanceSheet(totalIncome);
          setTotalExpensesBalanceSheet(totalExpenses);
          setNetBalance(totalIncome - totalExpenses);
        } catch (err) {
          console.error("Error fetching student Fees data:", err);
          setError("Failed to load student fees Data.");
        } finally {
          setLoading(false);
        }
      };
      loadStdMngData();
    }, []);
// Open voucher modal
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const handleViewVoucher = (expenseItem) => {
      console.log("Opening modal for:", expenseItem); // Add this
      setSelectedExpense(expenseItem);
      setShowVoucherModal(true);
    };
// Open Add expenses modal
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  return (
    <>
    <Container fluid className="p-3">
      {/* Top Tabs */}
      <Row className="mb-3">
        <Col>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant={activeTab === "studentFees" ? "primary" : "light"}
              onClick={() => setActiveTab("studentFees")}
            >
              💳 Student Fees
            </Button>
            <Button
              variant={activeTab === "balanceSheet" ? "primary" : "light"}
              onClick={() => setActiveTab("balanceSheet")}
            >
              📈 Balance Sheet
            </Button>
            <Button
              variant={activeTab === "expenseManagement" ? "primary" : "light"}
              onClick={() => setActiveTab("expenseManagement")}
            >
              📋 Expense Management
            </Button>
          </div>
        </Col>
      </Row>

      {/* Student Fees */}
      {activeTab === "studentFees" && (
        <AdminAcMngStdFees />
      )}

      {/* Balance Sheet */}
      {activeTab === "balanceSheet" && (
        <>
          <h3 className="text-center mb-4">School Balance Sheet</h3>
          <Row className="mb-4">
            <Col md={4} className="mb-3">
              <Card className="text-white bg-success p-3">
                <h5>Total Income</h5>
                <h3>{totalIncomeBalanceSheet.toLocaleString()} rs</h3>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="text-white bg-danger p-3">
                <h5>Total Expenses</h5>
                <h3>{totalExpensesBalanceSheet.toLocaleString()} rs</h3>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="text-white bg-primary p-3">
                <h5>Net Balance</h5>
                <h3>{netBalance.toLocaleString()} rs</h3>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Card className="p-3 shadow-sm" style={{minHeight:"500px"}}>
                <h5 className="text-success mb-3">Income</h5>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Fee Title</th>
                        <th>Amount (₹)</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incomeHistory.map((item) => (
                        <tr key={item.id}>
                          <td>{item.incomeId}</td>
                          <td>{item.name}</td>
                          <td>{item.class}</td>
                          <td>{item.feeTitle}</td>
                          <td>{item.amount} rs</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4"><strong>Total</strong></td>
                        <td colSpan="2"><strong>{totalIncomeBalanceSheet.toLocaleString()} rs</strong></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Col>

            <Col md={6} className="mb-3" >
              <Card className="p-3 shadow-sm" style={{minHeight:"500px"}}>
                <h5 className="text-danger mb-3">Expenses</h5>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Particulars</th>
                        <th>Type Of Expense</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expensesHistory.map((item) => (
                        <tr key={item.expenseId}>
                          <td>{item.expenseId}</td>
                          <td>{item.particular}</td>
                          <td>{item.typeOfExpense}</td>
                          <td>{item.amount} rs</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3"><strong>Total</strong></td>
                        <td colSpan="2"><strong>{totalExpensesBalanceSheet.toLocaleString()} rs</strong></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>

          <div className="text-end mt-3">
            <Button variant="primary">🖸️ Print Balance Sheet</Button>
          </div>
        </>
      )}

      {/* Expense Management */}
      {activeTab === "expenseManagement" && (
        <Card className="p-4 shadow-sm">
          <h4 className="text-center mb-4">Company Expenses Management</h4>
          <hr />
          <div className="text-end mb-3">
            <Button variant="primary" onClick={() => setShowAddExpenseModal(true)}>Record Expenses</Button>
          </div>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Year</th>
                  <th>Voucher/Bill No</th>
                  <th>Particulars</th>
                  <th>Type of Expense</th>
                  <th>Amount</th>
                  <th>Paid By</th>
                  <th>Paid To</th>
                  <th>Payment Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expensesHistory.map((item,idx) => (
                  <tr key={item.expenseId}>
                    <td>{idx+1}</td>
                    <td>{item.year}</td>
                    <td>{item.voucher}</td>
                    <td>{item.particular}</td>
                    <td>{item.typeOfExpense}</td>
                    <td>{item.amount}</td>
                    <td>{item.paidBy}</td>
                    <td>{item.paidTo}</td>
                    <td>{item.paymentMode}</td>
                    <td className="text-center">
                      <Button size="sm" variant="info" className="me-1"
                          onClick={() => handleViewVoucher(item)}
                      >
                        <FaEye />
                      </Button>
                      <Button size="sm" variant="primary">
                        <FaDownload />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      )}
    </Container>
    <AdminExpensesVoucherModal
      show={showVoucherModal}
      onClose={() => setShowVoucherModal(false)}
      expense={selectedExpense}
    />
    <AdminAddExpenseModal
      show={showAddExpenseModal}
      onClose={() => setShowAddExpenseModal(false)}
      onSave={(data) => {
        console.log("Saved Expense:", data);
        // push to API or update state here
    }}
    />
    </>
  );
};
