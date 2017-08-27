const BASE_URL = "https://instagram.com";
const LOGIN_URL = `${BASE_URL}/accounts/login/`;
const EXPLORE_TAG_URL = tag => `${BASE_URL}/explore/tags/${tag}`;
const USER_URL = username => `${BASE_URL}/${username}`;

module.exports = {
  BASE_URL,
  LOGIN_URL,
  EXPLORE_TAG_URL,
  USER_URL
};
