import React, { useState,useEffect} from "react";
import {Container,Tabs,Tab,Form,Row,Col,Button,Table,Card,ListGroup} from "react-bootstrap";
import "../../PagesCSS/SettingsAdminAccountSetting.css";
import { FaSave,FaPlus,FaTrash, FaEdit} from "react-icons/fa";
import AdminAccClassExpenses from "../../layout/SettingSubComponent/AdminAccClassExpenses.jsx";
import AdminAccClassFeeExp from "../../layout/SettingSubComponent/AdminAccClassFeeExp.jsx"
import AdminAccPmtMode from "../../layout/SettingSubComponent/AdminAccPmtMode.jsx"
import AdminAccExpnType from "../../layout/SettingSubComponent/AdminAccExpnType.jsx"
export default function AdminAccountSettings() {
  const [key, setKey] = useState("classExpenses");
  return (
      <Card className="p-4 shadow-sm">
        <h5 className="fw-bold mb-4">Account Settings</h5>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4 account-tabs"
        >
{/* Class Expenses******************************************************************** */}
          <Tab eventKey="classExpenses" title="Class Expenses">
            <AdminAccClassExpenses />
          </Tab>
{/* CLass Fees*************************************************************************************** */}
          <Tab eventKey="classFees" title="Class Fees">
            <AdminAccClassFeeExp/>
          </Tab>
{/* Payment Modes ****************************************************************************/}
          <Tab eventKey="paymentModes" title="Payment Modes">
            <AdminAccPmtMode />
          </Tab>
{/* Expenses Types *********************************************************************************************/}
          <Tab eventKey="expenseTypes" title="Expenses Type">
            <AdminAccExpnType />
          </Tab>
        </Tabs>
      </Card>
  );
}
