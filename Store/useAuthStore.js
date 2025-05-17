import { create } from 'zustand'
import toast from 'react-hot-toast'
import { io } from "socket.io-client";
import { axiosInstance } from '../src/Lib/axios'

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/'

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],

  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')
      set({ authUser: res.data })
      get().connectSocket()
    } catch (error) {
      console.log("Error in checkAuth:", error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', userData);
      set({ authUser: res.data });
      toast.success('Account created successfully')
      get().connectSocket()
    } catch (error) {
      console.error("Error in signup:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', credentials);
      set({ authUser: res.data });
      toast.success('Logged in successfully')
      get().connectSocket()
    } catch (error) {
      console.error("Error in login:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logout successfully')
      get().disconnectSocket()
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error(error?.response?.data?.message)
    }
  },

  updateProfile: async (userData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', userData);
      set({ authUser: res.data });
      toast.success('Profile updated successfully')
    } catch (error) {
      console.error("Error in updateProfile:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      // transports: ['websocket'], // optional: prefer websockets
    });

    // socket.connect()
    set({ socket: newSocket });

    newSocket.on('connect', () => {
      console.log('Connected');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected');
    });

    newSocket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // disconnectSocket: () => {
  //   if (get().socket?.connected) get().socket.disconnect()
  // },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      // set({ socket: null, onlineUsers: [] });
    }
  }

}))