export default class Api{
    constructor(options){
        this._url = options.baseUrl;
        this._headers=options.headers;
        this._authorization= this._headers.authorization;
    }
    _getResponseData(res){
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`,{
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData);
    }
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData);
    }
    setUserInfo(info){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.description 
              })
        })
            .then(this._getResponseData);
    }
    setUserAvatar(urlAvatar){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: urlAvatar.avatar,
              })
        })
            .then(this._getResponseData);
    }
    addCard(info){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                link: info.link
              })
        })
            .then(this._getResponseData);
    }
    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData);
    }

    putLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData);
    }
    deleteLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData);
    }

}