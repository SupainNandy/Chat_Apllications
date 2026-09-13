import { io } from 'socket.io-client';
import { serverUrl } from './config';

let socket = null;

export const initSocket = (userId) => {
    if (socket) return socket;
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
