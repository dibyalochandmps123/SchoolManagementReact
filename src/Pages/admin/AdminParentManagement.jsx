import React, { useState,useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AdminViewParentModal from "../../Component/AdminViewParentModal";
import AdminEditParentModal from "../../Component/AdminEditParentModal";
import AdminAddNewParentModal from "../../Component/AdminAddNewParentModal"
import { FaSearch, FaEye, FaEdit, FaPlus, FaFileExport } from "react-icons/fa";
import {adminGetAllParentManagement} from "../../API/parentManagement"
import {adminGetAllStudentManagement} from "../../API/studentManagement"
import * as XLSX from "xlsx";
//Dummy Student Data
// const studentDummyData  = [
//   {
//     studentId: "STU001NCE",
//     name: "Aryan Sharma",
//     class: "Class 6A"
//   },
//   {
//     studentId: "STU002NCE",
//     name: "Priya Verma",
//     class: "Class 7B"
//   },
//   {
//     studentId: "STU003NCE",
//     name: "Rahul Mehta",
//     class: "Class 8C"
//   },
//   {
//     studentId: "STU004NCE",
//     name: "Sneha Gupta",
//     class: "Class 6B"
//   },
//   {
//     studentId: "STU005NCE",
//     name: "Amit Das",
//     class: "Class 7A"
//   }
// ];

// // Dummy Parent Data
// const dummyParentData = [
//   {
//     parentId: "PAR001NCE",
//     name: "Sunita Sharma",
//     email: "sunita.sharma@example.com",
//     phoneNumber: "9876543210",
//     gender: "Female",
//     profession: "Teacher",
//     username: "sunita.sharma",
//     password: "Sunita@123",
//     studentId: ["STU001NCE"]
//   },
//   {
//     parentId: "PAR002NCE",
//     name: "Ramesh Verma",
//     email: "ramesh.verma@example.com",
//     phoneNumber: "9123456789",
//     gender: "Male",
//     profession: "Engineer",
//     username: "ramesh.verma",
//     password: "Ramesh@456",
//     studentId: ["STU002NCE"]
//   },
//   {
//     parentId: "PAR003NCE",
//     name: "Meena Joshi",
//     email: "meena.joshi@example.com",
//     phoneNumber: "9988776655",
//     gender: "Female",
//     profession: "Doctor",
//     username: "meena.joshi",
//     password: "Meena@789",
//     studentId: ["STU003NCE"]
//   },
//   {
//     parentId: "PAR004NCE",
//     name: "Amit Kumar",
//     email: "amit.kumar@example.com",
//     phoneNumber: "9012345678",
//     gender: "Male",
//     profession: "Banker",
//     username: "amit.kumar",
//     password: "Amit@321",
//     studentId: ["STU004NCE"]
//   },
//   {
//     parentId: "PAR005NCE",
//     name: "Kavita Singh",
//     email: "kavita.singh@example.com",
//     phoneNumber: "9345678901",
//     gender: "Female",
//     profession: "Accountant",
//     username: "kavita.singh",
//     password: "Kavita@2024",
//     studentId: ["STU005NCE"]
//   }
// ];


export default function AdminParentManagement() {
  const [studentDummyData,setStudentDummyData]=useState([]);
  const [dummyParentData,setdummyParentData]=useState([]);
  const [data, setData] = useState([]);
   const fetchData = async () => {
  try {
    const getParent = await adminGetAllParentManagement();
    const formattedData = getParent.map((item, index) => ({
      parentId: item.id,
      name: item.full_name,
      email: item.email,
      phoneNumber: item.phone,
      gender: item.gender,
      profession: item.profession,
      username: item.username,
      password: item.password,
      studentId: item.children
    }));
    setData(formattedData);
    setdummyParentData(formattedData);
    const getStudentData = await adminGetAllStudentManagement();
    if (Array.isArray(getStudentData)) {
      const formattedStudentData = getStudentData.map((item) => ({
        studentId: item.id,
        name: `${item.firstName} ${item.middleName} ${item.lastName}`.trim(),
        class: item.admissionClass,
      }));
      setStudentDummyData(formattedStudentData);
    } else {
      console.error("Student data is not an array:", getStudentData);
    }
  } catch (err) {
    console.error("Failed to fetch data:", err);
  }
};

useEffect(() => {
  fetchData();
}, []);
 

  //View Model
  const [viewParent, setViewParent] = useState(null);
  const [showView, setShowView] = useState(false);
  //For edit
  const [showEdit, setShowEdit] = useState(false);
  const [editParent, setEditParent] = useState(null);
  const handleEditSave = (updatedParent) => {
    const updatedList = data.map((p) =>
      p.parentId === updatedParent.id
        ? {
            parentId: updatedParent.id,
            name: updatedParent.full_name,
            email: updatedParent.email,
            phoneNumber: updatedParent.phone,
            gender: updatedParent.gender,
            profession: updatedParent.profession,
            username: updatedParent.username,
            password: updatedParent.password,
            studentId: updatedParent.children,
          }
        : p
    );
    setData(updatedList);
  };
  // Add new Parent
  const [showAdd, setShowAdd] = useState(false);
  const handleAddSave = async (newParent) => {
    try {
      await fetchData();  // re-fetch data from backend
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };
  //For this page
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSearch = () => {      
    const keyword = search.toLowerCase();
    const filtered = dummyParentData.filter(
      (p) =>
        p.name.toLowerCase().includes(keyword) ||
        p.parentId.toLowerCase().includes(keyword) ||
        p.email.toLowerCase().includes(keyword) ||
        p.phoneNumber.toLowerCase().includes(keyword)
    );
    setData(filtered);
    setSelectAll(false);
    setSelectedIds([]);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = data.map((p) => p.parentId);
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    const toExport = selectedIds.length
      ? data.filter((p) => selectedIds.includes(p.parentId))
      : [];

    const exportData = toExport.map(
      ({ parentId, name, email, phoneNumber, gender, profession, username, password }) => ({
        ID: parentId,
        Name: name,
        Email: email,
        Phone: phoneNumber,
        Gender: gender,
        Profession: profession,
        Username: username,
        Password: password,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Parents");
    XLSX.writeFile(workbook, "parent_data.xlsx");
  };

  return (
    <>
    <Card className="p-4 shadow">
      <h4 className="fw-bold mb-4 d-flex align-items-center">
        <FaSearch className="me-2" /> Parent Details
      </h4>

      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={8} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search by Name, ID, Email or Phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Col>
        <Col md={4} sm={12} className="mt-2 mt-md-0 d-flex justify-content-md-end">
          <Button variant="primary" onClick={handleSearch}>
            <FaSearch className="me-1" /> Search
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <div className="table-responsive">
        <Table bordered hover className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Profession</th>
              {/* <th>Username</th> */}
              {/* <th>Password</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((parent) =>(
                <tr key={parent.parentId}>
                  <td>
                    <Form.Check
                      checked={selectedIds.includes(parent.parentId)}
                      onChange={() => toggleSelectOne(parent.parentId)}
                    />
                  </td>
                  <td>{parent.parentId}</td>
                  <td>{parent.name}</td>
                  <td>{parent.phoneNumber}</td>
                  <td>{parent.email}</td>
                  <td>{parent.gender}</td>
                  <td>{parent.profession}</td>
                  {/* <td>{parent.username}</td> */}
                  {/* <td>{parent.password}</td> */}
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaEye
                        onClick={() => {
                          setViewParent(parent);
                          setShowView(true);
                        }}
                      />
                    </Button>
                    <Button variant="warning" size="sm">
                      <FaEdit
                          onClick={() => {
                            setEditParent(parent);
                            setShowEdit(true);
                          }}
                      />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No matching parent found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Footer Buttons */}
      <div className="d-flex justify-content-end mt-3 gap-2">
        <OverlayTrigger
          placement="top"
          overlay={
            !selectedIds.length ? (
              <Tooltip>Select at least one row to export</Tooltip>
            ) : (
              <></>
            )
          }
        >
          <span className="d-inline-block">
            <Button
              variant="outline-success"
              onClick={handleExport}
              disabled={!selectedIds.length}
            >
              <FaFileExport className="me-1" /> Export
            </Button>
          </span>
        </OverlayTrigger>

        <Button variant="primary">
          <FaPlus className="me-1" onClick={() => setShowAdd(true)}/> Add New Parent
        </Button>
      </div>
    </Card>
    {/* For view modal */}
    <AdminViewParentModal
        show={showView}
        handleClose={() => setShowView(false)}
        parent={viewParent}
        students={studentDummyData}
    />
    {/* For edit modal */}
    <AdminEditParentModal
      show={showEdit}
      handleClose={() => setShowEdit(false)}
      parentData={editParent}
      onSave={handleEditSave}
      studentList={studentDummyData}
    />
    {/* Add new Parent */}
    <AdminAddNewParentModal
      show={showAdd}
      handleClose={() => setShowAdd(false)}
      onSave={handleAddSave}
      studentList={studentDummyData}
    />
    </>
  );
}
