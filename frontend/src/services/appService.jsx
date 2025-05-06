// import { HubConnectionBuilder } from "@microsoft/signalr";

// let connection = null;


// export const getSignalRConnection = () => {
//     if (!connection) {
//         connection = new HubConnectionBuilder()
//             .withUrl(import.meta.env.VITE_BACKEND_API_URL + "/hub-signalr")
//             .withAutomaticReconnect()
//             .build();
//     }
//     return connection;
// };

// export const startSignalRConnection = async () => {
//     const conn = getSignalRConnection();
//     if (conn.state === "Disconnected") {
//         try {
//             await conn.start();
//             console.log("SignalR bağlantısı kuruldu.");
//         } catch (err) {
//             console.error("SignalR bağlantı hatası:", err);
//         }
//     }
// };

// export const stopSignalRConnection = async () => {
//     if (connection && connection.state === "Connected") {
//         await connection.stop();
//         console.log("SignalR bağlantısı kapatıldı.");
//     }
// };