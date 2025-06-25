import React, { useState } from "react";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminBulkStudentUpload({setActiveComponent}) {
  const [fileName, setFileName] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);
      // You can now handle file parsing or API call here
      console.log("Uploaded file:", acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  return (
    <Container fluid className="p-4">
      <Alert variant="info">
        📘 Upload an Excel file with student data for bulk admission. You can
        also download a template to see the required format.
      </Alert>

      <Button variant="secondary" className="mb-3"
        onClick={() => {setActiveComponent("2")}}
      >
        ← Back
      </Button>

      <Row>
        <Col md={8}>
          <Card className="p-4 text-center h-100">
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #ccc",
                padding: "30px",
                cursor: "pointer",
                background: "#f9f9f9",
              }}
            >
              <input {...getInputProps()} />
              <FaCloudUploadAlt size={50} color="#007bff" />
              <p className="mt-3">
                {isDragActive
                  ? "Drop the Excel file here..."
                  : "Drag & Drop your Excel file here or click to browse"}
              </p>
              {fileName && (
                <p className="text-success">✅ Selected file: {fileName}</p>
              )}
            </div>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3 h-100">
            <h5 className="fw-bold mb-3">Instructions</h5>
            <p>Upload an Excel file with the following template</p>
            <a
              href="/templates/bulk_upload_template.xlsx"
              download
              className="text-primary"
              style={{ textDecoration: "none" }}
            >
              <FiDownload /> Download Updated Template
            </a>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
