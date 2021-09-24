import React from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000";

var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000, 
  "transports" : ["websocket"]
};

export const socket = socketIOClient(ENDPOINT, connectionOptions);
export const SocketContext = React.createContext();
