import {io} from "socket.io-client";
import React from "react";

let baseUrl = window.location.href.includes("localhost") ?
    "http://localhost:1338" :
    "https://jsramverk-editor-erru17.azurewebsites.net";

export const socket = io.connect(baseUrl);
export const SocketContext = React.createContext();
