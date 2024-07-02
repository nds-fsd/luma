const getStorageObject = (key) => {
  const item = localStorage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
  return null;
};

const setStorageObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

const deleteStorageObject = (key) => {
  localStorage.removeItem(key);
};

export const getUserToken = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.token;
  }
  return null;
};

export const getUserSession = () => {
  const session = getStorageObject('user-session');
  if (session) {
    return session.user;
  }
  return null;
};

export const setUserSession = (sessionData) => {
  setStorageObject('user-session', sessionData);
};

export const removeSession = () => {
  deleteStorageObject('user-session');
  deleteStorageObject('calendarsSelectedTabIndex');
  deleteStorageObject('adminSelectedTabIndex');
  deleteStorageObject('selectedTabIndex');
};

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { exp } = JSON.parse(jsonPayload);

    if (exp < Date.now() / 1000) {
      return true;
    }
  } catch (e) {
    return true;
  }

  return false;
};
