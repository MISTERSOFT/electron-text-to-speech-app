const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

/**
 * Singleton class for PouchDB access
 */
module.exports = class Database {
    constructor() {
        this.instance = null
    }

    /**
     * Get database instance
     * @return PouchDB instance
     */
    getInstance() {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new PouchDB('speech')
        }
        return this.instance
    }

    /**
     * Close open connection and free up memory
     */
    close() {
        if (this.instance !== null ||this.instance !== undefined) {
            this.instance.close()
        }
    }
}