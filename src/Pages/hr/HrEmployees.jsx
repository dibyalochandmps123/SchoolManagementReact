import React, { useState } from 'react';
import * as XLSX from "xlsx";
import CryptoJS from "crypto-js";
import { Table, Button, Form, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEye, FaEdit } from 'react-icons/fa';
import { BsDownload } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import profileImg from '../../assets/school.png';
import "../../ComponentCss/HrEmployees.css";
import HrEditEmployeeModal from "../../layout/HR/HrEditEmployeeModal.jsx"
import HrAddStaffModal from "../../layout/HR/HrAddStaffModal.jsx"
const exportToExcel = (data, filename = "StaffData.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Staff Data");
  XLSX.writeFile(workbook, filename);
};
const dummyStaffData = [
  {
    id: 'STF001NCE',
    name: 'Teacher1',
    designation: 'Lead Teacher',
    department: 'Teaching',
    mobile: '7894561230',
    email: 'teacher@teach.com',
    gender: 'Male',
    dob: '2025-05-04',
    joinDate: '2021-01-03',
    qualification: 'M.Sc',
    username: 'STF001NCE',
    password: 'teacher123'
  },
  {
    id: 'STF002NCE',
    name: 'Anjali Mehra',
    designation: 'Assistant Teacher',
    department: 'Teaching',
    mobile: '9876543210',
    email: 'anjali.mehra@school.com',
    gender: 'Female',
    dob: '1992-09-12',
    joinDate: '2022-06-15',
    qualification: 'B.Ed',
    username: 'STF002NCE',
    password: 'anjali123'
  },
  {
    id: 'STF003NCE',
    name: 'Ravi Patel',
    designation: 'Accountant',
    department: 'Finance',
    mobile: '9823674512',
    email: 'ravi.patel@school.com',
    gender: 'Male',
    dob: '1988-03-22',
    joinDate: '2020-11-01',
    qualification: 'M.Com',
    username: 'STF003NCE',
    password: 'ravi2020'
  },
  {
    id: 'STF004NCE',
    name: 'Neha Sharma',
    designation: 'HR Manager',
    department: 'Human Resources',
    mobile: '9911223344',
    email: 'neha.sharma@school.com',
    gender: 'Female',
    dob: '1990-01-30',
    joinDate: '2019-08-20',
    qualification: 'MBA HR',
    username: 'STF004NCE',
    password: 'neha@hr'
  },
  {
    id: 'STF005NCE',
    name: 'Amit Das',
    designation: 'IT Support',
    department: 'IT',
    mobile: '9988776655',
    email: 'amit.das@school.com',
    gender: 'Male',
    dob: '1995-12-10',
    joinDate: '2023-01-10',
    qualification: 'B.Tech',
    username: 'STF005NCE',
    password: 'amittech'
  }
];
export default function HrEmployees() {
  const [staffData, setStaffData] = useState(dummyStaffData);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viewStaff, setViewStaff] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
  };
  const filteredData = staffData.filter((staff) =>
    Object.values(staff).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((staff) => staff.id));
    }
    setSelectAll(!selectAll);
  };
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const openViewModal = (staff) => {
    setViewStaff(staff);
    setShowModal(true);
  };
// For edit
  const [editStaff, setEditStaff] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const handleUpdateStaff = (updatedStaff) => {
    const updatedList = staffData.map((staff) =>
      staff.id === updatedStaff.id ? updatedStaff : staff
    );
    setStaffData(updatedList);
  };

// Add staff
  const handleAddStaff = (newStaff) => {
    setStaffData((prev) => [...prev, newStaff]);
  };
  const handleAddClick = () => {
    setShowAddModal(true);
  };
//Export dat
    const handleExport = () => {
      const rowsToExport = staffData.filter(staff => selectedRows.includes(staff.id));
      if (rowsToExport.length === 0) {
        alert("Please select at least one staff to export.");
        return;
      }
      const exportData = rowsToExport.map(({ id, name, designation, department, mobile, email, gender, dob, joinDate, qualification, username, password }) => ({
        "Staff ID": id,
        "Name": name,
        "Designation": designation,
        "Department": department,
        "Mobile": mobile,
        "Email": email,
        "Gender": gender,
        "Date of Birth": dob,
        "Join Date": joinDate,
        "Qualification": qualification,
        "Username": username,
        "Password": CryptoJS.SHA256(password).toString()
      }));
      exportToExcel(exportData);
    };

  return (
    <div className="container-fluid p-3">
      {/* Search Area */}
      <Row className="mb-4 align-items-stretch g-2 hr-employees-search-bar">
        <Col xs={12} md={6}>
          <InputGroup className="shadow-sm">
            <InputGroup.Text className="bg-white">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search for staff..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="shadow-none"
            />
          </InputGroup>
        </Col>
        <Col xs={6} md={3}>
          <Button variant="primary" className="w-100 shadow-sm" onClick={handleSearch}>
            <FaSearch className="me-1" />
            Search
          </Button>
        </Col>
        <Col xs={6} md={3}>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="outline-primary" className="w-50 shadow-sm"
              onClick={handleExport}
              disabled={selectedRows.length === 0?true:false}
            >
              <BsDownload className="me-1" />
              Export
            </Button>
            <Button variant="primary" className="w-50 shadow-sm"
              onClick={handleAddClick}
            >
              <IoMdAdd className="me-1" />
              Add Staff
            </Button>
          </div>
        </Col>
      </Row>

      {/* Staff Table */}
      <h5 className="mb-3"><i className="bi bi-people-fill"></i> Staff List</h5>
      <div className="table-responsive">
        <Table bordered className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th><Form.Check type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((staff, idx) => (
              <tr key={idx}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedRows.includes(staff.id)}
                    onChange={() => handleSelectRow(staff.id)}
                  />
                </td>
                <td>{staff.id}</td>
                <td><img src={profileImg} alt="Profile" className="rounded-circle" width="40" height="40" /></td>
                <td>{staff.name}</td>
                <td>{staff.designation}</td>
                <td>{staff.mobile}</td>
                <td>{staff.email}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openViewModal(staff)}>
                    <FaEye />
                  </Button>
                  <Button variant="warning" size="sm" onClick={() => {
                    setEditStaff(staff);
                    setShowEditModal(true);
                  }}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="8">No staff found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* View Staff Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>View Staff Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewStaff && (
            <Form>
              <Row className="mb-3">
                <Col md={6}><Form.Label>Full Name</Form.Label><Form.Control value={viewStaff.name} readOnly /></Col>
                <Col md={6}><Form.Label>Staff ID</Form.Label><Form.Control value={viewStaff.id} readOnly /></Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><Form.Label>Email</Form.Label><Form.Control value={viewStaff.email} readOnly /></Col>
                <Col md={6}><Form.Label>Phone</Form.Label><Form.Control value={viewStaff.mobile} readOnly /></Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><Form.Label>Gender</Form.Label><Form.Control value={viewStaff.gender || ''} readOnly /></Col>
                <Col md={6}><Form.Label>Date of Birth</Form.Label><Form.Control value={viewStaff.dob || ''} readOnly /></Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><Form.Label>Join Date</Form.Label><Form.Control value={viewStaff.joinDate || ''} readOnly /></Col>
                <Col md={6}><Form.Label>Designation</Form.Label><Form.Control value={viewStaff.designation} readOnly /></Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}><Form.Label>Department</Form.Label><Form.Control value={viewStaff.department || ''} readOnly /></Col>
                <Col md={6}><Form.Label>Qualification</Form.Label><Form.Control value={viewStaff.qualification || ''} readOnly /></Col>
              </Row>
              <hr />
              <h6>Login Credentials</h6>
              <Row>
                <Col md={6}><Form.Label>Username</Form.Label><Form.Control value={viewStaff.username || ''} readOnly /></Col>
                <Col md={6}><Form.Label>Password</Form.Label><Form.Control value={viewStaff.password || ''} readOnly /></Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={() => window.print()}>Print Details</Button>
        </Modal.Footer>
      </Modal>
      {/* Edit modal */}
      <HrEditEmployeeModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        staff={editStaff}
        onUpdate={handleUpdateStaff}
      />
      <HrAddStaffModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddStaff}
        existingStaff={staffData}
      />
    </div>
  );
}
