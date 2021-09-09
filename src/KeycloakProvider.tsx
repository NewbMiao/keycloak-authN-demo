import {
  ReactKeycloakProvider
} from "@react-keycloak/web";
import React, { useState } from "react";
import Keycloak from "keycloak-js";

// setup keycloak in local
// refer to: https://www.keycloak.org/getting-started/getting-started-docker
const authUrl = "http://localhost:8080/auth";
const keycloak = Keycloak({
  url: authUrl,
  realm: "myrealm",
  clientId: "myclient"
});
const keycloakProviderInitConfig = {
  onLoad: "login-required",
  flow: "standard",
  pkceMethod: "S256"
  // persist token avoid request new token on each tab:
  // https://github.com/react-keycloak/react-keycloak/issues/11#issuecomment-493774379
  // ...{token from cache}
};
// update cache token
const getOnEvent = (setErrorMsg: Function) => (
  event: string,
  error?: any
) => {
  switch (event) {
    case "onInitError":
    case "onAuthError":
    case "onAuthRefreshError":
      setErrorMsg("Auth error, type: " + event + " error: " + error?.error);

      break;
    case "onTokenExpired":
    case "onAuthLogout":
      setErrorMsg("token expired or logout, type: " + event);
      break;
  }
};

const getOnTokens = () => (data: any) => {
  // set cache token
  console.log(data);
};
const KeycloakProvider = ({ children }: { children: React.ReactNode }) => {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={keycloakProviderInitConfig}
        LoadingComponent={<div>loading keycloak...</div>}
        // @ts-ignore
        onEvent={getOnEvent(setErrorMsg)}
        onTokens={getOnTokens()}
      >
        {children}
      </ReactKeycloakProvider>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </>
  );
};
export default KeycloakProvider;
