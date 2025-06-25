import React, { useState,useEffect } from "react";
import {
  Table,
  Form,
  Button,
  InputGroup,
  Card,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import {
  FaSearch,
  FaEye,
  FaFileExport,
  FaEdit,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import * as XLSX from "xlsx";
import AddminStMngEditModal from "../../Component/AdminStMngEditModal"; // Ensure this is correctly imported
import AdminCreateClassModal from "../../Component/AdminCreateClassModal";
import {adminGetAllClassManagement,getAllSubject} from "../../API/classManagement"
// Dummy data


export default function AdminClassManagement() {
const [classData, setClassData] = useState([]);
const [getAllClassData, setGetAllClassData] = useState(null);
const [getAllTimeData, setGetAllTimeData] = useState(null);
const [error, setError] = useState(null);
const [subjectList,setSubjectList]=useState([]);
const [initialData,setInitialData]=useState([]);
useEffect(() => {
    const fetchData = async () => {
      try {
        const getClasses = await adminGetAllClassManagement();
        const getSubjectList=await getAllSubject();
        setSubjectList(getSubjectList);
        const formattedData = getClasses.map((item, index) => ({
          id: index + 1,
          class: item.standard,
          section: item.section,
          room: item.roomNumber,
          teacher: item.classTeacher,
          seats: parseInt(item.totalStudents),
          timetable: [
            ["Monday", ...(item.timeTable?.monday || [])],
            ["Tuesday", ...(item.timeTable?.tuesday || [])],
            ["Wednesday", ...(item.timeTable?.wednesday || [])],
            ["Thursday", ...(item.timeTable?.thursday || [])],
            ["Friday", ...(item.timeTable?.friday || [])],
            ["Saturday", ...(item.timeTable?.saturday || [])],
            ["Sunday", ...(item.timeTable?.sunday || [])],
          ],
        }));
        setClassData(formattedData);
        setInitialData(formattedData);
        
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);


//For edit
  
  const [selectedEditData, setSelectedEditData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClick = (item) => {
    setSelectedEditData(item);
    setShowEdit(true);
  };
  const handleUpdateEditData = (updatedItem) => {
    const updatedList = classData.map((cls) =>
      cls.id === updatedItem.id ? updatedItem : cls
    );
    setClassData(updatedList);
  };
//For create 
const [showAdd, setShowAdd] = useState(false);
const handleAddClass = (newClassData) => {
  setClassData((prev) => [...prev, newClassData]);
};

//For view
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleSearch = () => {
    const kw = search.toLowerCase();
    const filtered = initialData.filter(
      (i) =>
        i.class.toLowerCase().includes(kw) ||
        i.section.toLowerCase().includes(kw) ||
        i.room.toLowerCase().includes(kw) ||
        i.teacher.toLowerCase().includes(kw)
    );
    setClassData(filtered);
    setSelectedIds([]);
    setSelectAll(false);
  };

  const handleExport = () => {
    const rowsToExport = selectedIds.length
      ? classData.filter((r) => selectedIds.includes(r.id))
      : classData;
    const sheet = XLSX.utils.json_to_sheet(
      rowsToExport.map(({ id, timetable, ...r }) => r)
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Classes");
    XLSX.writeFile(wb, "class_data.xlsx");
  };

  const handleSelectAll = () => {
    if (selectAll) setSelectedIds([]);
    else setSelectedIds(classData.map((i) => i.id));
    setSelectAll(!selectAll);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openModal = (item) => {
    setCurrent({ ...item });
    setShowModal(true);
  };

  const handleSave = () => {
    setClassData((prev) =>
      prev.map((row) => (row.id === current.id ? current : row))
    );
    setShowModal(false);
  };

  const handleTimetableExport = () => {
    const sheet = XLSX.utils.aoa_to_sheet([
      ["Day", "Period 1", "Period 2", "Period 3", "Period 4", "Period 5", "Period 6"],
      ...current.timetable,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Timetable");
    XLSX.writeFile(wb, `Class_${current.class}_Timetable.xlsx`);
  };

  return (
    <>
      <Card className="shadow-sm p-3 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <h5 className="mb-2 mb-md-0 fw-bold">Class Management</h5>
          <Button variant="primary">
            <IoMdAdd className="me-2" onClick={() => setShowAdd(true)}/>
            Create Class
          </Button>
        </div>

        <Row className="mb-3">
          <Col md={9}>
            <InputGroup>
              <Form.Control
                placeholder="Search by class, section, room, or teacher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="primary" onClick={handleSearch}>
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} className="text-md-end mt-2 mt-md-0">
            <Button variant="outline-primary" onClick={handleExport}>
              <FaFileExport className="me-2" />
              Export
            </Button>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table bordered hover responsive className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>
                  <Form.Check
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Class</th>
                <th>Section</th>
                <th>Room</th>
                <th>Teacher</th>
                <th>Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classData.length ? (
                classData.map((cls) => (
                  <tr key={cls.id}>
                    <td>
                      <Form.Check
                        checked={selectedIds.includes(cls.id)}
                        onChange={() => toggleSelect(cls.id)}
                      />
                    </td>
                    <td>{cls.class}</td>
                    <td>{cls.section}</td>
                    <td>{cls.room}</td>
                    <td>{cls.teacher}</td>
                    <td>{cls.seats}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => openModal(cls)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          onClick={() => handleEditClick(cls)}
                        >
                          <FaEdit />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No classes found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* View Modal */}
      {current && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>View Class</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{
                display:"grid",
                width:"100%",
                gridTemplateColumns:"1fr 1fr",
                gap:"10px"
            }}>
                <p><strong>Class:</strong> {current.class}</p>
                <p><strong>Section:</strong> {current.section}</p>
                <p><strong>Teacher:</strong> {current.teacher}</p>
                <p><strong>Room No:</strong> {current.room}</p>
            </div>
            <div className="table-responsive">
              <Table bordered className="text-center">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Period 1</th>
                    <th>Period 2</th>
                    <th>Period 3</th>
                    <th>Period 4</th>
                    <th>Period 5</th>
                    <th>Period 6</th>
                  </tr>
                </thead>
                <tbody>
                  {current.timetable.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleTimetableExport}>
              Print Table
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            
          </Modal.Footer>
        </Modal>
      )}

      {/* Edit Modal Component */}
      <AddminStMngEditModal
        showEdit={showEdit}
        handleCloseEdit={() => setShowEdit(false)}
        selectedEditData={selectedEditData}
        handleUpdateEditData={handleUpdateEditData}
        subjectList={subjectList}
      />
      {/* CreateClass */}
      <AdminCreateClassModal 
        showAdd={showAdd}
        handleCloseAdd={() => setShowAdd(false)}
        handleAddClass={handleAddClass}
        subjectOptions={subjectList}
      />
    </>
  );
}
