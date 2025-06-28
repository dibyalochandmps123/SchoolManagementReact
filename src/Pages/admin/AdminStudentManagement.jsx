import { FaSearch } from "react-icons/fa";
import "../../PagesCSS/AdminStudentManagement.css";
import StudentProfileModal from "../../Component/StudentProfileModal.jsx"
import { PiStudentBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import React, { useState,useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaEye, FaEdit } from "react-icons/fa";
import * as XLSX from "xlsx"; // ✅ Added for Excel export
import StudentEditProfileModal from "../../Component/StudentEditProfileModal.jsx";
// import {sendStudentData} from "../../Data/studentData"

//Get Data
import {
  adminGetAllStudentManagement,
} from "../../API/studentManagement"
// let getAllStudentData=await adminGetAllStudentManagement();
export default function AdminStudentManagement({activeComponent,setActiveComponent}) {
  const [getAllStudentData, setGetAllStdMngData] = useState([]);
  const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const loadStdMngData = async () => {
        try {
          const dataStdMng = await adminGetAllStudentManagement();
          setGetAllStdMngData(dataStdMng);
          setStudents(dataStdMng); // ← initialize students after fetch
        } catch (err) {
          console.error("Error fetching student management data:", err);
          setError("Failed to load student data.");
        } finally {
          setLoading(false);
        }
      };
    loadStdMngData();
  }, []);









  // let allStudentData=sendStudentData();
  // const [students, setStudents] = useState(getAllStudentData);
  const [searchName, setSearchName] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
// Student profile open modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentProfileModal, setStudentProfileShowModal] = useState(false);
  const handleOpenStudentProfileModal = (student) => {
    setSelectedStudent(student);
    setStudentProfileShowModal(true);
  };
  const handleCloseStudentProfileModal = () => setStudentProfileShowModal(false);


//Student edit modal
  const [selectedEditStudent, setSelectedEditStudent] = useState(null);
  const [showStudentEditProfileModal, setStudentEditProfileShowModal] = useState(false);
  const handleOpenStudentEditProfileModal = (student) => {
    setSelectedEditStudent(student);
    setStudentEditProfileShowModal(true);
  };

  const handleCloseStudentEditProfileModal = () => setStudentEditProfileShowModal(false);

  const handleSearch = () => {
    console.log("Hello");
    
    const value = searchName;
    const filtered = getAllStudentData.filter((student) => {
      // console.log(student.firstName,student.fatherNumber);
      
      const matchValue =
        searchBy ==="name"
          ? student.firstName.includes(value)
          : searchBy === "rollNo"
          ? String(student.id).includes(value)
          : searchBy === "mobile"
          ? String(student.fatherNumber).toLowerCase().includes(value)
          : false;
      const matchClass = searchClass === "" || student.admissionClass === searchClass;

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
      setSelectedIds(students.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (rollNo) => {
    if (selectedIds.includes(rollNo)) {
      setSelectedIds(selectedIds.filter((id) => id !== rollNo));
    } else {
      setSelectedIds([...selectedIds, rollNo]);
    }
  };

  // ✅ Modified for exporting only selected students as Excel
  const handleExport = () => {
    const selectedStudents = students.filter((student) =>
      selectedIds.includes(student.id)
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
              <option value="rollNo">Search By Roll No</option>
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
                        checked={selectedIds.includes(stu.id)}
                        onChange={() => toggleSelect(stu.id)}
                      />
                    </td>
                    <td>{stu.id}</td>
                    <td>
                      <img
                        src={stu.image?stu.image : "Error"}
                        alt="profile"
                        width="40"
                        height="40"
                        className="rounded-circle"
                      />
                    </td>
                    <td>{`${stu.firstName} ${stu.middleName} ${stu.lastName}`}</td>
                    <td>{stu.admissionClass}</td>
                    <td>{stu.section}</td>
                    <td>{stu.rollNo}</td>
                    <td>{
                                (stu.fatherNumber!="")
                                ?stu.fatherNumber
                                : (stu.motherNumber!="")
                                ? stu.motherNumber
                                : (stu.guardianNumber!="")
                                ? stu.guardianNumber
                                : ""
                        }
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-1">
                        <Button variant="light" size="sm"
                            onClick={() => handleOpenStudentProfileModal(stu)}
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
                          onClick={() => handleOpenStudentEditProfileModal(stu)}
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
      
      {showStudentProfileModal && selectedStudent && (
        <StudentProfileModal
          show={showStudentProfileModal}
          onClose={handleCloseStudentProfileModal}
          student={selectedStudent}
        />
      )}
      {showStudentEditProfileModal && selectedEditStudent && (
        <StudentEditProfileModal
          show={showStudentEditProfileModal}
          onClose={handleCloseStudentEditProfileModal}
          studentAllForEdit={selectedEditStudent}
        />
      )}

    </>
  );
}
