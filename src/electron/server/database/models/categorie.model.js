/**
 * Categorie Model
 */
module.exports = class Categorie {
    constructor(data) {
        if (arguments.length === 0) {
            this._id = null
            this._rev = null
            this.title = null
            this.lang = null
            this.deletable = null
        }
        else {
            this._id = data._id
            this._rev = data._rev
            this.title = data.title
            this.lang = data.lang
            this.deletable = data.deletable
        }
    }
}