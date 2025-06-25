// EditClassModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import {provideListOfAllActor} from "../API/totalData"
export default function AdminStMngEditModal({ showEdit, handleCloseEdit, selectedEditData, handleUpdateEditData,subjectList }){
  const [classListTeacher,setclassListTeacher]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
              try {
                const getAllActorData = await provideListOfAllActor();
                setclassListTeacher(getAllActorData[1]);
                console.log(getAllActorData[1]);
                 
              }catch (err) {
               console.error("Failed to fetch data:", err);
              }
            };
          fetchData();
    }, []);
  
  
  
  
  
  
  const [formEditData, setFormEditData] = useState({});
  const subjectEditOptions = subjectList;
  useEffect(() => {
    if (selectedEditData) setFormEditData({ ...selectedEditData });
  }, [selectedEditData]);

  const handleEditChange = (field, value) => {
    setFormEditData({ ...formEditData, [field]: value });
  };

  const handleEditTimetableChange = (dayIndex, periodIndex, value) => {
    const updatedTimetable = [...formEditData.timetable];
    updatedTimetable[dayIndex][periodIndex + 1] = value;
    setFormEditData({ ...formEditData, timetable: updatedTimetable });
  };

  const handleEditSubmit = () => {
    handleUpdateEditData(formEditData);
    handleCloseEdit();
  };
  return (
    <Modal show={showEdit} onHide={handleCloseEdit} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Class</Form.Label>
              <Form.Control
                value={formEditData.class || ""}
                onChange={(e) => handleEditChange("class", e.target.value)}
                disabled
              />
            </Col>
            <Col md={6}>
              <Form.Label>Section</Form.Label>
              <Form.Control
                value={formEditData.section || ""}
                onChange={(e) => handleEditChange("section", e.target.value)}
                disabled
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Class Teacher <span className="text-danger">*</span></Form.Label>
              {/* <Form.Control
                required
                value={formEditData.teacher || ""}
                onChange={(e) => handleEditChange("teacher", e.target.value)}
              /> */}
              <Form.Select name="className" value={formEditData.teacher} onChange={(e) => handleEditChange("teacher", e.target.value)}>
                  <option value="">Current: {formEditData.teacher}</option>
                  {classListTeacher.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Room Number <span className="text-danger">*</span></Form.Label>
              <Form.Control
                required
                value={formEditData.room || ""}
                onChange={(e) => handleEditChange("room", e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Total Seats <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                required
                value={formEditData.seats || 0}
                onChange={(e) => handleEditChange("seats", parseInt(e.target.value) || 0)}
              />
            </Col>
          </Row>

          <h5 className="mb-3">Timetable</h5>
          <div className="table-responsive">
            <Table bordered className="text-center">
              <thead className="table-light">
                <tr>
                  <th>Day</th>
                  {[...Array(6)].map((_, i) => (
                    <th key={i}>Period {i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formEditData.timetable?.map((dayRow, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{dayRow[0]}</td>
                    {dayRow.slice(1).map((subject, periodIndex) => (
                      <td key={periodIndex}>
                        <Form.Select
                          value={subject}
                          onChange={(e) => handleEditTimetableChange(dayIndex, periodIndex, e.target.value)}
                        >
                          <option>-- Select --</option>
                          {subjectEditOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>{opt}</option>
                          ))}
                        </Form.Select>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEdit}>Cancel</Button>
        <Button variant="primary" onClick={handleEditSubmit}>Update Class</Button>
      </Modal.Footer>
    </Modal>
  );
};
