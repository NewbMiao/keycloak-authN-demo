import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect, useState } from 'react';

const Verify: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();
  const [verified, setVerified] = useState('');

  useEffect((): void => {
    if (!initialized || !keycloak?.token) {
      return;
    }
    const token = keycloak?.token ?? '';
    const req = new Request(
      `http://${process.env.REACT_APP_OPA_URL??'localhost:8181'}/v1/data/verify/is_token_valid`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8;',
        },
        body: JSON.stringify({ input: { token } }),
      }
    );
    fetch(req)
      .then((response) => response.text())
      .then((res) => {
        setVerified(res);
      })
      .catch(console.error);
  }, [keycloak, initialized]);

  return <>{verified}</>;
};
export default Verify;
