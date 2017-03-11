/**
 * Speech Model
 */
module.exports = class Speech {
    constructor(data) {
        if (arguments.length === 0) {
            this._id = null
            this._rev = null
            this.text = null
            this.textBase64 = null
            this.audio = null
            this.lang = null
            this.categorieId = null
        }
        else {
            this._id = data._id
            this._rev = data._rev
            this.text = data.text
            this.textBase64 = data.textBase64
            this.audio = data.audio
            this.lang = data.lang
            this.categorieId = data.categorieId
        }
    }
}