import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function NotFound() {
    const navigate = useNavigate();
    return (
        <Container className="text-center py-5 my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="position-relative mb-4">
                        <h1 className="display-1 fw-bold text-primary mb-0">404</h1>
                        <div
                            className="position-absolute top-50 start-50 translate-middle w-100 text-center"
                            style={{ marginTop: "10px" }}
                        >
                            <div className="border-bottom border-2 border-primary opacity-50"></div>
                        </div>
                    </div>

                    <h2 className="mb-4">Page Not Found</h2>
                    <p className="lead text-muted mb-5">
                        The page you are looking for might have been removed, had its name changed,
                        or is temporarily unavailable.
                    </p>

                    <div className="d-grid gap-2 d-md-block">
                        <Button
                            variant="primary"
                            className="px-4 me-md-2"
                            onClick={() => navigate("/")}
                        >
                            <i className="bi bi-house-door me-2"></i>
                            Go Home
                        </Button>
                        <Button
                            variant="outline-secondary"
                            className="px-4 ms-md-2"
                            onClick={() => navigate(-1)}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Go Back
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound