import React, { useState,useEffect} from "react";
import {Container,Tabs,Tab,Form,Row,Col,Button,Table,Card,ListGroup} from "react-bootstrap";
import { FaSave,FaPlus,FaTrash, FaEdit} from "react-icons/fa";
import{getClassSettings,
  sendClassExpensesFirstData,
  getClassExpensesFirstData,
  deleteClassExpense,
  deleteSectionExpense
} from "../../API/adminSettings"
export default function AdminAccClassExpenses(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classList, setClassList] = useState([]);
    const [sectionMap, setSectionMap] = useState({});
    const [classExpenseAmount, setClassExpenseAmount] = useState("");
    const [classExpenseDescription, setClassExpenseDescription] = useState("");
    const [selectedClassExpenses, setSelectedClassExpenses] = useState("");
    const [selectedClassSectionExpenses, setSelectedClassSectionExpenses] = useState("");
    const [classExpenseType, setClassExpenseType] = useState("class");
    const [classExpensesList, setClassExpensesList] = useState([]);
    const [sectionExpensesList, setSectionExpensesList] = useState([]);
      useEffect(() => {
        const fetchClassSettings = async () => {
              try {
                const classListAllData = await getClassSettings();
                const getClassExpensesData=await getClassExpensesFirstData();
                setClassExpensesList(getClassExpensesData[0]);
                setSectionExpensesList(getClassExpensesData[1]);
                setClassList(Object.keys(classListAllData.classes));
                setSectionMap(classListAllData.classes);
              } catch (err) {
                console.error("Failed to fetch settings:", err);
                setError("Failed to load registration settings.");
              } finally {
                setLoading(false);
              }
            };
            fetchClassSettings();
        }, []);
      const handleSaveClassExpense = async () => {
            // basic validation
            if (!classExpenseType) 
              return alert("Select expense type");
            if (!selectedClassExpenses) 
              return alert("Select class");
            if (!classExpenseAmount || !classExpenseDescription) 
              return alert("Fill amount & description");
            if (classExpenseType === "section" && !selectedClassSectionExpenses) 
              return alert("Select section");
            // build the payload
            const payload = {
              class: selectedClassExpenses,
              fee_type: classExpenseType === "class" ? "class_fee" : "section_fee",
              description: classExpenseDescription,
              amount: parseFloat(classExpenseAmount)
            };
            // 1️⃣ Send to backend
            try {
              await sendClassExpensesFirstData(payload);
              console.log("✅ Expense saved on server:", payload);
            } catch (err) {
              console.error("❌ Failed to save expense:", err);
              return alert("Could not save expense to server.");
            }
            // 2️⃣ Update local UI state
            if (classExpenseType === "class") {
              setClassExpensesList(prev => [
                ...prev,
                { class: selectedClassExpenses, description: classExpenseDescription, amount: parseFloat(classExpenseAmount) }
              ]);
            } else {
              setSectionExpensesList(prev => [
                ...prev,
                {
                  classSection: `${selectedClassExpenses}-${selectedClassSectionExpenses}`,
                  description: classExpenseDescription,
                  amount: parseFloat(classExpenseAmount)
                }
              ]);
            }
            // clear inputs
            setSelectedClassExpenses("");
            setSelectedClassSectionExpenses("");
            setClassExpenseAmount("");
            setClassExpenseDescription("");
            // you can keep class & section selection if you like
      };
      function buildClassDeletePayload(exp) {
        return {
          class: exp.class,
          fee_type: "class_fee",
          description: exp.description,
          amount: Number(exp.amount),
        };
      }
      function buildSectionDeletePayload(exp) {
        const [cls, sec] = exp.classSection.split("-");
        return {
          class: cls,
          section: sec,
          fee_type: "section_fee",
          description: exp.description,
          amount: Number(exp.amount),
        };
      }
      // Delete handlers
      const handleDeleteClass = async (exp, idx) => {
        if (
          !window.confirm(
            `Delete "${exp.description}" from class ${exp.class}?`
          )
        )
          return;
        const payload = buildClassDeletePayload(exp);
        try {
          await deleteClassExpense(payload);
          setClassExpensesList((prev) => prev.filter((_, i) => i !== idx));
        } catch (err) {
          console.error(err);
          alert("Could not delete class fee on server.");
        }
      };

      const handleDeleteSection = async (exp, idx) => {
        if (
          !window.confirm(
            `Delete "${exp.description}" from section ${exp.classSection}?`
          )
        )
          return;
        const payload = buildSectionDeletePayload(exp);
        try {
          await deleteSectionExpense(payload);
          setSectionExpensesList((prev) => prev.filter((_, i) => i !== idx));
        } catch (err) {
          console.error(err);
          alert("Could not delete section fee on server.");
        }
      };
    return(
        <>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Expense Type</Form.Label>
                  <Form.Select
                    value={classExpenseType}
                    onChange={e => {
                      const newType = e.target.value;
                      setClassExpenseType(newType);
                      setSelectedClassExpenses("");
                      setSelectedClassSectionExpenses("");
                      setClassExpenseAmount("");
                      setClassExpenseDescription("");
                    }}
                  >
                    <option value="class">Class</option>
                    <option value="section">Section</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Select Class</Form.Label>
                  <Form.Select
                    value={selectedClassExpenses}
                    onChange={e => setSelectedClassExpenses(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {classList.map((cls, idx) => (
                      <option key={idx} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Select Section</Form.Label>
                  <Form.Select disabled={classExpenseType !== "section"}
                    onChange={e => setSelectedClassSectionExpenses(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    {(sectionMap[selectedClassExpenses] || []).map((sec, i) => (
                      <option key={i} value={sec}>
                        {sec}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" value={classExpenseAmount}
                    onChange={e => setClassExpenseAmount(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2} value={classExpenseDescription}
                    onChange={e => setClassExpenseDescription(e.target.value)}
                  />
                </Col>
              </Row>
              <div className="text-end">
                <Button className="animated-btn"
                  onClick={handleSaveClassExpense}
                >💾 Save Expense</Button>
              </div>
            </Form>
            <Row className="mt-5">
              <Col md={6}>
                <h6>Class Expenses</h6>
                <div className="table-responsive">
                  <Table bordered hover className="responsive-table">
                    <thead className="table-light">
                      <tr>
                        <th>Class</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {/* Class Expenses Table */}
                    <tbody>
                      {classExpensesList.map((exp, i) => (
                        <tr key={i}>
                          <td>{exp.class}</td>
                          <td>{exp.description}</td>
                          <td>{exp.amount}</td>
                          <td>
                            <Button variant="danger" size="sm"
                              onClick={() => handleDeleteClass(exp, i)}
                            >Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </Table>
                </div>
              </Col>
              <Col md={6}>
                <h6>Section Expenses</h6>
                <div className="table-responsive">
                  <Table bordered hover className="responsive-table">
                    <thead className="table-light">
                      <tr>
                        <th>Class - Section</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {/* Section Expenses Table */}
                    <tbody>
                      {sectionExpensesList.map((exp, i) => (
                        <tr key={i}>
                          <td>{exp.classSection}</td>
                          <td>{exp.description}</td>
                          <td>{exp.amount}</td>
                          <td>
                            <Button variant="danger" size="sm"
                              onClick={() => handleDeleteSection(exp, i)}
                            >Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
        </>
    );
}