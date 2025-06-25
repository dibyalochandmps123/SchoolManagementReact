import "../ComponentCss/NavBar.css";
import React, { useState, useEffect } from 'react';
import { IoMenu } from "react-icons/io5";

export default function NavBar({ activeLabel, toggleSidebar }) {
    // useEffect(()=>{
    //         const script=document.createElement("script");
    //         script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    //         document.body.appendChild(script);
        
    //         window.googleTranslateElementInit=()=>{
    //             new google.translate.TranslateElement(
    //               {
    //                 pageLanguage: 'en',
    //                 includedLanguages:"en,es,fr,de,zh",
    //                 layout:window.google.translate.TranslateElement.InlineLayout.SIMPLE
    //               },
    //               'google_translate_element'
    //             );
    //         }      
    // })
    return (
        <div className="nav-bar">
            <div className="nav-menu" onClick={toggleSidebar}>
                <IoMenu />   
            </div>
            <div className="nav-name-show">{activeLabel}</div>
        </div>
    );
}
