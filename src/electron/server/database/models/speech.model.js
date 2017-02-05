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
            this.categorieId = null
        }
        else {
            this._id = data._id
            this._rev = data._rev
            this.text = data.text
            this.textBase64 = data.textBase64
            this.audio = data.audio
            this.categorieId = data.categorieId
        }
    }

    // /**
    //  * ID (UUID)
    //  * @returns {String} UUID
    //  */
    // get _id() {
    //     return this._id
    // }
    // set _id(id) {
    //     this._id = id
    // }

    // /**
    //  * Revison ID
    //  * @returns {String} 
    //  */
    // get _rev() {
    //     return this._rev
    // }
    // set _rev(rev) {
    //     this._rev = rev
    // }

    // /**
    //  * @returns {String} Text of the speech
    //  */
    // get text() {
    //     return this.text
    // }
    // set text(_text) {
    //     this.text = text
    // }

    // /**
    //  * Note: Use for comparision between a text typed by the user (that he want to speech) and text saved into database
    //  * @returns {String} Text in Base64
    //  */
    // get textBase64() {
    //     return this.textBase64
    // }
    // set textBase64(_tb64) {
    //     this.textBase64 = _tb64
    // }

    // /**
    //  * @returns {String} Base64 audio encoded
    //  */
    // get audio() {
    //     return this.audio
    // }
    // set audio(_audio) {
    //     this.audio = _audio
    // }

    // /**
    //  * @returns {String} Categorie ID (UUID)
    //  */
    // get categorieId() {
    //     return this.categorieId
    // }
    // set categorieId(_categId) {
    //     this.categorieId = _categId
    // }
}