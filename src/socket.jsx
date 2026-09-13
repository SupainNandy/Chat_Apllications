import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { serverUrl } from './config';
import { setOnlineUser } from './redux/userSlice';

const SocketContext = createContext({ socket: null });

export const useSocket = () => useContext(SocketContext);

let globalSocket = null;

export const getSocket = () => globalSocket;

export const initSocket = (userId) => {
    if (globalSocket && globalSocket.connected) return globalSocket;
    if (globalSocket) {
        globalSocket.disconnect();
    }
    globalSocket = io(serverUrl, {
        query: { userId },
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
    });
    return globalSocket;
};

export const disconnectSocket = () => {
    if (globalSocket) {
        globalSocket.disconnect();
        globalSocket = null;
    }
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { userData } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData?._id) {
            const newSocket = io(serverUrl, {
                query: { userId: userData._id },
                withCredentials: true,
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
            });

            globalSocket = newSocket;
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
            });

            newSocket.on('getOnlineUsers', (users) => {
                console.log('Online users:', users);
                dispatch(setOnlineUser(users));
            });

            newSocket.on('disconnect', (reason) => {
                console.log('Socket disconnected:', reason);
            });

            newSocket.on('connect_error', (err) => {
                console.warn('Socket connect error:', err.message);
            });

            return () => {
                newSocket.close();
                if (globalSocket === newSocket) {
                    globalSocket = null;
                }
                setSocket(null);
            };
        } else {
            if (globalSocket) {
                globalSocket.close();
                globalSocket = null;
            }
            setSocket(null);
        }
    }, [userData?._id, dispatch]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
