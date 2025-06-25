import React, { useState,useEffect} from "react";
import {Container,Tab,Tabs,Row,Col,Form,Button,ListGroup,Card,} from "react-bootstrap";
import { FaPlus, FaBuilding, FaIdBadge } from "react-icons/fa";
import{getDepartmentData,
      sendDepartmentData,
      getDesignantionData,
      sendDesignantionData} from "../../API/adminSettings"
export default function AdminStaffsSettings() {
  const [key, setKey] = useState("departments");
  const [deptName, setDeptName] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [designationName, setDesignationName] = useState("");
  const [designationList, setDesignationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useEffect(() => {
    const fetchSettings = async () => {
      try {
          setDepartmentList(await getDepartmentData());
          setDesignationList(await getDesignantionData());
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setError("Failed to load registration settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);
  const handleAddDepartment = async () => {
    if (!deptName.trim()) return; // Prevent blank names
    const newDept = deptName.trim();
    try {
      setDepartmentList((prev) => [...prev, newDept]);
      setDeptName("");
      // Send only the newly added department to the backend
      await sendDepartmentData([newDept]);
      console.log(`✅ Department "${newDept}" added successfully.`);
    } catch (error) {
      console.error("❌ Failed to add department:", error);
      alert("Something went wrong while saving the department.");
    }
  };

  const handleAddDesignation = async () => {
    if (!designationName.trim()) return; // Prevent empty strings
    const newDesignation = designationName.trim();
    try {
      setDesignationList((prev) => [...prev, newDesignation]);
      setDesignationName("");
      // Send only the new designation to the backend
      await sendDesignantionData([newDesignation]);
      console.log(`✅ Designation "${newDesignation}" added successfully.`);
    } catch (error) {
      console.error("❌ Failed to add designation:", error);
      alert("Something went wrong while saving the designation.");
    }
  };

  return (
      <Card className="p-4 shadow-sm">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          id="admin-dept-settings-tabs"
          className="d-flex flex-md-row flex-column"
          variant="pills"
        >
          <Tab
            eventKey="departments"
            title={
              <span className="d-flex align-items-center">
                <FaBuilding className="me-2" />
                Departments
              </span>
            }
          >
            <div className="p-4">
              <h5 className="fw-bold">Department Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  placeholder="Enter department name"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mb-3" onClick={handleAddDepartment}>
                <FaPlus className="me-1" /> Add New Department
              </Button>

              <ListGroup>
                {departmentList.map((dept, idx) => (
                  <ListGroup.Item key={idx}>{dept}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Tab>

          <Tab
            eventKey="designations"
            title={
              <span className="d-flex align-items-center">
                <FaIdBadge className="me-2" />
                Designations
              </span>
            }
          >
            <div className="p-4">
              <h5 className="fw-bold">Designation Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Designation Name</Form.Label>
                <Form.Control
                  placeholder="Enter designation name"
                  value={designationName}
                  onChange={(e) => setDesignationName(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" className="mb-3" onClick={handleAddDesignation}>
                <FaPlus className="me-1" /> Add New Designation
              </Button>

              <ListGroup>
                {designationList.map((desg, idx) => (
                  <ListGroup.Item key={idx}>{desg}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Tab>
        </Tabs>
      </Card>
  );
}
