import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const { keycloak, initialized } = useKeycloak();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const info = await keycloak?.loadUserInfo();
      setUserInfo(info);

    })()

  }, [keycloak])
  if (!initialized) {
    return <div>initializing </div>;
  }
  return (<div>{JSON.stringify(userInfo)}<br />{"token: " + keycloak.token}</div>);
};

export default UserInfo;
