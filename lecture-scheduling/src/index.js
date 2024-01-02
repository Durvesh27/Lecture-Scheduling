import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./Context";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  </>
);
