export function setToken(token) {
    localStorage.setItem('token', token);
  }
  
export function setUserLocally(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  export function getUserFromLocal() {
    return localStorage.getItem('user');
  }
  
  export function clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }