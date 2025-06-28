import React, { useState, useEffect } from 'react';
import "../../PagesCSS/HrHomePage.css";
import HrSideBar from "../../layout/HR/HrSideBar.jsx";
import NavBar from "../../Component/NavBar.jsx";
import HrDashboard from './HrDashboard.jsx';
import HrEmployees from './HrEmployees.jsx';
import HrLeaves from './HrLeaves.jsx';
import AdminAttendanceManagement from "../admin/AdminAttendanceManagement.jsx"
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export default function HrHomePage() {
  const [animate, setAnimate] = useState(false);
  const [activeComponent, setActiveComponent] = useState("1");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

  // Simulate backend fetch (you can replace this with actual fetch call)
  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setLoading(false); // ✅ data is "fetched"
    }, 1500); // Simulate network delay
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const setName = () => {
    switch (activeComponent) {
      case "1": return "Dashboard";
      case "2": return "Employees";
      case "3": return "Leaves Approval";
      case "4": return "Attendance";
      case "5": return "Logout";
      default: return "Dashboard";
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "1": return <HrDashboard />;
      case "2": return <HrEmployees />;
      case "3": return <HrLeaves />;
      case "4": return <AdminAttendanceManagement />;
      case "5": return "Logout";
      default: return <HrDashboard />;
    }
  };

  if (loading) {
    // ✅ Show full-screen spinner while loading
    return (
      <div className="custom-spinner-container">
      <div className="custom-spinner">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="custom-spinner-text">Loading Hr Dashboard...</div>
    </div>
    );
  }

  return (
    <div className="hr-home-page">
      <HrSideBar
        loggedUser={"HRMS"}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div className="hr-main-content">
        <NavBar activeLabel={setName()} toggleSidebar={toggleSidebar} />
        <div className={`hr-rendered-main ${animate ? "slide-in" : ""}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}