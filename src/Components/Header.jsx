import { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, InputGroup, Badge, Button, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../../Store/useAuthStore';

const Header = ({
  // isAuthenticated = true,
  isAuthenticated = false,
  unreadMessages = 12,
  username = "Guest",
  userAvatar = "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
}) => {
  const { logout, authUser } = useAuthStore()

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <header className="shadow-sm sticky-top border-bottom border-light-subtle">
      <Navbar
        bg="white"
        expand="lg"
        className='py-2'
      // className="shadow-sm py-2 sticky-top border-bottom"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center me-2 bg-primary rounded-circle" style={{ width: "32px", height: "32px" }}>
              <i className="bi bi-chat-dots-fill text-white fs-5"></i>
            </div>
            <span className="fw-bold text-primary">ChitChatNow</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center order-lg-2">
            {authUser ? (
              <>
                <NavDropdown
                  align="end"
                  title={
                    <div className="d-inline-flex align-items-center">
                      <div
                        className="rounded-circle bg-light overflow-hidden d-flex align-items-center justify-content-center"
                        style={{ width: "32px", height: "32px" }}
                      >
                        {userAvatar ? (
                          <img
                            src={userAvatar}
                            alt={username}
                            className="w-100 h-100 object-fit-cover"
                          />
                        ) : (
                          <i className="bi bi-person text-secondary"></i>
                        )}
                      </div>
                    </div>
                  }
                  id="user-dropdown"
                >
                  <div className="px-3 py-2 mb-1">
                    <p className="mb-0 fw-medium">{authUser.fullName}</p>
                    <small className="text-muted">Online</small>
                  </div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    <i className="bi bi-gear me-2"></i>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-none d-lg-flex align-items-center">
                <Button
                  as={Link}
                  to="/settings"
                  variant="outline-primary"
                  className="me-2"
                >
                  Settings
                </Button>
                <Button
                  as={Link}
                  to="/signup"
                  variant="primary"
                >
                  Sign Up
                </Button>
              </div>
            )}

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="ms-2 border-0"
              onClick={() => setShowOffcanvas(true)}
            >
              <i className="bi bi-list fs-4"></i>
            </Navbar.Toggle>
          </div>

          <Navbar.Offcanvas
            id="responsive-navbar-nav"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center justify-content-center me-2 bg-primary rounded-circle" style={{ width: "28px", height: "28px" }}>
                    <i className="bi bi-chat-dots-fill text-white fs-6"></i>
                  </div>
                  <span className="fw-bold text-primary">ChatterBox</span>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" onClick={() => setShowOffcanvas(false)}>
                  <i className="bi bi-house-door me-2"></i>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/discover" onClick={() => setShowOffcanvas(false)}>
                  <i className="bi bi-compass me-2"></i>
                  Discover
                </Nav.Link>
                {isAuthenticated && (
                  <>
                    <Nav.Link as={Link} to="/messages" onClick={() => setShowOffcanvas(false)}>
                      <i className="bi bi-chat me-2"></i>
                      Messages
                      {unreadMessages > 0 && (
                        <Badge bg="danger" pill className="ms-2">{unreadMessages}</Badge>
                      )}
                    </Nav.Link>
                  </>
                )}
              </Nav>

              {!isAuthenticated && (
                <div className="d-grid gap-2 d-lg-none">
                  <Button as={Link} to="/login" variant="outline-primary" onClick={() => setShowOffcanvas(false)}>
                    Login
                  </Button>
                  <Button as={Link} to="/signup" variant="primary" onClick={() => setShowOffcanvas(false)}>
                    Sign Up
                  </Button>
                </div>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;