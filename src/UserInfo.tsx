import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect, useState } from 'react';

const UserInfo: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const info = await keycloak?.loadUserInfo();
      setUserInfo(info);
    })().catch(console.error);
  }, [keycloak]);
  if (!initialized) {
    return <div>initializing </div>;
  }

  return (
    <div>
      <h2>UserInfo:</h2>
      <p> {JSON.stringify(userInfo)}</p>
      <h2>AccessToken:</h2>
      <code>{keycloak?.token ?? ''}</code>
    </div>
  );
};

export default UserInfo;
