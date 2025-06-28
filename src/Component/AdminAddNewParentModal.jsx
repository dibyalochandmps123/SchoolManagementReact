import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { sendAddNewParent, adminGetAllParentManagement } from "../API/parentManagement";

export default function AdminAddNewParentModal({ show, handleClose, onSave, studentList }) {
  const [allParentsData, setAllParentsData] = useState([]);
  const [parentData, setParentData] = useState({
    parentId: "",
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profession: "",
    username: "",
    password: "",
    studentId: [],
  });

  const [searchId, setSearchId] = useState("");
  const [foundStudent, setFoundStudent] = useState(null);

  useEffect(() => {
    const fetchParents = async () => {
      if (show) {
        const allParents = await adminGetAllParentManagement();
        setAllParentsData(allParents);
        const newId = `PAR${Math.floor(100 + Math.random() * 900)}NCE`;
        setParentData((prev) => ({
          ...prev,
          parentId: newId,
          username: newId,
        }));
        setSearchId("");
        setFoundStudent(null);
      }
    };
    fetchParents();
  }, [show]);

  const checkIfStudentAttached = (studentId) => {
    for (const parent of allParentsData) {
      if (parent.children.some((child) => child.student_id === studentId)) {
        return {
          attached: true,
          parentId: parent.id,
          parentName: parent.full_name,
        };
      }
    }
    return { attached: false };
  };

  const handleSearchStudent = () => {
    const student = studentList.find((s) => s.studentId === searchId.trim());
    setFoundStudent(student || null);
  };

  const handleAddStudent = () => {
    if (!foundStudent) return;

    const result = checkIfStudentAttached(foundStudent.studentId);

    if (result.attached) {
      alert(`Student is already attached to parent ${result.parentName} (${result.parentId}).`);
      return;
    }

    if (!parentData.studentId.includes(foundStudent.studentId)) {
      setParentData((prev) => ({
        ...prev,
        studentId: [...prev.studentId, foundStudent.studentId],
      }));
    }
    setSearchId("");
    setFoundStudent(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const children = parentData.studentId.map((id) => {
      const student = studentList.find((s) => s.studentId === id);
      return {
        student_id: id,
        student_name: student ? student.name : "",
      };
    });
    const payload = {
      id: parentData.parentId,
      full_name: parentData.name,
      email: parentData.email,
      phone: parentData.phoneNumber,
      gender: parentData.gender,
      profession: parentData.profession,
      username: parentData.username,
      password: parentData.password,
      children,
    };
    try {
      await sendAddNewParent(payload);
      onSave(payload);
      handleClose();
    } catch (err) {
      console.error("Error adding new parent:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Parent</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={9}>
            <Form.Control
              placeholder="Enter Student ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button onClick={handleSearchStudent} className="w-100">
              <FaSearch /> Search
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Card className="p-3">
              <Form.Label className="fw-bold">Children Name</Form.Label>
              {parentData.studentId.length > 0 ? (
                parentData.studentId.map((id) => {
                  const stu = studentList.find((s) => s.studentId === id);
                  return (
                    <div key={id} className="mb-2 bg-light p-2 rounded border">
                      {stu?.name} ({id})
                    </div>
                  );
                })
              ) : (
                <div className="text-muted">No students added</div>
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Check Child Name</Form.Label>
              <Form.Control readOnly value={foundStudent ? foundStudent.name : ""} />
              <Button className="mt-2" onClick={handleAddStudent} disabled={!foundStudent}>
                <FaPlus /> Add Student
              </Button>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name *</Form.Label>
              <Form.Control name="name" value={parentData.name} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Parent ID</Form.Label>
              <Form.Control value={parentData.parentId} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control name="email" value={parentData.email} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone *</Form.Label>
              <Form.Control name="phoneNumber" value={parentData.phoneNumber} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Gender *</Form.Label>
              <Form.Select name="gender" value={parentData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Profession *</Form.Label>
              <Form.Control name="profession" value={parentData.profession} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        <h6 className="fw-bold mb-3">Login Credentials</h6>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Username *</Form.Label>
              <Form.Control value={parentData.username} readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Password *</Form.Label>
              <Form.Control type="password" name="password" value={parentData.password} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Parent
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
