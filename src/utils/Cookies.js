import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options = {}) => {
  cookies.set(name, value, {
    path: "/",
    ...options, 
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name, options = {}) => {
  cookies.remove(name, {
    path: "/",
    ...options,
   });
};