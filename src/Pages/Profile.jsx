// ProfileSection.jsx
import { useState, useRef } from 'react';
import { Modal, Button, Form, Container, Row, Col, Card, InputGroup, Image, Spinner } from 'react-bootstrap';
import { useAuthStore } from '../../Store/useAuthStore';


const Profile = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // Handle image selection
  const handleImageChange = async (e) => {

    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setSelectedImg(reader.result)
        await updateProfile({ profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageChange;
    input.click();
  };

  return (
    <>
      <Container className="my-5 px-4">
        <Card className="border-0 shadow-sm">
          <Card.Body className="p-0">
            {/* Cover Image */}
            <div
              className="rounded-top bg-primary bg-gradient"
              style={{ height: '160px', position: 'relative' }}
            >
              <div className='position-absolute top-0 start-50  translate-middle-x  fs-1 fw-bold text-light'>
                ChitChatNow
              </div>
            </div>

            {/* Profile Image */}
            <div className="text-center" style={{ marginTop: '-50px' }}>
              <div
                className="position-relative d-inline-block mb-3"
                onClick={() => setShowImageModal(true)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="rounded-circle border border-2 border border-white shadow overflow-hidden d-flex align-items-center justify-content-center bg-primary-subtle"
                  style={{ width: '100px', height: '100px' }}
                >
                  {authUser?.profilePic ? (
                    <Image
                      fluid
                      src={authUser.profilePic}
                      alt="Profile-img"
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <i size={90} className="text-primary bi bi-person-circle display-2 lh-1" />
                  )}
                </div>
                <div
                  className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle p-1"
                  style={{ width: '32px', height: '32px' }}
                >
                  <i color="white" className="bi bi-camera" />
                </div>
              </div>

              <p className='mb-2 text-secondary'><i className='bi bi-info-circle pe-1' />Click on the camera icon to upload your photo</p>

              {/* Profile Info */}
              <div className="px-4 pt-2 pb-4">
                <h4 className="mb-1 fw-bold">{authUser.fullName}</h4>
                <p className="text-muted mb-2">{authUser.email}</p>
              </div>
            </div>

            <div className="row g-4 px-4 pb-4">
              <div className="col-lg-8">
                <div className="profile-card border border-light-subtle p-4 mb-4">
                  <h5 className="border-bottom pb-3 mb-3">Personal Information</h5>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <p className="text-muted mb-0">Full Name</p>
                    </Col>
                    <Col sm={8}>
                      <p className="mb-0">{authUser?.fullName}</p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <p className="text-muted mb-0">Email</p>
                    </Col>
                    <Col sm={8}>
                      <p className="mb-0">{authUser?.email}</p>
                    </Col>
                  </Row>
                  {authUser?.location && (
                    <Row className="mb-3">
                      <Col sm={4}>
                        <p className="text-muted mb-0">Location</p>
                      </Col>
                      <Col sm={8}>
                        <p className="mb-0">{authUser.location}</p>
                      </Col>
                    </Row>
                  )}
                  {authUser?.createdAt && (
                    <Row>
                      <Col sm={4}>
                        <p className="text-muted mb-0">Joined</p>
                      </Col>
                      <Col sm={8}>
                        <p className="mb-0">{new Date(authUser.createdAt).toLocaleDateString()}</p>
                      </Col>
                    </Row>
                  )}
                </div>

                <div className="profile-card border border-light-subtle p-4">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <h5 className="mb-0">Status</h5>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                  </div>
                  <p className="mb-4">
                    "Designing interfaces that bring joy and simplicity to people's digital lives."
                  </p>
                  <div className="mb-2">
                    <span className="badge bg-primary me-2">UI/UX</span>
                    <span className="badge bg-secondary me-2">React</span>
                    <span className="badge bg-info me-2">Design</span>
                    <span className="badge bg-success">Frontend</span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="profile-card border border-light-subtle p-4 mb-4">
                  <h5 className="border-bottom pb-3 mb-3">Account Settings</h5>
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                      <span>Privacy Settings</span>
                      <i className="bi bi-shield-lock"></i>
                    </button>
                    <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                      <span>Notifications</span>
                      <i className="bi bi-bell"></i>
                    </button>
                    <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                      <span>Appearance</span>
                      <i className="bi bi-palette"></i>
                    </button>
                    <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                      <span>Security</span>
                      <i className="bi bi-fingerprint"></i>
                    </button>
                  </div>
                </div>

                <div className="profile-card p-4">
                  <h5 className="border-bottom pb-3 mb-3">Connected Accounts</h5>
                </div>
              </div>
            </div>

          </Card.Body>
        </Card>

        {/* Image Update Modal */}
        <Modal
          show={showImageModal}
          onHide={() => {
            setShowImageModal(false);
          }}
          centered
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div
              className="mb-3 rounded-circle overflow-hidden mx-auto d-flex align-items-center justify-content-center bg-light"
              style={{ width: '150px', height: '150px' }}
            >
              {(selectedImg || authUser?.profilePic) ? (
                <Image
                  fluid
                  src={selectedImg || authUser?.profilePic}
                  alt="Current Profile"
                  className="w-100 h-100 object-fit-cover"
                />
              ) : (
                <i className="bi bi-person-circle text-secondary display-1 lh-1" />
              )}
            </div>
            {isUpdatingProfile &&
              <div className="text-muted mb-2">{
                (selectedImg || authUser?.profilePic) ? (
                  <>
                    <Spinner size="sm" className='me-1' animation="border" />
                    'Updating profile image...'
                  </>
                ) :
                  (
                    <>
                      <Spinner size="sm" className='me-1' animation="border" />
                      'Uploading image...'
                    </>
                  )
              }
              </div>
            }
            <Button
              variant="outline-primary"
              onClick={triggerFileInput}
              className="mb-2 bg-gradient rounded-pill px-3"
              disabled={isUpdatingProfile}
            >
              <i className="bi bi-camera me-2" />
              Choose Image
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
      {/* <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-2 col-md-3 d-none d-md-block">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-md-9 col-12">
            <div className="profile-header text-center mb-5">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="profile-avatar mb-3"
              />
              <h2 className="fw-bold mb-1">Alex Morgan</h2>
              <p className="mb-0">UI/UX Designer & Developer</p>
            </div>

            <div className="container px-4 pb-5">
              <div className="row g-4">
                <div className="col-lg-8">
                  <div className="profile-card p-4 mb-4">
                    <h5 className="border-bottom pb-3 mb-3">Personal Information</h5>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <p className="text-muted mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-8">
                        <p className="mb-0">Alexander Morgan</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <p className="text-muted mb-0">Email</p>
                      </div>
                      <div className="col-sm-8">
                        <p className="mb-0">alex.morgan@example.com</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <p className="text-muted mb-0">Phone</p>
                      </div>
                      <div className="col-sm-8">
                        <p className="mb-0">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <p className="text-muted mb-0">Location</p>
                      </div>
                      <div className="col-sm-8">
                        <p className="mb-0">San Francisco, CA</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <p className="text-muted mb-0">Joined</p>
                      </div>
                      <div className="col-sm-8">
                        <p className="mb-0">March 15, 2022</p>
                      </div>
                    </div>
                  </div>

                  <div className="profile-card p-4">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                      <h5 className="mb-0">Status</h5>
                      <button className="btn btn-sm btn-outline-primary">Edit</button>
                    </div>
                    <p className="mb-4">
                      "Designing interfaces that bring joy and simplicity to people's digital lives."
                    </p>
                    <div className="mb-2">
                      <span className="badge bg-primary me-2">UI/UX</span>
                      <span className="badge bg-secondary me-2">React</span>
                      <span className="badge bg-info me-2">Design</span>
                      <span className="badge bg-success">Frontend</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="profile-card p-4 mb-4">
                    <h5 className="border-bottom pb-3 mb-3">Account Settings</h5>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                        <span>Privacy Settings</span>
                        <i className="bi bi-shield-lock"></i>
                      </button>
                      <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                        <span>Notifications</span>
                        <i className="bi bi-bell"></i>
                      </button>
                      <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                        <span>Appearance</span>
                        <i className="bi bi-palette"></i>
                      </button>
                      <button className="btn btn-outline-secondary d-flex justify-content-between align-items-center">
                        <span>Security</span>
                        <i className="bi bi-fingerprint"></i>
                      </button>
                    </div>
                  </div>

                  <div className="profile-card p-4">
                    <h5 className="border-bottom pb-3 mb-3">Connected Accounts</h5>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3 fs-4">
                        <i className="bi bi-google text-danger"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Google</h6>
                        <small className="text-muted">Connected</small>
                      </div>
                      <div className="ms-auto">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" role="switch" id="googleSwitch" checked />
                          <label className="form-check-label visually-hidden" htmlFor="googleSwitch">Google</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3 fs-4">
                        <i className="bi bi-facebook text-primary"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Facebook</h6>
                        <small className="text-muted">Not connected</small>
                      </div>
                      <div className="ms-auto">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" role="switch" id="facebookSwitch" />
                          <label className="form-check-label visually-hidden" htmlFor="facebookSwitch">Facebook</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="me-3 fs-4">
                        <i className="bi bi-github text-dark"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">GitHub</h6>
                        <small className="text-muted">Connected</small>
                      </div>
                      <div className="ms-auto">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" role="switch" id="githubSwitch" checked />
                          <label className="form-check-label visually-hidden" htmlFor="githubSwitch">GitHub</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>

  );
};

export default Profile;