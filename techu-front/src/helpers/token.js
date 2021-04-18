const saveToken = (token) => {
  sessionStorage.setItem('token', token);
};

const getToken = () => {
  return sessionStorage.getItem('token');
};

const deleteToken = () => {
  return sessionStorage.removeItem('token');
};

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export {saveToken, getToken, decodeToken, deleteToken};
