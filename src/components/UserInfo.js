export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._user = document.querySelector(profileName);
    this._userAbout = document.querySelector(profileAbout);
    this._userAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      about: this._userAbout.textContent
    }
    return userData;
  }

  setUserInfo(userData) {
    const {name, about, avatar, id} = userData;
    if (userData) {
      this._user.textContent = name;
      this._userAbout.textContent = about;
      this._userAvatar.src = avatar;
      this._userId = id;
    } else {
      console.log('Ошибка, пофайл не обновлён');
    }
  }

  setUserAvatar({newUserAvatar}) {
    if (newUserAvatar) {
      this._userAvatar.src = newUserAvatar;
    } else {
      console.log('Ошибка, аватар не установлен');
    }
  }

  getUserId() {
    return this._userId;
  }
}
