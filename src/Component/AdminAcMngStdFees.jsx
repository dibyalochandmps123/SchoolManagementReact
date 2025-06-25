import React, { useState,useEffect} from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal
} from "react-bootstrap";
import { Alert } from "react-bootstrap";
import AdminAcMngStdFeePayNowModal from "./AdminAcMngStdFeePayNowModal";
import { FaUserGraduate, FaFileInvoice } from "react-icons/fa";
import {getFeesOfStudents,adminGetAllStudentManagement} from "../API/studentManagement"
import PrintAccountDetailsStudent from "../layout/PrintAccountDetailsStudent";
// const studentInformation = [
//   {
//     firstName: "Vavya",
//     middleName: "Prakash",
//     lastName: "Mahapatra",
//     dob: "19-02-2004",
//     gender: "Female",
//     bloodGroup: "AB+",
//     admissionClass: "I",
//     section: "B",
//     regdNo: "STU202505290004NCE",
//     rollNo: "1",
//     admissionDate: "29-05-2025",
//     previousSchool: "ABCD School",
//     previousClass: "I",
//     feeType: "",
//     scholarshipAmount: "",
//     admissionFees: "",
//     monthlyTutionFees: "",
//     busService: false,
//     father: {
//       name: "Alex Jones",
//       occupation: "Land",
//       idProof: "ID101",
//       email: "darshansahoo404@gmail.com",
//       number: "7894561230",
//     },
//     mother: { name: "", occupation: "", idProof: "", email: "", number: "" },
//     guardian: {
//       name: "",
//       occupation: "",
//       idProof: "",
//       email: "darshansahoo404@gmail.com",
//       number: "3221321322",
//     },
//     address: "Badalotta, Jatni, Odisha, India",
//     countryName: "",
//     districtName: "",
//     pinCode: "752050",
//     whatsapp: "9876543210",
//   },
//   {
//     firstName: "Dibyalochan",
//     middleName: "",
//     lastName: "Dash",
//     dob: "25-11-2002",
//     gender: "Male",
//     bloodGroup: "o+",
//     admissionClass: "I",
//     section: "B",
//     regdNo: "STU202505290004NCE",
//     rollNo: "2",
//     admissionDate: "29-05-2025",
//     previousSchool: "ABCD School",
//     previousClass: "I",
//     feeType: "",
//     scholarshipAmount: "",
//     admissionFees: "",
//     monthlyTutionFees: "",
//     busService: false,
//     father: {
//       name: "Bhaskar Dash",
//       occupation: "",
//       idProof: "ID101",
//       email: "abc@gmail.com",
//       number: "6545313541",
//     },
//     mother: { name: "", occupation: "", idProof: "", email: "", number: "" },
//     guardian: {
//       name: "",
//       occupation: "",
//       idProof: "",
//       email: "abc@gmail.com",
//       number: "3221321322",
//     },
//     address: "At/Po-Balipal,Kendrapara",
//     countryName: "India",
//     districtName: "Kendrapara",
//     pinCode: "754212",
//     whatsapp: "3213513351",
//   },
// ];
// const feeDataset=[
//     {
//         "class": "I",
//         "dob": "2003-06-16",
//         "fees": {
//             "annualFees": "5000",
//             "balanceAmount": 34700.0,
//             "busFees": "0",
//             "monthlyFees": "2000",
//             "noOfMonthlyDues": 12,
//             "otherFees": 5700,
//             "paidAmount": 0,
//             "paidAnnualFees": "False"
//         },
//         "gender": "Male",
//         "mobile": "",
//         "name": "Bedaprakash Sahoo",
//         "payments": [
//             {
//                 "amount": 2000.0,
//                 "description": "JAN Monthly Tuition + Bus Fee",
//                 "history": [
//                     {
//                         "amount": "2000",
//                         "paymentType": "Cash",
//                         "timestamp": "2025-05-23 11:27:15"
//                     }
//                 ],
//                 "paidAmount": 2000.0,
//                 "paymentType": "",
//                 "slNo": 1,
//                 "status": "Completed"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "FEB Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 2,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "MAR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 3,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "APR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 4,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "MAY Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 5,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "JUN Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 6,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "JUL Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 7,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "AUG Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 8,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "SEP Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 9,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "OCT Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 10,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "NOV Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 11,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2000.0,
//                 "description": "DEC Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 12,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 4000,
//                 "description": "Class Fee: Ganesh Puja Chanda",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 13,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 500,
//                 "description": "Class Fee: Bus",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 14,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 1000,
//                 "description": "Section Fee: School Goodies Fees",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 15,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 200,
//                 "description": "Section Fee: Somethhing",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 16,
//                 "status": "Pending"
//             }
//         ],
//         "regdNo": "STU202505230001NCE",
//         "section": "A"
//     },
//     {
//         "class": "I",
//         "dob": "2025-05-23",
//         "fees": {
//             "annualFees": "5000",
//             "balanceAmount": 35900.0,
//             "busFees": "200",
//             "monthlyFees": "2000",
//             "noOfMonthlyDues": 12,
//             "otherFees": 4500,
//             "paidAmount": 0,
//             "paidAnnualFees": "False"
//         },
//         "gender": "Female",
//         "mobile": "",
//         "name": "SecondStudent Sahoo",
//         "payments": [
//             {
//                 "amount": 2200.0,
//                 "description": "JAN Monthly Tuition + Bus Fee",
//                 "history": [
//                     {
//                         "amount": "2200",
//                         "paymentType": "Cash",
//                         "timestamp": "2025-05-23 11:28:55"
//                     }
//                 ],
//                 "paidAmount": 2200.0,
//                 "paymentType": "",
//                 "slNo": 1,
//                 "status": "Completed"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "FEB Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 2,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "MAR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 3,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "APR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 4,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "MAY Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 5,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "JUN Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 6,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "JUL Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 7,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "AUG Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 8,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "SEP Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 9,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "OCT Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 10,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "NOV Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 11,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "DEC Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 12,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 4000,
//                 "description": "Class Fee: Ganesh Puja Chanda",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 13,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 500,
//                 "description": "Class Fee: Bus",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 14,
//                 "status": "Pending"
//             }
//         ],
//         "regdNo": "STU202505230002NCE",
//         "section": "B"
//     },
//     {
//         "class": "III",
//         "dob": "2025-05-27",
//         "fees": {
//             "annualFees": "6000",
//             "balanceAmount": 34800.0,
//             "busFees": "0",
//             "monthlyFees": "2400",
//             "noOfMonthlyDues": 12,
//             "otherFees": 0,
//             "paidAmount": 0,
//             "paidAnnualFees": "False"
//         },
//         "gender": "Other",
//         "mobile": "",
//         "name": "ThirdStudent Sahoo",
//         "payments": [
//             {
//                 "amount": 2400.0,
//                 "description": "JAN Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 1,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "FEB Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 2,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "MAR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 3,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "APR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 4,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "MAY Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 5,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "JUN Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 6,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "JUL Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 7,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "AUG Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 8,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "SEP Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 9,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "OCT Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 10,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "NOV Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 11,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2400.0,
//                 "description": "DEC Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 12,
//                 "status": "Pending"
//             }
//         ],
//         "regdNo": "STU202505270003NCE",
//         "section": "A"
//     },
//     {
//         "class": "I",
//         "dob": "2004-02-19",
//         "fees": {
//             "annualFees": "5000",
//             "balanceAmount": 35900.0,
//             "busFees": "200",
//             "monthlyFees": "2000",
//             "noOfMonthlyDues": 12,
//             "otherFees": 4500,
//             "paidAmount": 0,
//             "paidAnnualFees": "False"
//         },
//         "gender": "Male",
//         "mobile": "",
//         "name": "Dibya Mahapatra",
//         "payments": [
//             {
//                 "amount": 2200.0,
//                 "description": "JAN Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 1,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "FEB Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 2,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "MAR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 3,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "APR Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 4,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "MAY Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 5,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "JUN Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 6,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "JUL Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 7,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "AUG Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 8,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "SEP Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 9,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "OCT Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 10,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "NOV Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 11,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 2200.0,
//                 "description": "DEC Monthly Tuition + Bus Fee",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 12,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 4000,
//                 "description": "Class Fee: Ganesh Puja Chanda",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 13,
//                 "status": "Pending"
//             },
//             {
//                 "amount": 500,
//                 "description": "Class Fee: Bus",
//                 "paidAmount": 0,
//                 "paymentType": "",
//                 "slNo": 14,
//                 "status": "Pending"
//             }
//         ],
//         "regdNo": "STU202505290004NCE",
//         "section": "B"
//     }
// ]

export default function AdminAcMngStdFees() {
    const [feeDataset,setFeesDataset]=useState([]);
    const [studentInformation,setStudentInformation]=useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadStdMngData = async () => {
            try {
                const studentFees = await getFeesOfStudents();
                const studentInfo=await adminGetAllStudentManagement();
                setFeesDataset(studentFees);
                setStudentInformation(studentInfo);
            } catch (err) {
                console.error("Error fetching student Fees data:", err);
                setError("Failed to load student fees Data.");
            } finally {
                setLoading(false);
            }
        };
        loadStdMngData();
    }, []);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    // If input is empty, reset everything
        if (trimmedInput === "") {
            setSelectedStudent(null);
            setShowAlert(false);
            return;
        }
        const found = studentInformation.find((student) =>
            student.id.includes(trimmedInput) ||
            student.firstName.toLowerCase().includes(trimmedInput.toLowerCase()) ||
            student.lastName.toLowerCase().includes(trimmedInput.toLowerCase()) ||
            student.rollNo === trimmedInput
        );
        if (found) {
            setSelectedStudent(found);
            setShowAlert(false);
            setFeeDetails(null);
        } else {
            setSelectedStudent(null);
            setFeeDetails(null);
            setShowAlert(true);
        }
    };
// Fees show
    const [feeDetails, setFeeDetails] = useState(null);
// Pay fees modal
        const [showPayModal, setShowPayModal] = useState(false);
        const [currentPayment, setCurrentPayment] = useState(null);
        // Trigger modal
        const handlePayNow = (payment) => {
            setCurrentPayment(payment);
            setShowPayModal(true);
        };
            // Dummy pay function
        const handlePayment = (slNo, paidAmount, paymentType) => {
            setFeeDetails((prev) => {
                const updatedPayments = prev.payments.map((payment) => {
                if (payment.slNo === slNo) {
                    const totalPaid = payment.paidAmount + paidAmount;
                    const isFull = totalPaid >= payment.amount;

                    return {
                    ...payment,
                    paidAmount: totalPaid,
                    status: isFull ? "Completed" : "Pending",
                    };
                }
                return payment;
                });

                const newPaidSum = updatedPayments.reduce((sum, p) => sum + p.paidAmount, 0);
                const newBalance = updatedPayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);

                return {
                ...prev,
                payments: updatedPayments,
                fees: {
                    ...prev.fees,
                    paidAmount: newPaidSum,
                    balanceAmount: newBalance,
                },
                };
            });

            setShowPayModal(false); // Close modal
        };
// Open print modal
        const [showPrintModal, setShowPrintModal] = useState(false);
const [printData, setPrintData] = useState(null);

const handlePrint = (payment) => {
  setPrintData({
    receiptNo: `REC-${payment.slNo}`,
    date: new Date().toLocaleDateString(),
    regdNo: studentInformation.regdNo,
    name: studentInformation.firstName,
    amountInWords: "One Thousand Rupees Only",
    amount: payment.amount,
    remark: payment.description,
    receivedBy: "Account Staff",
    authorizedBy: "Principal",
  });
  setShowPrintModal(true);
};


  return (
    <>
    <Container fluid className="p-3">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">Student Fees Form</h4>
        <Row className="mb-4 g-2 align-items-end">
          <Col md={9} xs={12}>
            <Form.Label>Search Student</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Roll No, Name, or Number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Col>
          <Col md={3} xs={12}>
            <Button className="w-100" variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Student not found
            </Alert>
           )}

        </Row>

        {selectedStudent && (
          <Card className="p-3 shadow-sm mt-4">
            <h5 className="mb-3">
              <FaUserGraduate className="me-2" /> Student Information
            </h5>
            <hr />
            <h6 className="text-muted">Basic Details</h6>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Student Roll No</Form.Label><Form.Control value={selectedStudent.id} readOnly /></Col>
              <Col md={6}><Form.Label>Student Name</Form.Label><Form.Control value={`${selectedStudent.firstName} ${selectedStudent.middleName} ${selectedStudent.lastName}`} readOnly /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Date of Birth</Form.Label><Form.Control value={selectedStudent.dateOfBirth} readOnly /></Col>
            </Row>

            <h6 className="text-muted">Academic Details</h6>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Gender</Form.Label><Form.Control value={selectedStudent.gender} readOnly /></Col>
              <Col md={6}><Form.Label>Class</Form.Label><Form.Control value={selectedStudent.admissionClass} readOnly /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Section</Form.Label><Form.Control value={selectedStudent.section} readOnly /></Col>
            </Row>

            <div className="text-end mt-3">
              <Button variant="primary"
                    onClick={() => {
                        const matched = feeDataset.find(
                            (fee) => fee.regdNo === selectedStudent.id
                        );
                        setFeeDetails(matched || null);
                    }}
              >
                <FaFileInvoice className="me-2" /> Fees Details
              </Button>
            </div>
          </Card>
        )}
        {feeDetails && (
            <Card className="p-3 shadow-sm mt-4">
                <h5 className="mb-3">Fees Details</h5>
                <Row className="mb-3">
                <Col md={6}>
                    <Form.Label>Annual Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.annualFees} readOnly />
                </Col>
                <Col md={6}>
                    <Form.Label>Monthly Tuition Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.monthlyFees} readOnly />
                </Col>
                <Col md={6}>
                    <Form.Label>Bus Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.busFees} readOnly />
                </Col>
                <Col md={6}>
                    <Form.Label>Other Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.otherFees} readOnly />
                </Col>
                </Row>

                <h5 className="mt-4">Payment Details</h5>
                <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Description</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Pending Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feeDetails.payments.map((payment, idx) => (
                        <tr key={idx}>
                        <td>{payment.slNo}</td>
                        <td>{payment.description}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.paidAmount}</td>
                        <td>{payment.amount - payment.paidAmount}</td>
                        <td>
                            <span
                            className={`badge ${
                                payment.status === "Completed"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                            >
                            {payment.status}
                            </span>
                        </td>
                        <td>
                            <Button size="sm" variant="primary" className="me-2"
                                onClick={() => handlePayNow(payment)}
                                disabled={payment.status === "Completed"}
                            >
                            Pay Now
                            </Button>
                            <Button size="sm" variant="info"
                                onClick={() => handlePrint(payment)}
                            >
                                Print
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>
            </Card>
            )}
      </Card>
    </Container>
    {/* Open Fee PayNow modal */}
    <AdminAcMngStdFeePayNowModal
        show={showPayModal}
        onHide={() => setShowPayModal(false)}
        payment={currentPayment || { amount: 0 }}
        onPay={handlePayment}
    />
        <PrintAccountDetailsStudent
            show={showPrintModal}
            onHide={() => setShowPrintModal(false)}
            data={printData}
        />
    </>
  );
}
