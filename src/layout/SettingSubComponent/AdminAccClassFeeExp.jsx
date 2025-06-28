import React, { useState,useEffect} from "react";
import {Container,Tabs,Tab,Form,Row,Col,Button,Table,Card,ListGroup} from "react-bootstrap";
import { FaSave,FaPlus,FaTrash, FaEdit} from "react-icons/fa";
import {getClassFeesData,sendClassFeesData,getClassSettings} from "../../API/adminSettings"
export default function AdminAccClassFeeExp(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [admissionFees, setAdmissionFees] = useState("");
    const [tuitionFees, setTuitionFees] = useState("");
    const [busFees, setBusFees] = useState("");
    const [feesList, setFeesList] = useState({});
    const [classList, setClassList] = useState([]);
    useEffect(() => {
        const fetchClassFees = async () => {
              try {
                setFeesList(await getClassFeesData());
                 const classListAllData = await getClassSettings();
                 setClassList(Object.keys(classListAllData.classes));
              } catch (err) {
                console.error("Failed to fetch settings:", err);
                setError("Failed to load registration settings.");
              } finally {
                setLoading(false);
              }
            };
          fetchClassFees();
    },[]);
    const handleSaveFee = async () => {
        if ((!selectedClass || !admissionFees || !tuitionFees || !busFees)&& selectedClass!="") {
          return alert("Please fill in all fields");
        }
        const payload = {
            admissionFees:admissionFees.toString(),
            monthlyFees:tuitionFees.toString(),
            busFees:busFees.toString(),
        };
        try {
          await sendClassFeesData(payload,selectedClass);
          setFeesList(prev => ({
            ...prev,
            [selectedClass]: payload
          }));
          setSelectedClass("");
          setAdmissionFees("");
          setTuitionFees("");
          setBusFees("");
          alert("Successiful addded");
        } catch (err) {
          console.error("Failed to save fee:", err);
          alert("Could not save fee to server.");
        }
    };
    return(
        <>
            <h5 className="fw-bold mb-4">Class Fees</h5>
            <Row className="mb-3">
              <Col md={6} className="mb-3">
                <Form.Label>Select Class</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {classList.map((cls, idx) => (
                  <option
                    key={idx}
                    action
                    value={cls}
                    active={selectedClass===cls}
                    onClick={() => setSelectedClass(cls)}
                  >
                    {cls}
                  </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Monthly Tuition Fees</Form.Label>
                <Form.Control
                  type="number"
                  value={tuitionFees}
                  onChange={(e) => setTuitionFees(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Admission Fees</Form.Label>
                <Form.Control
                  type="number"
                  value={admissionFees}
                  onChange={(e) => setAdmissionFees(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Bus Services Fees</Form.Label>
                <Form.Control
                  type="number"
                  value={busFees}
                  onChange={(e) => setBusFees(e.target.value)}
                />
              </Col>
            </Row>
            <div className="text-end mb-4">
              <Button variant="primary" onClick={handleSaveFee}>
                <FaSave className="me-2" />
                Save Fee
              </Button>
            </div>
            <h6 className="fw-bold">Class Fees List</h6>
            <div className="table-responsive">
              <Table bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Class Name</th>
                    <th>Admission Fees</th>
                    <th>Monthly Tuition Fees</th>
                    <th>Bus Services Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(feesList).map(([className, fee], index) => (
                    <tr key={index}>
                      <td>{className}</td>
                      <td>{fee.admissionFees}</td>
                      <td>{fee.monthlyFees}</td>
                      <td>{fee.busFees}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
        </>
    );
}