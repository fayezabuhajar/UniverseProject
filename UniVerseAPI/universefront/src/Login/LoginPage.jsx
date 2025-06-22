import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('https://localhost:5001/api/StudentAccount/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMsg('Login successful!');

        // حفظ التوكن في localStorage مثلاً
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);

        // إعادة التوجيه إلى صفحة أخرى
         window.location.href = "/HomeAfterLoginPage";

      } else {
        const errorText = await response.text();
        setErrorMsg(errorText || 'Login failed.');
      }
    } catch (err) {
      setErrorMsg('Server error. Please try again.');
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="min-vh-100 align-items-center">
        <Col md={6} className="d-none d-md-flex justify-content-center">
          <img src="https://png.pngtree.com/png-clipart/20240428/original/pngtree-the-teacher-is-explaining-on-paper-png-image_14958996.png" alt="Login" className="img-fluid w-75" />
        </Col>

        <Col md={6} className="p-4">
          <div className="login-form-box mx-auto">
            <h2 className="fw-bold mb-4">Log in as student</h2>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {successMsg && <Alert variant="success">{successMsg}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3" size="lg">
                Log in
              </Button>
            </Form>

            <p className="text-center mt-4">
              Don’t have an account? <a href="/studentregister">Sign up</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
