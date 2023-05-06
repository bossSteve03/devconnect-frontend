import { useState } from 'react';

export default function tokenService() {
  const fetchToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString);
  };

  const [token, setToken] = useState(fetchToken());

  const addToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const removeToken = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  }

  return {
    setToken: addToken,
    removeToken: removeToken,
    token
  }
}