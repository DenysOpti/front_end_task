import { toast } from "react-toastify";

export const isAuthorized = () => {
  return !!localStorage.getItem("access_token");
};
export const logout = () => {
  localStorage.clear();
};
export const forceLogout = () => {
  logout();
  location.reload();
};
export const catchError = (code: number, message?: string) => {
  if (message) {
    toast.error(message);
  } else if (code === 401) {
    toast.error("Unauthorized user!");
    forceLogout();
  } else {
    toast.error("Something wrong occurred!");
  }
};
export const isEmailValid = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
