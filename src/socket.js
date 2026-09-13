import { io } from 'socket.io-client';
import { serverUrl } from './config';

let socket = null;

export const initSocket = (userId) => {
    if (socket && socket.connected) return socket;
    if (socket) {
        socket.disconnect();
    }
    socket = io(serverUrl, {
        query: { userId },
        withCredentials: true
    });
    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
