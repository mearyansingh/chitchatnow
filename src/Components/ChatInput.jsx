import { useRef, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useChatStore } from '../../Store/useChatStore';

function ChatInput() {

  const { messages, getMessages, isMessagesLoading, selectedUser, setTyping, sendMessage } = useChatStore();


  const [inputValue, setInputValue] = useState('');
  const [imgPreview, setImgPreview] = useState(null)
  const fileInputRef = useRef(null)

  let typingTimeout;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    // Indicate typing if there's input and a timeout isn't already running
    if (event.target.value.length > 0 && !typingTimeout) {
      setTyping(true);
    }

    // Clear any existing timeout and set a new one to stop typing after a delay
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 2000); // Adjust the delay (in milliseconds) as needed
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      setImgPreview(reader.result)
    };
    reader.readAsDataURL(file);
  }

  const removeImg = () => {
    setImgPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !imgPreview) return

    try {
      await sendMessage({
        text: inputValue.trim(),
        image: imgPreview
      })
      //clear form
      setInputValue('')
      setImgPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      console.log('failed to send message:', error)
    }
  }

  return (
    <>
      <div className="chat-input-container">
        {imgPreview && (
          <div className='mb-3 d-flex align-items-center gap-2'>
            <div className='position-relative'>
              <Image
                fluid
                src={imgPreview}
                alt='preview-img'
                width={50}
                height={50}
                className='rounded border border-dark'
              />
              <Button className='position-absolute end-0 top-0 rounded-circle' onClick={removeImg}>
                <i className='bi bi-x' />
              </Button>
            </div>
          </div>
        )}
        <Form onSubmit={handleSendMsg}>
          <div className="d-flex align-items-end">
            <div className="chat-tools me-2">
              <Button type="button">
                <i className="bi bi-emoji-smile"></i>
              </Button>
              <Button
                type="button"
                className={`${imgPreview ? 'text-success' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="bi bi-paperclip"></i>
              </Button>
              <Form.Control
                type='file'
                accept='image/*'
                className='d-none'
                ref={fileInputRef}
                onChange={handleImgChange}
              />

            </div>
            <div className="flex-grow-1">
              <textarea
                className="form-control chat-input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={handleInputChange}
                rows="1"
              />
            </div>
            <div className="ms-2">
              <Button
                type="submit"
                variant='primary'
                className="send-button"
                disabled={!inputValue.trim() && !imgPreview}
              >
                <i className="bi bi-send-fill"></i>
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ChatInput