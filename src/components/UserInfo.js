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

  setUserInfo({ name, about }) {
    this._user.textContent = name;
    this._userAbout.textContent = about;
  }

   setUserInfo(userData) {
    const {name, about, avatar, id} = userData;
    this._user.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this._userId = id;
  }

  changeUserInfo({name, about}) {
    this._user.textContent = name;
    this._userAbout.textContent = about;
  }

  setUserAvatar({newUserAvatar}) {
    this._userAvatar.src = newUserAvatar;
  }

  getUserId() {
    return this._userId;
  }
}
