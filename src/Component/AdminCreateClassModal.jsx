import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import { provideListOfAllActor} from "../API/totalData";
import {getExistingSections,sendAddNewClass} from "../API/classManagement"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// Dummy
const roomData = {
  "101": 30,
  "102": 25,
  "201": 40,
  "202": 35
};
export default function AdminCreateClassModal({
  showAdd,
  handleCloseAdd,
  handleAddClass,
  subjectOptions,
}) {
  const [classListActor, setClassListActor] = useState({});
  const [classListTeacher, setClassListTeacher] = useState([]);
  const [dynamicSectionOptions, setDynamicSectionOptions] = useState([]);
  const [existingSections,setexistingSections]=useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllActorData = await provideListOfAllActor();
        setexistingSections(await getExistingSections());
        setClassListActor(getAllActorData[0]);
        setClassListTeacher(getAllActorData[1]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    class: "",
    section: "",
    room: "",
    teacher: "",
    seats: "",
    timetable: days.map((day) => [day, "", "", "", "", "", "", ""]),
  });

  useEffect(() => {
    if (formData.class && classListActor[formData.class]) {
      setDynamicSectionOptions(classListActor[formData.class]);
    } else {
      setDynamicSectionOptions([]);
    }
  }, [formData.class, classListActor]);

  const handleTimetableChange = (dayIndex, periodIndex, value) => {
    const updatedTimetable = [...formData.timetable];
    updatedTimetable[dayIndex][periodIndex + 1] = value; // +1 because 0 index is day
    setFormData({ ...formData, timetable: updatedTimetable });
  };

  const handleSubmit = async() => {
    if (!formData.class || !formData.section || !formData.teacher || !formData.room || !formData.seats) {
      alert("Please fill all required fields");
      return;
    }
    const formattedTimetable = {};
    formData.timetable.forEach((row) => {
      const dayKey = row[0].toLowerCase();
      formattedTimetable[dayKey] = row.slice(1);
    });
    const payload = {
      standard: formData.class,
      section: formData.section,
      totalStudents: formData.seats,
      classTeacher: formData.teacher,
      roomNumber: formData.room,
      timeTable: formattedTimetable
    };
    await sendAddNewClass(payload);
    handleAddClass({ ...formData, id: Date.now() });
    setFormData({
      class: "",
      section: "",
      room: "",
      teacher: "",
      seats: "",
      timetable: days.map((day) => [day, "", "", "", "", "", "", ""]),
    });
    handleCloseAdd();
  };
  return (
    <Modal show={showAdd} onHide={handleCloseAdd} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Add New Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Class <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value, section: "" })}
                >
                  <option value="">Select Class</option>
                  {Object.keys(classListActor).map((classKey) => (
                    <option key={classKey} value={classKey}>
                      {classKey}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Section <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                >
                  <option value="">Select Section</option>
                  {dynamicSectionOptions.map((sec, idx) => {
                    const isDisabled = (existingSections[formData.class] || []).includes(sec);
                    return (
                      <option key={idx} value={sec} disabled={isDisabled}>
                        {sec} {isDisabled ? "(Already Created)" : ""}
                      </option>
                    );
                  })}

                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Class Teacher <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                >
                  <option value="">Select Class Teacher</option>
                  {classListTeacher.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Room Number <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={formData.room}
                  onChange={(e) => {
                    const selectedRoom = e.target.value;
                    const seats = roomData[selectedRoom] || '';
                    setFormData({ ...formData, room: selectedRoom, seats });
                  }}
                >
                  <option value="">Select Room</option>
                  {Object.keys(roomData).map((room) => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Total Seats <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  value={formData.seats}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <h6 className="mt-4">Timetable</h6>
          <div className="table-responsive">
            <Table bordered className="text-center">
              <thead>
                <tr>
                  <th>Day</th>
                  {[...Array(6)].map((_, idx) => (
                    <th key={idx}>Period {idx + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.timetable.map((row, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{row[0]}</td>
                    {row.slice(1).map((subject,periodIndex) => (
                      <td key={periodIndex}>
                        <Form.Select
                          value={subject}
                          onChange={(e) =>
                            handleTimetableChange(dayIndex, periodIndex, e.target.value)
                          }
                        >
                          <option value="">-- Select Subject --</option>
                          {subjectOptions.map((item,i) => (
                            <option key={i} value={item}>{item}</option>
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
        <Button variant="secondary" onClick={handleCloseAdd}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Class
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
