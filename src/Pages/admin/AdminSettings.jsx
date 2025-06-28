import React, { useState,useEffect} from "react";
import {Container,Card,Tabs,Tab,Offcanvas,Button,Nav} from "react-bootstrap";
import {FaCog,FaUserCog,FaBook,FaRegAddressCard,FaUserTie,FaEnvelope,FaBars} from "react-icons/fa";
import "../../PagesCSS/AdminSettings.css"
import AdminRegistrationSettings from "../Settings/AdminRegistrationSettings";
import AdminAccountSettings from "../Settings/AdminAccountSettings"
import AdminSchoolSettings from "../Settings/AdminSchoolSettings";
import AdminClassSettings from "../Settings/AdminClassSettings";
import AdminStaffsSettings from "../Settings/AdminStaffsSettings"
import AdminAutoMessages from "../Settings/AdminAutoMessages"
function renderTabContent(tabKey) {
  switch (tabKey) {
    case "school":
      return <AdminSchoolSettings />;
    case "registration":
      return <AdminRegistrationSettings />;
    case "account":
      return <AdminAccountSettings />;
    case "class":
      return <AdminClassSettings />;
    case "staff":
      return <AdminStaffsSettings />;
    case "message":
      return <AdminAutoMessages />;
    default:
      return null;
  }
}
export default function AdminSettings(){
  const [key, setKey] = useState("school");
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggle = () => setShowSidebar(!showSidebar);
  const handleClose = () => setShowSidebar(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (mediaQuery.matches) {
        setShowSidebar(false);
      }
    };
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const tabList = [
    { key: "school", label: "School Settings", icon: <FaCog /> },
    { key: "registration", label: "Registration Settings", icon: <FaRegAddressCard /> },
    { key: "account", label: "Account Settings", icon: <FaBook /> },
    { key: "class", label: "Class Settings", icon: <FaUserTie /> },
    { key: "staff", label: "Staff Settings", icon: <FaUserCog /> },
    { key: "message", label: "Message To Fee Defaulters", icon: <FaEnvelope /> }
  ];

  return (
    <Container fluid className="my-4">
      <Card className="p-4 w-100">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Management Settings</h4>
          <div className="d-md-none">
            <Button variant="primary" onClick={handleToggle}>
              <FaBars className="me-2" />
              Items
            </Button>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="d-none d-md-block">
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 w-100"
            justify
            fill
          >
            {tabList.map((tab) => (
              <Tab key={tab.key} eventKey={tab.key} title={tab.label}>
                <div className="fade-in mt-3">
                  {renderTabContent(tab.key)}
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>

        {/* Mobile Offcanvas Menu */}
        <Offcanvas show={showSidebar} onHide={handleClose} className="custom-offcanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Settings Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {tabList.map((tab) => (
                <Nav.Link
                  key={tab.key}
                  onClick={() => {
                    setKey(tab.key);
                    handleClose();
                  }}
                  className={`rounded mb-1 ${key === tab.key ? "bg-primary text-white" : "text-dark"}`}
                >
                  {tab.icon} <span className="ms-2">{tab.label}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        {/* Mobile Tab Content */}
        <div className="d-md-none mt-3">
          {renderTabContent(key)}
        </div>
      </Card>
    </Container>
  );
}
