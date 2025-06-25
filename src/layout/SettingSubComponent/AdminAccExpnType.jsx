import React, { useState,useEffect} from "react";
import {Container,Tabs,Tab,Form,Row,Col,Button,Table,Card,ListGroup} from "react-bootstrap";
import { FaSave,FaPlus,FaTrash, FaEdit} from "react-icons/fa";
import {sendExpenseTypeData,getExpenseTypeData} from "../../API/adminSettings"
export default function AdminAccExpnType(){
    const [expenseType, setExpenseType] = useState("");
    const [descriptionExpenses, setExpensesDescription] = useState("");
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        
          // 🔁 Fetch settings on component mount
    useEffect(() => {
        const fetchExpenseType = async () => {
          try {
            setExpenseTypes(await getExpenseTypeData());
          } catch (err) {
            console.error("Failed to fetch settings:", err);
            setError("Failed to load registration settings.");
          } finally {
            setLoading(false);
          }
        };
        fetchExpenseType();
    }, []);
      const handleAddExpenseType = async () => {
        if (expenseType.trim() && descriptionExpenses.trim()) {
          const payload = {
            expenseType: expenseType.trim(),
            description: descriptionExpenses.trim(),
          };
          try {
            await sendExpenseTypeData(payload); // ⬅️ Send to backend
            setExpenseTypes([
              ...expenseTypes,
              { type: payload.expenseType, description: payload.description },
            ]);
            setExpenseType("");
            setExpensesDescription("");
          } catch (error) {
            console.error("❌ Failed to save expense type:", error);
            alert("Could not save expense type to server.");
          }
        }
      };
      const [editingExpensesIndex, setEditingExpensesIndex] = useState(null);
      const handleExpensesDelete = (index) => {
        const updatedList = [...expenseTypes];
        updatedList.splice(index, 1);
        setExpenseTypes(updatedList);
      };
      const handleExpensesEdit = (index) => {
        setEditingExpensesIndex(index);
        setExpenseType(expenseTypes[index].type);
        setDescription(expenseTypes[index].description);
      };
      const handleExpensesUpdate = () => {
        if (editingExpensesIndex !== null && expenseType.trim() && descriptionExpenses.trim()) {
          const updated = [...expenseTypes];
          updated[editingExpensesIndex] = { type: expenseType.trim(), description: descriptionExpenses.trim() };
          setExpenseTypes(updated);
          setExpenseType("");
          setExpensesDescription("");
          setEditingExpensesIndex(null);
        }
      };
    return(
        <>
            <h6 className="fw-bold mb-4">Expense Types Supported</h6>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Expense Type Name</Form.Label>
                  <Form.Control
                    placeholder="Enter Expense Type"
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="Enter Description"
                    value={descriptionExpenses}
                    onChange={(e) => setExpensesDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end mt-3">
              <Button variant={editingExpensesIndex !== null ? "success" : "primary"} onClick={editingExpensesIndex !== null ? handleExpensesUpdate : handleAddExpenseType}>
                {editingExpensesIndex !== null ? (
                  <>
                    <FaSave className="me-2" /> Update
                  </>
                ) : (
                  <>
                    <FaPlus className="me-2" /> Add Expense Type
                  </>
                )}
              </Button>
            </div>
            <h6 className="fw-bold mt-5">Expense Types List</h6>
            <div className="table-responsive">
              <Table bordered hover className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Expense Type</th>
                    <th>Description</th>
                    <th style={{ width: "120px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseTypes.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>{item.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleExpensesEdit(index)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleExpensesDelete(index)}
                        >
                          <FaTrash /> 
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
        </>
    );
}