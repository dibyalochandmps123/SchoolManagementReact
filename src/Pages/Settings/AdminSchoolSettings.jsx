import React, { useState } from "react";
import {Tab,Tabs,Form,Row,Col,Button,Container,Image,Card} from "react-bootstrap";
export default function AdminSchoolSettings(){
// For this page
  const [logo, setLogo] = useState("https://cdn-icons-png.flaticon.com/512/2942/2942135.png");
// Logo change fucntion
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };
    return(
        <>
          <Card className="p-4 shadow-sm">
            <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>School Name</Form.Label>
                  <Form.Control defaultValue="Global Academy" />
                </Col>
                <Col md={6}>
                  <Form.Label>School Code</Form.Label>
                  <Form.Control defaultValue="GA-12345" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" defaultValue="123 Education Lane, Academic City, AC 54321" />
                </Col>
                <Col md={6}>
                  <Form.Label>Contact Information</Form.Label>
                  <Form.Control className="mb-2" defaultValue="+1 (555) 123-4567" />
                  <Form.Control defaultValue="info@globalacademy.edu" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Principal's Name</Form.Label>
                  <Form.Control defaultValue="Dr. Jane Smith" />
                </Col>
                <Col md={3}>
                  <Form.Label>Established Year</Form.Label>
                  <Form.Control defaultValue="1995" />
                </Col>
                <Col md={3}>
                  <Form.Label>Website</Form.Label>
                  <Form.Control defaultValue="https://www.globalacademy.edu" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>School Logo</Form.Label>
                  <div className="d-flex align-items-center">
                    <Image src={logo} roundedCircle height={60} className="me-3" />
                    <Form.Label className="upload-label text-primary mb-0">
                      <i className="bi bi-upload me-1"></i> Upload New Logo
                      <Form.Control type="file" hidden onChange={handleLogoChange} />
                    </Form.Label>
                  </div>
                </Col>
            </Row>
            <div className="text-end mt-3">
                <Button className="animated-btn">💾 Save Changes</Button>
            </div>
            </Card>
        </>
    );
}