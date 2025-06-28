import "bootstrap/dist/css/bootstrap.min.css";
import "../../PagesCSS/AdminDashboard.css";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa6";
import { getAdminDashboardCountData } from "../../API/dashBoard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import React, { useEffect, useState } from "react";

const COLORS = ["#0088FE", "#FF69B4", "#FFD700"];

export default function AdminDashboard() {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timer); // Clean up the timer
  }, []);






  const [getAllCountData, setGetAllCountData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await getAdminDashboardCountData();
        setGetAllCountData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      }
    };
    loadDashboardData();
  }, []);

  const studentDistributionData = getAllCountData ? getAllCountData[7] : [];
  const genderData = getAllCountData
    ? [
        { name: "Male", value: getAllCountData[4] },
        { name: "Female", value: getAllCountData[5] },
        { name: "Other", value: getAllCountData[6] }
      ]
    : [];

  return (
    <>
    {/* {showContent ?  */}
    <div className="admin-dashboard">
      {/* Error message (if any) */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="row g-4">
        {getAllCountData ? (
          <>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white" style={{ backgroundColor: "#0d6efd" }}>
                <div className="card-body admin-list-card">
                  <p className="admin-list-card-ttl">TOTAL STUDENTS</p>
                  <div className="admin-list-card-main">
                    <p>{getAllCountData[0]}</p>
                    <p><PiStudentBold /></p>
                  </div>
                  <p className="admin-list-card-foot">Active Students</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white" style={{ backgroundColor: "#198754" }}>
                <div className="card-body admin-list-card">
                  <p className="admin-list-card-ttl">STAFFS</p>
                  <div className="admin-list-card-main">
                    <p>{getAllCountData[1]}</p>
                    <p><FaChalkboardTeacher /></p>
                  </div>
                  <p className="admin-list-card-foot">Staff Members</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-dark" style={{ backgroundColor: "#ffc107" }}>
                <div className="card-body admin-list-card">
                  <p className="admin-list-card-ttl">CLASSES</p>
                  <div className="admin-list-card-main">
                    <p>{getAllCountData[2]}</p>
                    <p><SiGoogleclassroom /></p>
                  </div>
                  <p className="admin-list-card-foot">Active Classes</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card text-white" style={{ backgroundColor: "#dc3545" }}>
                <div className="card-body admin-list-card">
                  <p className="admin-list-card-ttl">SUBJECTS</p>
                  <div className="admin-list-card-main">
                    <p>{getAllCountData[3]}</p>
                    <p><FaBook /></p>
                  </div>
                  <p className="admin-list-card-foot">Available Subjects</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted">Loading dashboard summary...</p>
        )}
      </div>

      {/* Dashboard Graphs */}
      <div className="row g-4 mt-4">
        {/* Bar Chart */}
        <div className="col-md-6 admin-dashboard-graph-card">
          <div className="card h-100 shadow-sm">
            <div className="card-header fw-bold">Student Distribution By Class</div>
            <div className="card-body">
              {getAllCountData ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={studentDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#0d6efd" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted">Chart Loading.....</p>
              )}
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-md-6 admin-dashboard-graph-card">
          <div className="card h-100 shadow-sm">
            <div className="card-header fw-bold">Gender Distribution</div>
            <div className="card-body" id="pie-chart">
              {getAllCountData ? (
                <>
                  {/* Custom Legend */}
                  <div className="mb-2">
                    <strong className="me-3">Legend:</strong>
                    {genderData.map((entry, index) => (
                      <span key={index} className="me-3">
                        <span
                          style={{
                            display: "inline-block",
                            width: 12,
                            height: 12,
                            backgroundColor: COLORS[index],
                            marginRight: 5,
                            borderRadius: "50%",
                          }}
                        ></span>
                        {entry.name}
                      </span>
                    ))}
                  </div>

                  {/* Pie Chart */}
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Tooltip formatter={(value) => [`${value}`, "# of students"]} />
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        labelLine={false}
                        isAnimationActive={true}
                      >
                        {genderData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index]}
                            stroke="none"
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </>
              ) : (
                <p className="text-muted">Pie chart not available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* :<p>Loading...</p>} */}
    </>
  );
}















































// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../PagesCSS/AdminDashboard.css";
// import { PiStudentBold } from "react-icons/pi";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import { SiGoogleclassroom } from "react-icons/si";
// import { FaBook } from "react-icons/fa6";
// import {getAdminDashboardCountData} from "../../API/dashBoard"

// import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer, PieChart, Pie, Cell} from "recharts";


// //Get data

// let getAllCountData=await getAdminDashboardCountData();
// // Bar chart data
// const studentDistributionData = getAllCountData[7]
// // Pie chart data
// const genderData = [
//   { name: "Male", value:getAllCountData[4]},
//   { name: "Female", value:getAllCountData[5] },
//   { name: "Other", value:getAllCountData[6]},
// ];
// const COLORS = ["#0088FE", "#FF69B4", "#FFD700"];
// export default function AdminDashboard() {
//   return (
//     <div className="admin-dashboard">
//       {/* Dashboard Cards */}
//       <div className="row g-4">
//         <div className="col-sm-6 col-lg-3">
//           <div className="card text-white" style={{ backgroundColor: "#0d6efd" }}>
//             <div className="card-body admin-list-card">
//               <p className="admin-list-card-ttl">TOTAL STUDENTS</p>
//               <div className="admin-list-card-main">
//                 <p>{getAllCountData[0]}</p>
//                 <p><PiStudentBold /></p>
//               </div>
//               <p className="admin-list-card-foot">Active Students</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-6 col-lg-3">
//           <div className="card text-white" style={{ backgroundColor: "#198754" }}>
//             <div className="card-body admin-list-card">
//               <p className="admin-list-card-ttl">STAFFS</p>
//               <div className="admin-list-card-main">
//                 <p>{getAllCountData[1]}</p>
//                 <p><FaChalkboardTeacher /></p>
//               </div>
//               <p className="admin-list-card-foot">Staff Members</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-6 col-lg-3">
//           <div className="card text-dark" style={{ backgroundColor: "#ffc107" }}>
//             <div className="card-body admin-list-card">
//               <p className="admin-list-card-ttl">CLASSES</p>
//               <div className="admin-list-card-main">
//                 <p>{getAllCountData[2]}</p>
//                 <p><SiGoogleclassroom /></p>
//               </div>
//               <p className="admin-list-card-foot">Active Classes</p>
//             </div>
//           </div>
//         </div>
//         <div className="col-sm-6 col-lg-3">
//           <div className="card text-white" style={{ backgroundColor: "#dc3545" }}>
//             <div className="card-body admin-list-card">
//               <p className="admin-list-card-ttl">SUBJECTS</p>
//               <div className="admin-list-card-main">
//                 <p>{getAllCountData[3]}</p>
//                 <p><FaBook /></p>
//               </div>
//               <p className="admin-list-card-foot">Available Subjects</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Graphs */}
//       <div className="row g-4 mt-4">
//         {/* Bar Chart */}
//         <div className="col-md-6 admin-dashboard-graph-card">
//           <div className="card h-100 shadow-sm">
//             <div className="card-header fw-bold">Student Distribution By Class</div>
//             <div className="card-body">
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={studentDistributionData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="students" fill="#0d6efd" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Pie Chart */}
//         <div className="col-md-6 admin-dashboard-graph-card">
//           <div className="card h-100 shadow-sm">
//             <div className="card-header fw-bold">Gender Distribution</div>
//             <div className="card-body" id="pie-chart">
//               {/* Custom Legend */}
//               <div className="mb-2">
//                 <strong className="me-3">Legend:</strong>
//                 {genderData.map((entry, index) => (
//                   <span key={index} className="me-3">
//                     <span
//                       style={{
//                         display: "inline-block",
//                         width: 12,
//                         height: 12,
//                         backgroundColor: COLORS[index],
//                         marginRight: 5,
//                         borderRadius: "50%",
//                       }}
//                     ></span>
//                     {entry.name}
//                   </span>
//                 ))}
//               </div>

//               {/* Pie Chart with Tooltip only */}
//               <ResponsiveContainer width="100%" height={250}>
//                 <PieChart>
//                   <Tooltip formatter={(value) => [`${value}`, "# of students"]} />
//                   <Pie
//                     data={genderData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={80}
//                     dataKey="value"
//                     labelLine={false}
//                     isAnimationActive={true}
//                   >
//                     {genderData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index]}
//                         stroke="none" // Removes border
//                       />
//                     ))}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
