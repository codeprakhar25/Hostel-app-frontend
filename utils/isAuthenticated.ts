export function isAuth () {
  return localStorage && localStorage.getItem('token') ? true : false;
};
