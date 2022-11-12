const homeButton = document.querySelector(".home-button");
const loginButton = document.querySelector(".login-button");

homeButton.onclick = () => {
  location.href = "/";
}

loginButton.onclick = () => {
  location.href = "/account/login";
}