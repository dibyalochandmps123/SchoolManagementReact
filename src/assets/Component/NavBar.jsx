import "../ComponentCss/NavBar.css";
import React, { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";

export default function NavBar({ activeLabel, toggleSidebar }) {
    
    return (
        <div className="nav-bar">
            <div className="nav-menu" onClick={toggleSidebar}>
                <IoMenu />   
            </div>
            <div className="nav-name-show">{activeLabel}</div>
            
        </div>
    );
}
