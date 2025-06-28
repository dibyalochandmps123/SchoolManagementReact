import React, { useState,useEffect } from 'react';
import "../../layoutCss/HrSideBar.css"
import schoolLogo from "../../assets/school.png"
import { FaUserCircle } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPeopleAlt } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
import { MdCoPresent } from "react-icons/md";
import { MdInventory2 } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { IoSettings,IoClose  } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { FaDotCircle } from "react-icons/fa";
export default function HrSideBar({toggleSidebar,loggedUser,activeComponent,setActiveComponent,sidebarVisible }){
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleAccountData = () => {
        setIsAccountOpen(prev => !prev);
        setActiveComponent("8")
    };
    return(
        <>
            <div className={`hr-side-bar ${sidebarVisible ? "visible" : ""}`}>
                <div className='hr-side-bar-top'>
                    <div className="hr-side-header">
                        <img src={schoolLogo} alt="" />
                        <h3>HR Portal</h3>
                    </div>
                    <div className="hr-sidebar-close-btn" onClick={toggleSidebar}>
                        <IoClose className='i'/>
                    </div>
                </div>
                <div className="hr-pt-name">
                    <FaUserCircle className="hr-profile-circle"/>
                    <div className="hr-pt-nm-h6">
                        <h6>HR  User</h6>
                        <span>{loggedUser}</span>
                    </div>
                </div>
                <div className="hr-side-list">
                    <li 
                        onClick={() => {setActiveComponent("1");toggleSidebar()}}
                        className={activeComponent === "1" ? "active-li" : ""}
                    >
                        <span className="hr-side-list-icon"><AiFillDashboard /></span>
                        <span className="hr-side-list-item">Dashboard</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("2");toggleSidebar()}}
                        className={activeComponent === "2" ? "active-li" : ""}
                    >
                        <span className="hr-side-list-icon"><PiStudentBold /></span>
                        <span className="hr-side-list-item">Employees</span>
                    </li>
                    <li 
                        onClick={() => {setActiveComponent("3");toggleSidebar()}}
                        className={activeComponent === "3" ? "active-li" : ""}
                    >
                        <span className="hr-side-list-icon"><SiGoogleclassroom /></span>
                        <span className="hr-side-list-item">Leaves Approval</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("4");toggleSidebar()}}
                        className={activeComponent === "4" ? "active-li" : ""}
                    >
                        <span className="hr-side-list-icon"><MdPeopleAlt /></span>
                        <span className="hr-side-list-item">Attendance</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("5");toggleSidebar()}}
                        className={activeComponent === "5" ? "active-li" : ""}
                    >
                        <span className="hr-side-list-icon"><RiParentFill /></span>
                        <span className="hr-side-list-item">Logout</span>
                    </li>
                    {/* <div id='google_translate_element'></div> */}
                </div>
            </div>
        </>
    );
}