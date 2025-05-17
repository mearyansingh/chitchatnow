import { create } from 'zustand'
import { axiosInstance } from '../src/Lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({

  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  isTyping: false,

  //Get all the user
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users')
      set({ users: res.data })
    } catch (error) {
      console.log("Error in getUsers:", error)
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  //Get all the messages
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Error in getMessages:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  setTyping: (value) => set({ isTyping: value }),

  // Send message
  sendMessage: async (msgData) => {
    const { selectedUser, messages } = get()
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, msgData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error in sendMessage:", error);
      toast.error(error.response.data.message)
    }
  },

  //Subscribe to the realtime message
  subscribeToMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return

    const socket = useAuthStore.getState().socket //important->access the state of another store

    socket.on('newMessage', (newMessage) => {
      // the code that only sent the message to the user that we have selected
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
      if (!isMessageSentFromSelectedUser) return

      set({ messages: [...get().messages, newMessage] })
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket
    socket.off('newMessage')
  },
}))