//1
import { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar";

import { Container, Row, Col, Form, Button, Dropdown, Badge, Nav } from 'react-bootstrap';
import { useChatStore } from "../../Store/useChatStore";
import ChatSidebar from "../Components/ChatSidebar";
import ChatContainer from "../Components/ChatContainer";
import NoChatContainer from "../Components/NoChatContainer";


function Home() {

  const { selectedUser } = useChatStore()

  return (
    <>
      {/* <div className={`chat-app ${theme}`}>
        <Row className="h-100 g-0">

          <Col md={4} lg={3} className={`sidebar ${showSidebar ? '' : 'd-none d-md-block'}`}>
            <ChatSidebar filteredContacts={filteredContacts} />
          </Col>
          <Col md={8} lg={9} className="chat-area">
            {!selectedUser ? <NoChatContainer /> : <ChatContainer messages={messages} setShowSidebar={setShowSidebar} />
            }
          </Col>
        </Row>
      </div> */}

      <Container fluid className=" p-0">
        <Row className="row g-0">
          <Col md={4} lg={3} className="">
            <ChatSidebar />
          </Col>
          <Col md={8} lg={9} className="">
            <div className="chat-content">
              {!selectedUser ?
                <NoChatContainer />
                :
                <ChatContainer />
              }
            </div>
          </Col>
        </Row>
      </Container>

      {/* <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-lg-2 col-md-3 d-none d-md-block">
            <Sidebar />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-5 border-end">
            <div className="p-3 border-bottom">
              <div className="search-bar mb-3">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search messages..."
                />
              </div>
              <div className="d-flex">
                <button className="btn btn-sm btn-primary me-2 flex-grow-1">
                  <i className="bi bi-chat-fill me-1"></i> All Chats
                </button>
                <button className="btn btn-sm btn-outline-secondary flex-grow-1">
                  <i className="bi bi-archive me-1"></i> Archived
                </button>
              </div>
            </div>

            <div className="chat-list overflow-auto" style={{ height: 'calc(100vh - 70px)' }}>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`d-flex align-items-center p-3 border-bottom hover-scale ${activeChat === chat.id ? 'bg-light' : ''}`}
                  onClick={() => setActiveChat(chat.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="avatar-wrapper me-3">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="avatar"
                    />
                    <span className={`badge-status status-${chat.status}`}></span>
                  </div>
                  <div className="flex-grow-1 min-width-0">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 text-truncate">{chat.name}</h6>
                      <small className="text-muted">{chat.time}</small>
                    </div>
                    <p className="mb-0 text-truncate text-muted" style={{ fontSize: '0.85rem' }}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="badge rounded-pill bg-primary ms-2">{chat.unread}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7 col-md-5 col-sm-7 d-flex flex-column">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="avatar-wrapper me-3">
                  <img
                    src={chats.find(chat => chat.id === activeChat)?.avatar}
                    alt={chats.find(chat => chat.id === activeChat)?.name}
                    className="avatar"
                  />
                  <span className={`badge-status status-${chats.find(chat => chat.id === activeChat)?.status}`}></span>
                </div>
                <div>
                  <h6 className="mb-0">{chats.find(chat => chat.id === activeChat)?.name}</h6>
                  <small className="text-muted">
                    {chats.find(chat => chat.id === activeChat)?.status === 'online' ? 'Online' :
                      chats.find(chat => chat.id === activeChat)?.status === 'away' ? 'Away' : 'Offline'}
                  </small>
                </div>
              </div>
              <div>
                <button className="btn btn-sm btn-light rounded-circle me-2">
                  <i className="bi bi-telephone"></i>
                </button>
                <button className="btn btn-sm btn-light rounded-circle me-2">
                  <i className="bi bi-camera-video"></i>
                </button>
                <button className="btn btn-sm btn-light rounded-circle">
                  <i className="bi bi-three-dots-vertical"></i>
                </button>
              </div>
            </div>

            <div className="chat-container">
              <div className="chat-messages d-flex flex-column">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${msg.sender === 'me' ? 'outgoing ms-auto' : 'incoming'} fade-in`}
                  >
                    <div>{msg.text}</div>
                    <div className={`message-time ${msg.sender === 'me' ? 'text-white-50 text-end' : 'text-muted'}`}>
                      {msg.time}
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input">
                <form onSubmit={handleSendMessage} className="d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-light rounded-circle me-2"
                  >
                    <i className="bi bi-emoji-smile"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light rounded-circle me-2"
                  >
                    <i className="bi bi-paperclip"></i>
                  </button>
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary rounded-circle"
                    disabled={!message.trim()}
                  >
                    <i className="bi bi-send-fill"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
export default Home