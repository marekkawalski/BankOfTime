import AuthenticationService from "../services/AuthenticationService";

export function LogoutAndNavigateLogin() {
  AuthenticationService.logout();
  window.open("/", "_self");
}
