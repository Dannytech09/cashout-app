import { useState } from "react";
import API_BASE_URL from "@/apiConfig";
import SidebarAdmin from "./Sidebar-Admin";

export default function LogsComp() {
  const [logs, setLogs] = useState([]);
  const [token, setToken] = useState(""); // State for the token input
  const [connected, setConnected] = useState(false); // To track if SSE is connected
  const [message, setMessage] = useState("");

  const handleTokenChange = (e) => {
    setToken(e.target.value); // Update token state when user types
  };

  const handleConnect = () => {
    if (!token) {
      alert("Please enter a valid token!"); // Basic validation for token
      return;
    }

    // Construct the SSE URL with the token
    const BASE_URL = `${API_BASE_URL}/admin/logs?token=${encodeURIComponent(
      token
    )}`;

    // Start SSE connection when button is clicked
    const eventSource = new EventSource(BASE_URL);

    eventSource.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    eventSource.onerror = (error) => {
      // console.error("Error in SSE connection:", error);
      setMessage("Failed to connect to logs.", error);
    };

    // Cleanup the SSE connection on unmount or disconnection
    eventSource.onclose = () => {
      setConnected(false);
      setMessage("SSE connection closed");
    };

    setConnected(true); // Mark connection as successful
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* {loading && <Loader />} */}
      <div className="flex absolute top-0 left-0">
        <SidebarAdmin />
      </div>
      <div className="mt-10">
        <h2 className="">📡 Real-Time Logs</h2>

        {message && (
          <p className="text-center bg-black text-white">{message}</p>
        )}

        {!connected && (
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter Token"
              value={token}
              onChange={handleTokenChange}
              style={{ padding: "8px", width: "200px", marginRight: "10px" }}
              maxLength={50}
            />
            <button
              onClick={handleConnect}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Connect
            </button>
          </div>
        )}

        <div
          style={{
            background: "#000",
            color: "#0f0",
            padding: "10px",
            fontSize: "14px",
            height: "400px",
            overflowY: "auto",
          }}
        >
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// const BASE_URL = `${API_BASE_URL}/admin/logs?token=${encodeURIComponent(token)}`;

// export default function Logs() {
//     const [logs, setLogs] = useState([]);

//     useEffect(() => {
//         const eventSource = new EventSource(`${BASE_URL}`);

//         eventSource.onmessage = (event) => {
//             setLogs((prevLogs) => [...prevLogs, event.data]);
//         };

//         return () => eventSource.close(); // Cleanup on unmount
//     }, []);

//     return (
//         <div style={{ padding: "20px", fontFamily: "Arial" }}>
//             <h2>📡 Real-Time Logs</h2>
//             <div style={{ background: "#000", color: "#0f0", padding: "10px", fontSize: "14px", height: "400px", overflowY: "auto" }}>
//                 {logs.map((log, index) => (
//                     <div key={index}>{log}</div>
//                 ))}
//             </div>
//         </div>
//     );
// }
