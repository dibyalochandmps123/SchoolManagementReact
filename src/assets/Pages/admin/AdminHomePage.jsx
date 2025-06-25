import React, { useState, useEffect } from 'react';
import "../../PagesCSS/AdminHomePage.css";
import AdminSideBar from "../../Component/AdminSideBar.jsx";
import NavBar from "../../Component/NavBar.jsx";
import AdminDashboard from './AdminDashboard.jsx';
import AdminStudentManagement from './AdminStudentManagement';
import AdminAddSingleStudent from './AdminAddSingleStudent.jsx';
import AdminBulkStudentUpload from './AdminBulkStudentUpload.jsx';
import AdminClassManagement from './AdminClassManagement.jsx';
import AdminStaffManagement from './AdminStaffManagement.jsx';
import AdminParentManagement from './AdminParentManagement.jsx';
import AdminAttendanceManagement from './AdminAttendanceManagement.jsx'
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminAccountManagement from './AdminAccountManagement.jsx';
import AdminAccountReports from './AdminAccountReports.jsx';

export default function AdminHomePage() {
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
      case "2": return "Student management";
      case "3": return "Class management";
      case "4": return "Staff management";
      case "5": return "Parent management";
      case "6": return "Attendance";
      case "7": return "Inventory";
      case "8": case "8a": return "Account Management";
      case "8b": return "Account Report";
      case "9": return "Setting";
      case "10": return "Logout";
      case "11": return "Add Single Student";
      case "12": return "Add Bulk Student";
      default: return "Dashboard";
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "1": return <AdminDashboard />;
      case "2": return <AdminStudentManagement setActiveComponent={setActiveComponent} />;
      case "3": return <AdminClassManagement />;
      case "4": return <AdminStaffManagement />;
      case "5": return <AdminParentManagement />;
      case "6": return <AdminAttendanceManagement />;
      case "7": return <div>Inventory</div>;
      case "8": case "8a": return <AdminAccountManagement />;
      case "8b": return <AdminAccountReports />;
      case "9": return <div>Setting</div>;
      case "10": return <div>Logout</div>;
      case "11": return <AdminAddSingleStudent setActiveComponent={setActiveComponent} />;
      case "12": return <AdminBulkStudentUpload setActiveComponent={setActiveComponent} />;
      default: return <AdminDashboard />;
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
      <div className="custom-spinner-text">Loading Admin Dashboard...</div>
    </div>
    );
  }

  return (
    <div className="admin-home-page">
      
      <AdminSideBar
        loggedUser={"Administrator"}
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        sidebarVisible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <div className="admin-main-content">
        <NavBar activeLabel={setName()} toggleSidebar={toggleSidebar} />
        <div className={`admin-rendered-main ${animate ? "slide-in" : ""}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}



































// Before spinner
// import React, { useState,useEffect} from 'react';

// import "../../PagesCSS/AdminHomePage.css"
// import AdminSideBar from "../../Component/AdminSideBar.jsx";
// import NavBar from "../../Component/NavBar.jsx"
// import AdminDashboard from './AdminDashboard.jsx';
// import AdminStudentManagement from './AdminStudentManagement'; 
// import AdminAddSingleStudent from './AdminAddSingleStudent.jsx';
// import AdminBulkStudentUpload from './AdminBulkStudentUpload.jsx';
// import AdminClassManagement from './AdminClassManagement.jsx';
// import AdminStaffManagement from './AdminStaffManagement.jsx'
// import AdminParentManagement from './AdminParentManagement.jsx';


// export default function AdminHomePage(){
//     //For slidding
//         const [animate, setAnimate] = useState(false);
//         useEffect(() => {
//             setAnimate(true); // trigger animation after render
//         }, []);
//     //Other
//     const [activeComponent, setActiveComponent] = useState("1");
//     const setName=()=>{
//         switch (activeComponent) {
//             case "1":
//                 return "Dashboard";
//             case "2":
//                 return "Student management";
//             case "3":
//                 return "Class management";
//             case "4":
//                 return "Staff management";
//             case "5":
//                 return "Parent management";
//             case "6":
//                 return "Attendance";
//             case "7":
//                 return "Inventory";
//             case "8":
//                 return "Account Management";
//             case "8a":
//                 return "Account Management";
//             case "8b":
//                 return "Account Report";
//             case "9":
//                 return "Setting";
//             case "10":
//                 return "Logout";
//             case "11":
//                 return "Add Single Student";
//             case "12":
//                 return "Add Bulk Student";
//             // Add more cases as needed
//             default:
//                 return "Dashboard";
//         }
//     }
//     const renderComponent = () => {
//         switch (activeComponent) {
//             case "1":
//                 return <AdminDashboard />;
//             case "2":
//                 return <AdminStudentManagement setActiveComponent={setActiveComponent}/>;
//             case "3":
//                 return <AdminClassManagement />;
//             case "4":
//                 return <AdminStaffManagement />;
//             case "5":
//                 return <AdminParentManagement />;
//             case "6":
//                 return "attendance";
//             case "7":
//                 return "inventory";
//             case "8":
//                 return "Account Management Page";
//             case "8a":
//                 return "Account Management Page";
//             case "8b":
//                 return "Account Report Page";
//             case "9":
//                 return "setting";
//             case "10":
//                 return "logout";
//             case "11":
//                 return <AdminAddSingleStudent setActiveComponent={setActiveComponent}/>;
//             // Add more cases as needed
//             case "12":
//                 return <AdminBulkStudentUpload setActiveComponent={setActiveComponent}/>
//             default:
//                 return "dashboard";
//         }
//     };



//     const [sidebarVisible, setSidebarVisible] = useState(false);
//     const toggleSidebar = () => {
//         setSidebarVisible(prev => !prev);
//     };
//     return(
//         <>
//             <div className="admin-home-page" >
//                 <AdminSideBar 
//                     loggedUser={"Administrator"}
//                     activeComponent={activeComponent}
//                     setActiveComponent={setActiveComponent}
//                     sidebarVisible={sidebarVisible}
//                     toggleSidebar={toggleSidebar}
                    
//                 />
//                 <div className="admin-main-content">
//                     <NavBar activeLabel={setName()} toggleSidebar={toggleSidebar}/>
//                     <div className={`admin-rendered-main ${animate ? "slide-in" : ""}`}>
//                         {renderComponent()}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }