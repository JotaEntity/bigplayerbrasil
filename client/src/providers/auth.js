export function Auth() {
  if (localStorage.getItem("user-play")) {
    return true;
  } else {
    return false;
  }
}
export function userIsAdmin() {
  if (
    localStorage.getItem("user-play") &&
    localStorage.getItem("user-admin") == 1
  ) {
    return true;
  } else {
    return false;
  }
}
export function userToken() {
  return localStorage.getItem("user-play");
}
