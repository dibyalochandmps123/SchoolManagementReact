import { FaSearch } from "react-icons/fa";
import "../../PagesCSS/AdminStudentManagement.css";
import StudentProfileModal from "../../Component/StudentProfileModal.jsx"
import { PiStudentBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaEye, FaEdit } from "react-icons/fa";
import * as XLSX from "xlsx"; // ✅ Added for Excel export
import StudentEditProfileModal from "../../Component/StudentEditProfileModal.jsx";
import {sendStudentData} from "../../Data/studentData"



const initialStudents = [
  {
    regdNo: "STU202505290004NCE",
    profile: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Vavya Prakash Mahapatra",
    class: "I",
    section: "B",
    rollNo: "2",
    mobile: "9876543210",
  },
  {
    regdNo: "STU202505270003NCE",
    profile: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "ThirdStudent Sahoo",
    class: "III",
    section: "A",
    rollNo: "1",
    mobile: "9876543210",
  },
  {
    regdNo: "STU202505230002NCE",
    profile: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "SecondStudent Saidarsan Sahoo",
    class: "I",
    section: "B",
    rollNo: "1",
    mobile: "9876543212",
  },
  {
    regdNo: "STU202505230001NCE",
    profile: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Bedaprakash Saidarsan Sahoo",
    class: "I",
    section: "A",
    rollNo: "1",
    mobile: "9876543210",
  },
];

export default function AdminStudentManagement({activeComponent,setActiveComponent}) {
  const [students, setStudents] = useState(initialStudents);
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  let allStudentData=sendStudentData();
  console.log(allStudentData[0].address);
  
  
  

// Student profile open modal
  const [showStudentProfileModal, setStudentProfileShowModal] = useState(false);
  const handleOpenStudentProfileModal = () => setStudentProfileShowModal(true);
  const handleCloseStudentProfileModal = () => setStudentProfileShowModal(false);


//Student edit modal
const [showStudentEditProfileModal, setStudentEditProfileShowModal] = useState(false);
  const handleOpenStudentEditProfileModal = () => setStudentEditProfileShowModal(true);
  const handleCloseStudentEditProfileModal = () => setStudentEditProfileShowModal(false);

  const handleSearch = () => {
    const value = searchName.toLowerCase();
    const filtered = initialStudents.filter((student) => {
      const matchValue =
        searchBy === "name"
          ? student.name.toLowerCase().includes(value)
          : searchBy === "roll"
          ? String(student.regdNo).toLowerCase().includes(value.toString())
          : searchBy === "mobile"
          ? String(student.mobile).toLowerCase().includes(value)
          : false;

      const matchClass = searchClass === "" || student.class === searchClass;

      return matchValue && matchClass;
    });
    setStudents(filtered);
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setSearchClass(selectedClass);
    handleSearch();
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      setSelectedIds(students.map((s) => s.regdNo));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (regdNo) => {
    if (selectedIds.includes(regdNo)) {
      setSelectedIds(selectedIds.filter((id) => id !== regdNo));
    } else {
      setSelectedIds([...selectedIds, regdNo]);
    }
  };

  const handleDeleteSelected = () => {
    const remaining = students.filter(
      (student) => !selectedIds.includes(student.regdNo)
    );
    setStudents(remaining);
    setSelectedIds([]);
    setSelectAll(false);
  };

  // ✅ Modified for exporting only selected students as Excel
  const handleExport = () => {
    const selectedStudents = students.filter((student) =>
      selectedIds.includes(student.regdNo)
    );

    if (selectedStudents.length === 0) {
      alert("Please select at least one student to export.");
      return;
    }

    const exportData = selectedStudents.map(({ profile, ...rest }) => rest);

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "selected_students.xlsx");
  };

  return (
    <>
      <div className="admin-student-management">
        <div className="admin-st-mng-search-bar">
          <h5>
            <FaSearch />
            Search Students
          </h5>
          <div className="admin-st-mng-search-bar-filter-list">
            <select
              className="admin-st-mng-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="name">Search By Name</option>
              <option value="roll">Search By Roll No</option>
              <option value="mobile">Search By PhoneNo</option>
            </select>

            <select
              className="admin-st-mng-select"
              value={searchClass}
              onChange={handleClassChange}
            >
              <option value="">Choose class</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
            </select>
            <div className="admin-st-mng-search-bar-filter-list-search">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button onClick={handleSearch}>
                <FaSearch />
                &nbsp;&nbsp;Search
              </button>
            </div>
          </div>
        </div>

        <div className="admin-st-mng-st-list-table">
          <div className="admin-st-mng-st-list-top">
            <span>
              <PiStudentBold />
              &nbsp;&nbsp;Student List
            </span>
            <div className="admin-st-mng-st-list-top-btn">
              <button
                style={{ backgroundColor: "#dc3545" }}
                onClick={handleDeleteSelected}
              >
                <MdDelete />
                &nbsp;&nbsp;Delete Selected
              </button>
              <button
                style={{ backgroundColor: "#6e6d68b2" }}
                onClick={handleExport}
              >
                <FaFileExport />
                &nbsp;&nbsp;Export
              </button>
              <button style={{ backgroundColor: "#2196f3" }}
                onClick={() => {setActiveComponent("12")}}
              >
                <IoMdAdd />
                &nbsp;&nbsp;Add Bulk Student
              </button>
              <button style={{ backgroundColor: "#2196f3" }}
                onClick={() => {setActiveComponent("11")}}
              >
                <IoMdAdd />
                &nbsp;&nbsp;Add Student
              </button>
            </div>
          </div>

          <div className="admin-st-mng-list-table-foot ">
            <Table bordered hover responsive className="table" >
              <thead>
                <tr>
                  <th style={{borderTopLeftRadius: "5px"}}>
                    <Form.Check checked={selectAll} onChange={handleSelectAll} />
                  </th>
                  <th>Regd No</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Roll No</th>
                  <th>Mobile</th>
                  <th style={{borderTopRightRadius: "5px"}}>Actions</th>
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
                      <img
                        src={stu.profile}
                        alt="profile"
                        width="40"
                        height="40"
                        className="rounded-circle"
                      />
                    </td>
                    <td>{stu.name}</td>
                    <td>{stu.class}</td>
                    <td>{stu.section}</td>
                    <td>{stu.rollNo}</td>
                    <td>{stu.mobile}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <Button variant="light" size="sm"
                            onClick={handleOpenStudentProfileModal}
                            style={{
                              backgroundColor:"transparent",
                              border:"transparent",
                              fontSize:"20px",
                              color:"#0d6efd",
                            }}
                        >
                          <FaEye />
                        </Button>
                        <Button variant="light" size="sm"
                          onClick={handleOpenStudentEditProfileModal}
                          style={{
                              backgroundColor:"transparent",
                              border:"transparent",
                              fontSize:"20px",
                              color:"#FFC107",
                          }}
                        >
                          <FaEdit />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

        {/* Student profile Modal */}
      
      <StudentProfileModal show={showStudentProfileModal} onClose={handleCloseStudentProfileModal} />
      <StudentEditProfileModal show={showStudentEditProfileModal} onClose={handleCloseStudentEditProfileModal} />
    </>
  );
}
