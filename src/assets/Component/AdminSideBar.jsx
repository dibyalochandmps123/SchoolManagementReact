import React, { useState,useEffect } from 'react';



import "../ComponentCss/AdminSideBar.css"
import schoolLogo from "../assets/school.png"
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
export default function AdminSideBar({toggleSidebar,loggedUser,activeComponent,setActiveComponent,sidebarVisible }){
    useEffect(()=>{
        const script=document.createElement("script");
        script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
    
        window.googleTranslateElementInit=()=>{
            new google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages:"en,es,fr,de,zh",
                layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE
              },
              'google_translate_element'
            );
        }
        
      })
    
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleAccountData = () => {
        setIsAccountOpen(prev => !prev);
        setActiveComponent("8")
    };
    return(
        <>
            <div className={`admin-side-bar ${sidebarVisible ? "visible" : ""}`}>
                <div className='admin-side-bar-top'>
                    <div className="admin-side-header">
                        <img src={schoolLogo} alt="" />
                        <h3>Admin Portal</h3>
                    </div>
                    <div className="admin-sidebar-close-btn" onClick={toggleSidebar}>
                        <IoClose className='i'/>
                    </div>
                </div>
                <div className="admin-pt-name">
                    <FaUserCircle className="admin-profile-circle"/>
                    <div className="admin-pt-nm-h6">
                        <h6>Admin  User</h6>
                        <span>{loggedUser}</span>
                    </div>
                </div>
                <div className="admin-side-list">
                    <li 
                        onClick={() => {setActiveComponent("1");toggleSidebar()}}
                        className={activeComponent === "1" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><AiFillDashboard /></span>
                        <span className="admin-side-list-item">Dashboard</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("2");toggleSidebar()}}
                        className={activeComponent === "2" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><PiStudentBold /></span>
                        <span className="admin-side-list-item">Student Management</span>
                    </li>
                    <li 
                        onClick={() => {setActiveComponent("3");toggleSidebar()}}
                        className={activeComponent === "3" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><SiGoogleclassroom /></span>
                        <span className="admin-side-list-item">Class Management</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("4");toggleSidebar()}}
                        className={activeComponent === "4" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><MdPeopleAlt /></span>
                        <span className="admin-side-list-item">Staff Management</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("5");toggleSidebar()}}
                        className={activeComponent === "5" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><RiParentFill /></span>
                        <span className="admin-side-list-item">Parent Management</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("6");toggleSidebar()}}
                        className={activeComponent === "6" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><MdCoPresent /></span>
                        <span className="admin-side-list-item">Attendance</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("7");toggleSidebar()}}
                        className={activeComponent === "7" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><MdInventory2 /></span>
                        <span className="admin-side-list-item">Inventory</span>
                    </li>
                    {/* Account  */}
                        <li
                            onClick={toggleAccountData}
                            className={activeComponent === "8" ? "active-li" : ""}
                        >
                            <span className="admin-side-list-icon"><MdManageAccounts /></span>
                            <span className="admin-side-list-item">Accounts</span>
                        </li>
                        <div className="admin-list-accounts" style={{ display: isAccountOpen ? 'block' : 'none' }}>
                            <p
                                onClick={() => {setActiveComponent("8a");toggleSidebar()}}
                                className={activeComponent === "8a" ? "active-li" : ""}    
                            >
                                <span><FaDotCircle /></span>&nbsp;&nbsp;Account Management
                            </p>
                            <p
                                onClick={() => {setActiveComponent("8b");toggleSidebar()}}
                                className={activeComponent === "8b" ? "active-li" : ""}
                            >
                                <span><FaDotCircle /></span>&nbsp;&nbsp;Account Report
                            </p>
                        </div>
                    <li
                        onClick={() => {setActiveComponent("9");toggleSidebar()}}
                        className={activeComponent === "9" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><IoSettings /></span>
                        <span className="admin-side-list-item">Setting</span>
                    </li>
                    <li
                        onClick={() => {setActiveComponent("10");toggleSidebar()}}
                        className={activeComponent === "10" ? "active-li" : ""}
                    >
                        <span className="admin-side-list-icon"><TbLogout /></span>
                        <span className="admin-side-list-item">Logout</span>
                    </li>
                    {/* <div id='google_translate_element'></div> */}
                </div>
            </div>
        </>
    );
}