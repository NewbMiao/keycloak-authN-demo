import React from "react";
import KeycloakProvider from "./KeycloakProvider";
import "./styles.css";
import UserInfo from "./UserInfo";

export default function App() {
  return (
    <div className="App">
      <KeycloakProvider>
        <h1>Hello, you just pass auth</h1>
        <UserInfo />
      </KeycloakProvider>
    </div>
  );
}
