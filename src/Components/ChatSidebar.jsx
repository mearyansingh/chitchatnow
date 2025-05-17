import { useEffect, useState } from 'react'
import { Badge, Button, Dropdown, Form, Image, NavDropdown, Spinner } from 'react-bootstrap'
import { useChatStore } from '../../Store/useChatStore'
import { useAuthStore } from '../../Store/useAuthStore'
import { formatDateHeader, formatTime } from '../Lib/utils'
import { Link } from 'react-router-dom'

function ChatSidebar() {

  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, isTyping } = useChatStore()
  const { onlineUsers, logout, authUser } = useAuthStore()

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredOnlineUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users

  if (isUsersLoading) return <h1>Loading...</h1>

  return (
    <>
      {/* Lovable version */}
      {/* <div className={`chat-sidebar ${showSidebar ? 'show' : ''}`}> */}
      <div className={`chat-sidebar`}>
        <div className="sidebar-header p-3">
          <h3 className="brand text-center">
            <i className="bi bi-chat-square-text-fill me-2"></i>
            ChitChaNow
          </h3>
          {/* Online user switch */}
          <div className='d-flex align-items-center gap-1'>
            <Form.Check
              type="switch"
              id="online-user-switch"
              label={`Show online users`}
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            <small className='text-secondary'>(&nbsp;{onlineUsers.length - 1} Online&nbsp;)</small>
          </div>

          <div className="user-profile d-flex align-items-center mt-3">
            <img
              src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
              alt="Your avatar"
              className="avatar me-2"
            />
            <div>
              <h6 className="mb-0">Aryan</h6>
              <small className="text-muted">Available</small>
            </div>
            <Dropdown align="end" className="ms-auto">
              <Dropdown.Toggle variant="link" className="btn-icon">
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <i className="bi bi-person me-2"></i>View Profile
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="bi bi-gear me-2"></i>Settings
                </Dropdown.Item>
                <Dropdown.Divider className='border-light-subtle' />
                <Dropdown.Item className='text-danger'>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <NavDropdown
              align="end"
              title={
                <div className="d-inline-flex align-items-center">
                  <div
                    className="rounded-circle bg-light overflow-hidden d-flex align-items-center justify-content-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {authUser ? (
                      < img
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
                        alt='logo'
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
          </div>
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0 ps-1">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input type="text" className="form-control search-box" placeholder="Search conversations" />
          </div>
        </div>
        <div className="chat-list p-2">
          {filteredOnlineUsers.map(user => (
            <div
              key={user._id}
              className={`chat-item p-2 ${selectedUser?._id === user._id ? 'active' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="d-flex align-items-center">
                <div className="position-relative me-2">
                  <Image fluid src={user?.profilePic || 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'} alt={user?.fullName} className="chat-avatar" />
                  {onlineUsers.includes(user._id) && (

                    <span className={`status-indicator ${onlineUsers.includes(user._id) ? 'status-online' : 'status-offline'}`}></span>
                  )}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="chat-name mb-0">{user.fullName}</h6>
                    {/* <small className="chat-time">{contact.time}</small> */}
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {isTyping ? (
                      <p className="preview typing">Typing<span>.</span><span>.</span><span>.</span></p>
                    ) : (
                      <p className="preview">Hey there! How's it going?</p>
                    )}

                    {/* <p className="chat-message mb-0">{formatDateHeader(user.createdAt)}</p> */}
                    {/* {contact.unread > 0 && */}
                    <span className="badge rounded-pill unread-badge">3</span>
                    {/* } */}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredOnlineUsers.length === 0 && (
            <div className='text-center'>No Online users</div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatSidebar