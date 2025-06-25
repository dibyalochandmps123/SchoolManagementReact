import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaUserGraduate } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import "../../PagesCSS/AdminStudentManagement.css";

const initialStudents = [
  {
    regdNo: 'STU202505290004NCE',
    profile: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Vavya Prakash Mahapatra',
    class: 'I',
    section: 'B',
    rollNo: '2',
    mobile: '9876543210'
  },
  {
    regdNo: 'STU202505270003NCE',
    profile: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'ThirdStudent Sahoo',
    class: 'III',
    section: 'A',
    rollNo: '1',
    mobile: '9876543210'
  },
  {
    regdNo: 'STU202505230002NCE',
    profile: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'SecondStudent Saidarsan Sahoo',
    class: 'I',
    section: 'B',
    rollNo: '1',
    mobile: '9876543212'
  },
  {
    regdNo: 'STU202505230001NCE',
    profile: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Bedaprakash Saidarsan Sahoo',
    class: 'I',
    section: 'A',
    rollNo: '1',
    mobile: '9876543210'
  }
];

export default function AdminStudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [searchName, setSearchName] = useState('');
  const [searchClass, setSearchClass] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddBulkModal, setShowAddBulkModal] = useState(false);

  const handleSearch = () => {
    const value = searchName.toLowerCase();
    const filtered = initialStudents.filter(student => {
      const matchValue =
        searchBy === 'name' ? student.name.toLowerCase().includes(value) :
        searchBy === 'roll' ? student.rollNo.toLowerCase().includes(value) :
        searchBy === 'mobile' ? student.mobile.toLowerCase().includes(value) : false;

      const matchClass = searchClass === '' || student.class === searchClass;

      return matchValue && matchClass;
    });
    setStudents(filtered);
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSearchClass(selectedClass);
    const value = searchName.toLowerCase();
    const filtered = initialStudents.filter(student => {
      const matchValue =
        searchBy === 'name' ? student.name.toLowerCase().includes(value) :
        searchBy === 'roll' ? student.rollNo.toLowerCase().includes(value) :
        searchBy === 'mobile' ? student.mobile.toLowerCase().includes(value) : false;

      const matchClass = selectedClass === '' || student.class === selectedClass;

      return matchValue && matchClass;
    });
    setStudents(filtered);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      setSelectedIds(students.map(s => s.regdNo));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (regdNo) => {
    if (selectedIds.includes(regdNo)) {
      setSelectedIds(selectedIds.filter(id => id !== regdNo));
    } else {
      setSelectedIds([...selectedIds, regdNo]);
    }
  };

  const handleDeleteSelected = () => {
    const remaining = students.filter(student => !selectedIds.includes(student.regdNo));
    setStudents(remaining);
    setSelectedIds([]);
    setSelectAll(false);
  };

  const handleExport = () => {
    const exportData = students.map(({ profile, ...rest }) => rest);
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students.json';
    link.click();
  };

  return (
    <div className="container-fluid p-3">
      <h4 className="text-primary mb-3">
        <FiSearch /> Search Students
      </h4>

      <div className="row g-2 mb-4">
        <div className="col-12 col-sm-6 col-md-3">
          <Form.Control
            type="text"
            placeholder={`Search by ${searchBy}`}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <Form.Select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
            <option value="name">By Name</option>
            <option value="roll">By Roll No</option>
            <option value="mobile">By Mobile</option>
          </Form.Select>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <Form.Select value={searchClass} onChange={handleClassChange}>
            <option value="">All Classes</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
          </Form.Select>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <Button className="w-100" variant="primary" onClick={handleSearch}>
            🔍 Search
          </Button>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h5 className="text-primary m-0">
          <FaUserGraduate /> Student List
        </h5>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="danger" onClick={handleDeleteSelected}><BsTrash /> Delete Selected</Button>
          <Button variant="secondary" onClick={handleExport}>⬇ Export</Button>
          <Button variant="primary" onClick={() => setShowAddBulkModal(true)}>+ Add Bulk Student</Button>
          <Button variant="primary" onClick={() => setShowAddStudentModal(true)}>+ Add Student</Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th><Form.Check checked={selectAll} onChange={handleSelectAll} /></th>
              <th>Regd No</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll No</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, idx) => (
              <tr key={idx}>
                <td>
                  <Form.Check
                    checked={selectedIds.includes(stu.regdNo)}
                    onChange={() => toggleSelect(stu.regdNo)}
                  />
                </td>
                <td>{stu.regdNo}</td>
                <td>
                  <img src={stu.profile} alt="profile" width="40" height="40" className="rounded-circle" />
                </td>
                <td>{stu.name}</td>
                <td>{stu.class}</td>
                <td>{stu.section}</td>
                <td>{stu.rollNo}</td>
                <td>{stu.mobile}</td>
                <td>
                  <div className="d-flex justify-content-center gap-1">
                    <Button variant="light" size="sm"><FaEye /></Button>
                    <Button variant="light" size="sm"><FaEdit /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add Student Modal */}
      <Modal show={showAddStudentModal} onHide={() => setShowAddStudentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Form for adding a single student goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddStudentModal(false)}>Close</Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Bulk Student Modal */}
      <Modal show={showAddBulkModal} onHide={() => setShowAddBulkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Bulk Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Form or upload section for adding bulk students goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddBulkModal(false)}>Close</Button>
          <Button variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}