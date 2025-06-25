import React, { useState,useEffect} from "react";
import {
  Container,
  Tab,
  Tabs,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Card,
} from "react-bootstrap";
import { FaPlus, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import{getClassSettings,
      getSubjectSettings,
      sendClassSettings,
      sendSubjectSettings,
      updateClassSettings} from "../../API/adminSettings"
export default function AdminClassSettings() {
  const [key, setKey] = useState("classes");
  const [className, setClassName] = useState("");
  const [classList, setClassList] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [sectionMap, setSectionMap] = useState({}); // { I: ["A", "B"], II: ["A"] }
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    // 🔁 Fetch settings on component mount
    useEffect(() => {
      const fetchClassSubjectSettings = async () => {
        try {
          const classListAllData = await getClassSettings();
          const subjectListAllData = await getSubjectSettings();
          setClassList(Object.keys(classListAllData.classes));
          setSectionMap(classListAllData.classes);
          setSubjectList(subjectListAllData);
        } catch (err) {
          console.error("Failed to fetch settings:", err);
          setError("Failed to load registration settings.");
        } finally {
          setLoading(false);
        }
      };
      fetchClassSubjectSettings();
    }, []);
  
  
  
  const handleAddClass = async () => {
    if (className.trim()) {
      // Update local state
      setClassList([...classList, className]);
      setClassName("");
      // Prepare payload for backend
      const newClassData = {
        [className]: [] // Dynamic key with empty section array
      };
      try {
        await sendClassSettings(newClassData); // Replace with your actual function
        console.log("Class added successfully:", newClassData);
      } catch (err) {
        console.error("Failed to add class:", err);
      }
    }
  };
  const handleAddSubject = async () => {
    if (subjectName.trim()) {
      const newSubject = subjectName.trim();

      // Update local list
      setSubjectList([...subjectList, newSubject]);
      setSubjectName("");

      // Send only the newly added subject
      try {
        await sendSubjectSettings([newSubject]); // 👈 sends ["ABC"]
        console.log("Subject added successfully:", newSubject);
      } catch (err) {
        console.error("Failed to add subject:", err);
      }
    }
  };

const handleAddSection = async () => {
  if (sectionName.trim() && selectedClass) {
    const updatedSections = sectionMap[selectedClass] || [];
    if (updatedSections.includes(sectionName)) {
      alert(`Section "${sectionName}" already exists in Class "${selectedClass}"`);
      return;
    }
    const newSectionMap = {
      ...sectionMap,
      [selectedClass]: [...updatedSections, sectionName],
    };
    setSectionMap(newSectionMap);
    setSectionName("");
    try {
      await updateClassSettings(newSectionMap); // ✅ clean call
      console.log("✅ Section added and synced with backend");
    } catch (err) {
      console.error("❌ Backend update failed:", err);
      alert("Something went wrong while saving to the server.");
    }
  }
};



  return (
    <Card className="p-4 shadow-sm">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        id="admin-class-settings-tabs"
        className="d-flex flex-md-row flex-column"
        variant="pills"
      >
        <Tab
          eventKey="classes"
          title={
            <span className="d-flex align-items-center">
              <FaChalkboardTeacher className="me-2" />
              Classes
            </span>
          }
        >
          <Row className="p-4">
            <Col md={5}>
              <h5 className="fw-bold">Class Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  placeholder="Enter class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mb-3" onClick={handleAddClass}>
                <FaPlus className="me-1" /> Add New Class
              </Button>

              <ListGroup>
                {classList.map((cls, idx) => (
                  <ListGroup.Item
                    key={idx}
                    action
                    active={selectedClass === cls}
                    onClick={() => setSelectedClass(cls)}
                  >
                    {cls}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col md={7}>
              {selectedClass && (
                <>
                  <h6 className="fw-bold">Sections for Class {selectedClass}</h6>
                  <Form.Group className="mb-3 mt-3">
                    <Form.Label>Section Name</Form.Label>
                    <Form.Control
                      placeholder="Enter section name"
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="info" className="mb-3" onClick={handleAddSection}>
                    <FaPlus className="me-1" /> Add Section
                  </Button>

                  <ListGroup>
                    {(sectionMap[selectedClass] || []).map((sec, i) => (
                      <ListGroup.Item key={i}>{`Section ${sec}`}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}
            </Col>
          </Row>
        </Tab>

        <Tab
          eventKey="subjects"
          title={
            <span className="d-flex align-items-center">
              <FaBook className="me-2" />
              Subjects
            </span>
          }
        >
          <div className="p-4">
            <h5 className="fw-bold">Subject Management</h5>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                placeholder="Enter subject name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" className="mb-3" onClick={handleAddSubject}>
              <FaPlus className="me-1" /> Add New Subject
            </Button>

            <ListGroup>
              {subjectList.map((sub, idx) => (
                <ListGroup.Item key={idx}>{sub}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Tab>
      </Tabs>
    </Card>
  );
}
