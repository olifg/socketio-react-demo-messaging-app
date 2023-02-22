import { useContext, createContext, useState, useEffect } from "react";
import { io, Socket } from 'socket.io-client';

type SocketProviderProps = {
    children: React.ReactNode;
    userId: string;
};

const SocketContext = createContext<Socket | null>(null)

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children, userId }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('https://socketio-react-demo.onrender.com:5000', {
            query: { id: userId }
        });
        setSocket(newSocket);

        return () => {
            newSocket.close();
        }
    }, [userId])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}