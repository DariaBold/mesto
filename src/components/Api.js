export default class Api{
    constructor(options){
        this._url = options.baseUrl;
        this._headers=options.headers;
        this._authorization= this._headers.authorization;
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`,{
            headers: {
                authorization: this._authorization
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json();
            }else{
                return Promise.reject
            }
        })
    }
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
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
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
    }
    setUserAvatar(urlAvatar){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: urlAvatar.avatar,
              })
        })
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
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
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
    }
    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
    }

    putLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
    }
    deleteLike(cardId){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject
                }
            })
    }

}