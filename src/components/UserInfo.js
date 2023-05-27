export default class UserInfo{
    constructor( userInformation ){
        this._userName = document.querySelector(userInformation.nameInput);
        this._userJob = document.querySelector(userInformation.jobInput);
        this._profTitle = document.querySelector(userInformation.profTitle);
        this._profSubtitle = document.querySelector(userInformation.profSubtitle);
    }
    getUserInfo(){
        this._userName.value = this._profTitle.textContent;
        this._userJob.value = this._profSubtitle.textContent;
    }
    setUserInfo(){
        this._profTitle.textContent = this._userName.value;
        this._profSubtitle.textContent = this._userJob.value;
    }
}