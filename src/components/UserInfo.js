export default class UserInfo{
    constructor( userInformation ){
        this._profTitle = document.querySelector(userInformation.profTitle);
        this._profSubtitle = document.querySelector(userInformation.profSubtitle);
        this._profAvatar = document.querySelector(userInformation.profAvatar)
    }
    getUserInfo(){
        return {name: this._profTitle.textContent,
        description: this._profSubtitle.textContent}
    }
    setUserInfo({avatar,name,description}){
        this._profAvatar.src = avatar;
        this._profTitle.textContent = name;
        this._profSubtitle.textContent = description;
    }
}