import React from 'react'
import { Button, Dropdown, Image } from 'react-bootstrap'
import { useChatStore } from '../../Store/useChatStore'
import { useAuthStore } from '../../Store/useAuthStore'

function ChatHeader() {

  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()



  return (
    <>
      <div className="chat-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Button
              variant='light'
              size='sm'
              className="me-2 d-md-none toggle-sidebar"
              // onClick={toggleSidebar}
              style={{ display: 'none' }}
            >
              <i className="bi bi-list"></i>
            </Button>
            <div className="position-relative">
              <Image
                fluid
                src={selectedUser.profilePic || "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"}
                alt={selectedUser.fullName}
                className="chat-avatar"
                style={{ width: '40px', height: '40px' }}
              />
              <span className="status-indicator status-online"></span>
            </div>
            <div className="ms-2">
              <h6 className="mb-0">{selectedUser.fullName}</h6>
              <small className="text-muted">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</small>
            </div>
          </div>
          <div>
            <Button
              variant="light"
              size='sm'
              onClick={() => setSelectedUser(null)}
              className="rounded-circle ms-2"
            >
              <i className="bi bi-x-lg" />
            </Button>
            <Button
              variant="light"
              size='sm'
              className=" rounded-circle ms-2"
            >
              <i className="bi bi-telephone" />
            </Button>
            <Button
              variant="light"
              size='sm'
              className="rounded-circle ms-2"
            >
              <i className="bi bi-camera-video" />
            </Button>
            <Button
              variant="light"
              size='sm'
              className="rounded-circle ms-2"
            >
              <i className="bi bi-three-dots-vertical" />
            </Button>
            <Dropdown align="end">
              <Dropdown.Toggle as={Button} size='sm' variant="light" className="btn-icon">
                <i className="bi bi-three-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className='shadow border-light-subtle'>
                <Dropdown.Item>
                  <i className="bi bi-person me-2"></i>View Profile
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="bi bi-bell me-2"></i>Mute Notifications
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="bi bi-images me-2"></i>Media, Links, and Docs
                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="bi bi-search me-2"></i>Search in Conversation
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  <i className="bi bi-trash me-2"></i>Delete Chat
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatHeader