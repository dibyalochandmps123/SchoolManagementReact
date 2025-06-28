import React, { useState,useEffect} from "react";
import {Container,Tabs,Tab,Form,Row,Col,Button,Table,Card,ListGroup} from "react-bootstrap";
import { FaSave,FaPlus,FaTrash, FaEdit} from "react-icons/fa";
import { sendPaymentModeData,getPaymentModeData} from "../../API/adminSettings";
export default function AdminAccPmtMode(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modeName, setModeName] = useState("");
    const [description, setDescription] = useState("");
    const [modesList, setModesList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setModesList(await getPaymentModeData());
        } catch (err) {
          console.error("Failed to fetch settings:", err);
          setError("Failed to load payment modes.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
    const handleAddMode = async () => {
      if (modeName.trim() && description.trim()) {
        const payload = {
          payment_mode: modeName.trim(),
          description: description.trim(),
        };
        try {
          await sendPaymentModeData(payload);
          setModesList((prev) => [
            ...prev,
            { type: payload.payment_mode, description: payload.description },
          ]);
          setModeName("");
          setDescription("");
        } catch (error) {
          console.error("Failed to save payment mode:", error);
          alert("Could not save payment mode to server.");
        }
      }
    };
    return(
        <>
            <h5 className="fw-bold mb-4">Payment Modes Supported</h5>
            <Row className="align-items-end mb-3">
              <Col md={6} className="mb-3">
                <Form.Label>Payment Mode Name</Form.Label>
                <Form.Control
                  placeholder="Enter payment mode"
                  value={modeName}
                  onChange={(e) => setModeName(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
            <div className="text-end mb-4">
              <Button variant="primary" onClick={handleAddMode}>
                <FaPlus className="me-2" />
                Add Payment Mode
              </Button>
            </div>
            <h6 className="fw-bold">Payment Modes List</h6>
            <div className="table-responsive">
              <Table bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Payment Mode</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {modesList.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.type}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
        </>
    );
}