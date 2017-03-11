/**
 * Speech DTO
 */
module.exports = class SpeechDTO {
    constructor() {
        this.id = null
        this.text = null
        this.textBase64 = null
        this.audio = null
        this.lang = null;
        this.categorieId = null
    }
}