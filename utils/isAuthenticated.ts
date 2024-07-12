// utils/auth.ts

export const isAuth = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    return true;
  }
  return false;
};
