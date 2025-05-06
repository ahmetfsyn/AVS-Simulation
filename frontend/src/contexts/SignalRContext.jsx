// context/SignalRContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export const SignalRContext = createContext({
    connection: null,
    loading: true,
});

export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initialSignalRConnection = async () => {
            try {
                const conn = new signalR.HubConnectionBuilder()
                    .withUrl(import.meta.env.VITE_BACKEND_API_URL + "/hub-signalr")
                    .withAutomaticReconnect()
                    .build();

                await conn.start();
                setConnection(conn);
                // console.log(connection)

            } catch (error) {
                console.error("SignalR bağlanırken hata:", error);
            } finally {
                setLoading(false);
            }
        };

        initialSignalRConnection();

        // return () => {
        //     connection?.stop();
        // };
    }, []);

    return (
        <SignalRContext.Provider value={{ connection, loading }}>
            {children}
        </SignalRContext.Provider>
    );
};

// custom hook
