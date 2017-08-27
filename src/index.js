const { Chromeless } = require("chromeless");
const selectors = require("./selectors");
const urls = require("./urls");
const { ChromelessInstagramError } = require("./error");

class Instagram {
  constructor(options = {}, chromelessOptions = {}) {
    this.chromeless = new Chromeless(chromelessOptions);
    this.options = options;
    this.loggedIn = false;

    if (options.userAgent) {
      this.chromeless.setUserAgent(options.userAgent);
    }
  }

  /**
   * Logs in to Instagram service. Returns object containing user statistics.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    const payload = await this.chromeless
      .goto(urls.LOGIN_URL)
      .clearInput(selectors.LOGIN_PASSWORD_INPUT)
      .clearInput(selectors.LOGIN_USERNAME_INPUT)
      .type(username, selectors.LOGIN_USERNAME_INPUT)
      .type(password, selectors.LOGIN_PASSWORD_INPUT)
      .click(selectors.LOGIN_BUTTON)
      .wait(selectors.MY_ACCOUNT_BUTTON)
      .click(selectors.MY_ACCOUNT_BUTTON)
      .wait(selectors.PROFILE_USERNAME_TEXT)
      .evaluate(
        (usernameSelector, statsSelector) => {
          const data = {};
          const stats = [].map.call(
            document.querySelectorAll(statsSelector),
            span => span.innerHTML
          );

          data.posts = stats[0];
          data.followers = stats[1];
          data.following = stats[2];

          return data;
        },
        selectors.PROFILE_USERNAME_TEXT,
        selectors.PROFILE_STATS
      );

    this.loggedIn = true;
    this.username = username;
    return payload;
  }

  /**
   * Gets current user photos. Must be logged in first.
   * Returns an array of links to photos and thumbnails.
   */
  async getMyPhotos() {
    if (!this.loggedIn || !this.username) {
      throw new ChromelessInstagramError(
        "Cannot invoke getMyPhotos! Use `login(username, password)` first."
      );
    }

    const payload = await this.chromeless
      .goto(urls.USER_URL(this.username))
      .evaluate(thumbnailSelector => {
        const photos = [].map.call(
          document.querySelectorAll(thumbnailSelector),
          a => ({
            link: a.href,
            thumbnail: a.querySelector("img").src
          })
        );

        return photos;
      }, selectors.PHOTO_THUMBNAIL);

    return payload;
  }

  getFeed() {
    // Not implemented yet
  }

  getUser(username) {
    // Not implemented yet
  }

  followUser(username) {
    // Not implemented yet
  }

  getUserPhotos(username) {
    // Not implemented yet
  }

  getPhoto(idOrLink) {
    // Not implemented yet
  }

  likePhoto(idOrLink) {
    // Not implemented yet
  }

  commentPhoto(idOrLink, comment) {
    // Not implemented yet
  }
}

module.exports = Instagram;
