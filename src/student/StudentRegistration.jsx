import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentRegistration() {
  const [student, setStudent] = useState({
    sname: '',
    email: '',
    password: '',
    tenthMarks: '',
    interMarks: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/student/register', student);

      const loginRes = await axios.post(
        `http://localhost:8080/api/student/login?email=${student.email}&password=${student.password}`
      );
      const user = loginRes.data;
      localStorage.setItem('sid', user.sid);
      navigate('/application');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration or login failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center"> Student Registration</h2>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="sname" value={student.sname} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={student.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={student.password} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>10th Marks</Form.Label>
          <Form.Control type="number" name="tenthMarks" value={student.tenthMarks} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Inter Marks</Form.Label>
          <Form.Control type="number" name="interMarks" value={student.interMarks} onChange={handleChange} required />
        </Form.Group>
        <Button className="w-100" onClick={register}>Register & Apply</Button>
      </Form>
    </Container>
  );
}
 
