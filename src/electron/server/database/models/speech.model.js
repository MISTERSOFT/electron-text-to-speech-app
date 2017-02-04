/**
 * Speech Model
 */
module.exports = class Speech {
    constructor(data) {
        this.id = data.id
        this.text = data.text
        this.textKebabCase = data.textKebabCase
        this.audio = data.audio
        this.categorie = data.categorie
    }
}