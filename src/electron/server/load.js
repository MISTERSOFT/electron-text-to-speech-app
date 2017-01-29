// let config = JSON.parse(require('./config.json')) || {}
module.exports = class Load {

    constructor() { }

    static accessTokenAPI() {
        return require('./../config.json').BingSpeechAPI_Key;
    }

}