import React, { useState } from 'react';
import { Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
const dummyLeaves = [
  {
    id: 1,
    employee: 'John Doe',
    department: 'HR',
    type: 'Sick Leave',
    from: '2025-06-20',
    to: '2025-06-22',
    days: 3,
    reason: 'Fever and cold',
    status: 'Pending',
  },
  {
    id: 2,
    employee: 'Anita Sharma',
    department: 'Accounts',
    type: 'Casual Leave',
    from: '2025-06-18',
    to: '2025-06-18',
    days: 1,
    reason: 'Personal Work',
    status: 'Pending',
  },
  {
    id: 3,
    employee: 'Rakesh Singh',
    department: 'Teaching',
    type: 'Annual Leave',
    from: '2025-06-15',
    to: '2025-06-20',
    days: 6,
    reason: 'Vacation',
    status: 'Pending',
  },
];

export default function HrLeaves() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredLeaves = dummyLeaves.filter((leave) =>
    Object.values(leave).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '98%' }}>
        <Card className="shadow-sm border-0 rounded">
          <Card.Header className="bg-white border-0 d-flex flex-wrap justify-content-between align-items-center">
            <h5 className="mb-2 mb-md-0">Leave Accept/Reject</h5>
            <div className="d-flex gap-2 flex-wrap">
              <InputGroup size="sm" style={{ minWidth: '200px' }}>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search leaves..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Button variant="outline-primary" size="sm">All Departments</Button>
              <Button variant="outline-primary" size="sm">All Status</Button>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="table-responsive">
              <Table hover bordered className="mb-0 text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Id</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.length > 0 ? (
                    filteredLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.id}</td>
                        <td>{leave.employee}</td>
                        <td>{leave.department}</td>
                        <td>{leave.type}</td>
                        <td>{leave.from}</td>
                        <td>{leave.to}</td>
                        <td>{leave.days}</td>
                        <td>{leave.reason}</td>
                        <td><span className="badge bg-warning text-dark">{leave.status}</span></td>
                        <td>
                          <Button variant="success" size="sm" className="me-1">Approve</Button>
                          <Button variant="danger" size="sm">Reject</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">No results found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
