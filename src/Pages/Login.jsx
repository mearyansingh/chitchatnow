import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();
  const { login, isLoggingIn, error: signupError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm()

    if (success === true) login(formData)
    // setError("");
    // setIsLoading(true);

    // try {
    //   // Simulating authentication API call
    //   await new Promise(resolve => setTimeout(resolve, 1000));

    //   // For demo purposes, simple validation
    //   if (formData.email === "user@example.com" && formData.password === "password") {
    //     navigate("/");
    //   } else {
    //     setError("Invalid email or password");
    //   }
    // } catch (err) {
    //   setError("An error occurred. Please try again.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <Container className="py-5 my-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle p-3 mb-3" style={{ width: '70px', height: '70px' }}>
              <i className="bi bi-chat-dots-fill text-white fs-1"></i>
            </div>
            <h2 className="fw-bold">Welcome back!</h2>
            <p className="text-muted">Log in to your ChatterBox account</p>
          </div>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0">
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
                  <div className="d-flex justify-content-between">
                    <Form.Label>Password</Form.Label>
                    <Link to="/forgot-password" className="text-decoration-none small">
                      Forgot password?
                    </Link>
                  </div>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0">
                      <i className="bi bi-lock text-muted"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
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
                </Form.Group>

                <Form.Group className="mb-4" controlId="rememberMe">
                  <Form.Check
                    type="checkbox"
                    name="rememberMe"
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    className="py-2"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : "Log In"}
                  </Button>
                </div>
              </Form>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Don't have an account? <Link to="/signup" className="text-decoration-none fw-medium">Sign up</Link>
                </p>
              </div>

              <div className="position-relative my-4">
                <hr />
                <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                  <span className="text-muted small text-center vstack">OR CONTINUE WITH</span>
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

export default Login;