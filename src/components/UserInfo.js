export default class UserInfo{
    constructor( userInformation ){
        this._profTitle = document.querySelector(userInformation.profTitle);
        this._profSubtitle = document.querySelector(userInformation.profSubtitle);
    }
    getUserInfo(){
        return {name: this._profTitle.textContent,
        description: this._profSubtitle.textContent}
    }
    setUserInfo(content){
        this._profTitle.textContent = content.name;
        this._profSubtitle.textContent = content.description;
    }
}