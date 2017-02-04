/**
 * Categorie Model
 */
module.exports = class Categorie {
    constructor(data) {
        if (arguments.length === 0) {
            this.id = null
            this._rev = null
            this.title = null
        }
        else {
            this.id = data._id
            this._rev = data._rev
            this.title = data.title
        }
    }

    /**
     * ID (UUID)
     * @returns {String} UUID
     */
    get _id() {
        return this.id
    }
    set _id(_id) {
        this.id = _id
    }

    // Rev
    get _rev() {
        return this._rev
    }
    set _rev(rev) {
        this._rev = rev
    }

    // Title
    get title() {
        return this.title
    }
    set title(_title) {
        this.title = _title
    }

}