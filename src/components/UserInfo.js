export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._user = document.querySelector(profileName);
    this._userJob = document.querySelector(profileJob);
  }

  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      job: this._userJob.textContent
    }
    return userData;
  }

  setUserInfo({ name, job }) {
    this._user.textContent = name;
    this._userJob.textContent = job;
  }
}
