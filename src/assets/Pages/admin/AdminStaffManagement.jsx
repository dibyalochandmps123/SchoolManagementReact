import React, { useState,useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import { FaSearch, FaEye, FaEdit, FaFileExport, FaUserTie } from "react-icons/fa";
import * as XLSX from "xlsx";
import profileIcon from "../../assets/school.png";
import AdminViewStaffModal from "../../Component/AdminViewStaffModal";
import AdminEditStaffModal from "../../Component/AdminEditStaffModal";
import AdminAddNewStaffModal from "../../Component/AdminAddNewStaffModal";
import {adminGetAllStaffManagement} from "../../API/staffManagement"
// const initialStaffData = Array.from({ length:5 }).map((_, index) => {
//   const id = (index + 1).toString().padStart(3, "0");
//   return {
//     fullName: `Staff Member ${id}`,
//     staffId: `STF${id}NCE`,
//     email: `staff${id}@example.com`,
//     phoneNumber: `9000000${id}`,
//     gender: index % 2 === 0 ? "Male" : "Female",
//     dateOfBirth: `1990-01-${(index % 28 + 1).toString().padStart(2, "0")}`,
//     joinDate: `2015-06-${(index % 28 + 1).toString().padStart(2, "0")}`,
//     designation: `Teacher Level ${index % 5 + 1}`,
//     department: index % 2 === 0 ? "Mathematics" : "Science",
//     qualification: "M.Sc., B.Ed.",
//     loginId: `staff${id}`,
//     loginPassword: `Staff@${id}`,
//     profile: profileIcon,
//   };
// });

export default function AdminStaffManagement() {
  const [initialStaffData,setInitialStaffData]=useState([]);
  const [data, setData] = useState([]);
  const [showView, setShowView] = useState(false);
  const [view, setView] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);

  useEffect(() => {
      const fetchStaffData = async () => {
        try {
          const getClasses = await adminGetAllStaffManagement();
          const formattedStaffData = getClasses.map((item, index) => ({
              fullName:item.name,
              staffId: item.id,
              email:item.email,
              phoneNumber:item.phone,
              gender:item.gender,
              dateOfBirth:item.dob,
              joinDate:item.joinDate,
              designation:item.designation,
              department:item.department,
              qualification:item.qualification,
              loginId:item.username,
              loginPassword:item.password,
              profile:item.profile,
          }));
          setData(formattedStaffData);
          setInitialStaffData(formattedStaffData);
          
        } catch (err) {
          console.error("Failed to fetch data:", err);
        }
      };
      fetchStaffData();
    }, []);







  const handleEditClick = (staff) => {
    setEdit(staff);
    setShowEdit(true);
  };
  const handleUpdate = (updatedStaff) => {
    const updatedData = data.map((staff) =>
      staff.staffId === updatedStaff.staffId ? updatedStaff : staff
    );
    setData(updatedData);
  };
  const handleAddNewStaff = (newStaff) => {
    const newData = { ...newStaff, profile: profileIcon };
    setData((prevList) => [...prevList, newData]);
  };
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSearch = () => {
    const keyword = search.toLowerCase();
    const filtered = initialStaffData.filter((staff) =>
      staff.fullName.toLowerCase().includes(keyword) ||
      staff.staffId.toLowerCase().includes(keyword) ||
      staff.designation.toLowerCase().includes(keyword) ||
      staff.phoneNumber.toLowerCase().includes(keyword) ||
      staff.email.toLowerCase().includes(keyword)
    );
    setData(filtered);
    setSelectAll(false);
    setSelectedIds([]);
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((staff) => staff.staffId));
    }
    setSelectAll(!selectAll);
  };
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleExport = () => {
    const rowsToExport = selectedIds.length
      ? data.filter((staff) => selectedIds.includes(staff.staffId))
      : data;
    const exportData = rowsToExport.map(
      ({ profile, loginPassword, ...rest }) => rest
    );
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Staff");
    XLSX.writeFile(workbook, "staff_data.xlsx");
  };

  return (
    <div className="container-fluid px-2">
      <Card className="p-3">
        <h4 className="fw-bold mb-3">
          <FaUserTie className="me-2" /> Search Staff
        </h4>

        <Row className="align-items-center mb-4">
          <Col xs={12} md={8} className="mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Search for staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-end">
            <Button className="w-100 w-md-auto" variant="primary" onClick={handleSearch}>
              <FaSearch className="me-1" /> Search
            </Button>
          </Col>
        </Row>

        <h5 className="fw-bold mb-3">
          <FaUserTie className="me-2" /> Staff List
        </h5>

        <div className="table-responsive">
          <Table hover bordered className="align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>
                  <Form.Check
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
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
              {data.length ? (
                data.map((staff) => (
                  <tr key={staff.staffId}>
                    <td>
                      <Form.Check
                        checked={selectedIds.includes(staff.staffId)}
                        onChange={() => toggleSelect(staff.staffId)}
                      />
                    </td>
                    <td>{staff.staffId}</td>
                    <td>
                      <Image
                        src={staff.profile}
                        width={40}
                        height={40}
                        roundedCircle
                        alt="profile"
                      />
                    </td>
                    <td>{staff.fullName}</td>
                    <td>{staff.designation}</td>
                    <td>{staff.phoneNumber}</td>
                    <td>{staff.email}</td>
                    <td style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center",
                        gap:"10px"
                    }}>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setView(staff);
                          setShowView(true);
                        }}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleEditClick(staff)}
                      >
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No matching staff found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div style={{
            display:"flex",
            justifyContent:"right",
            width:"100%",
            alignItems:"center",
            gap:"20px"
        }}>
          <Button variant="outline-primary"  onClick={handleExport}>
            <FaFileExport className="me-1" /> Export
          </Button>
          <Button variant="primary"  onClick={() => setShowAddNew(true)}>
            + Add Staff
          </Button>
        </div>
      </Card>

      <AdminViewStaffModal
        view={view}
        showView={showView}
        handleCloseView={() => setShowView(false)}
      />
      <AdminEditStaffModal
        showEdit={showEdit}
        handleCloseEdit={() => setShowEdit(false)}
        edit={edit}
        handleUpdate={handleUpdate}
      />
      <AdminAddNewStaffModal
        showAddNew={showAddNew}
        handleCloseAddNew={() => setShowAddNew(false)}
        handleAddNewStaff={handleAddNewStaff}
        currentCount={data.length}
      />
    </div>
  );
}
