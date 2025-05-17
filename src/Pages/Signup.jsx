import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup, ProgressBar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";
import toast from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate();
  const { signup, isSigningUp, error: signupError } = useAuthStore(); // Get signup action, loading state, and error from the store
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    // confirmPassword: "",
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    // Calculate password strength for the password field
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    // Very simple password strength calculator
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "danger";
    if (passwordStrength < 75) return "warning";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Moderate";
    return "Strong";
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required')
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters')
    if (!formData.agreeTerms) return toast.error('You must agree to the Terms of Service and Privacy Policy')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");

    const success = validateForm()

    if (success === true) signup(formData)
    //   navigate("/");

  };

  return (
    <Container className="py-5 my-md-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle mb-3" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-chat-dots-fill text-white fs-1"></i>
            </div>
            <h2 className="fw-bold">Create an account</h2>
            <p className="text-muted">Join ChatterBox and connect with others</p>
          </div>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <InputGroup className=" rounded-pill">
                    <InputGroup.Text className="bg-light border-end-">
                      <i className="bi bi-person text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      // required
                      className="border-start- ps- "
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-">
                      <i className="bi bi-envelope text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      // required
                      className="border-start- ps-"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0">
                      <i className="bi bi-lock text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      // required
                      className="border-start- border-end- ps-"
                    />
                    <Button
                      variant="light"
                      className="border border-start-"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} text-muted`}></i>
                    </Button>
                  </InputGroup>

                  {formData.password && (
                    <div className="mt-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small>Password strength:</small>
                        <small className={`text-${getPasswordStrengthColor()}`}>
                          {getPasswordStrengthText()}
                        </small>
                      </div>
                      <ProgressBar
                        now={passwordStrength}
                        variant={getPasswordStrengthColor()}
                        style={{ height: "6px" }}
                      />
                    </div>
                  )}
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-">
                      <i className="bi bi-shield-lock text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="border-start- ps-"
                    />
                  </InputGroup>
                </Form.Group> */}

                <Form.Group className="mb-4" controlId="agreeTerms">
                  <Form.Check
                    type="checkbox"
                    name="agreeTerms"
                    label={
                      <>
                        I agree to the <Link to="/terms" className="text-decoration-none">Terms of Service</Link> and <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>
                      </>
                    }
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  // required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    className="py-2"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating account...
                      </>
                    ) : "Sign Up"}
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account? <Link to="/login" className="text-decoration-none fw-medium">Log in</Link>
                </p>
              </div>

              <div className="position-relative my-4">
                <hr />
                <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                  <span className="text-muted small text-center vstack">OR SIGN UP WITH</span>
                </div>
              </div>

              <Row className="g-2">
                <Col xs={6}>
                  <Button
                    variant="outline-secondary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <i className="bi bi-google"></i>
                    <span>Google</span>
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="outline-secondary"
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <i className="bi bi-facebook"></i>
                    <span>Facebook</span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;