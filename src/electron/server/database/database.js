const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
// PouchDB.plugin(require('relational-pouch'))

const CONSTANTS = require('../common/constants')

/**
 * Database class for PouchDB access
 */
module.exports = class Database {
    constructor() {
        this.instance = new PouchDB(CONSTANTS.DATABASE_NAME)
        // TODO - Use relationship after release 1.0
        // this.instance.setSchema([
        //     {
        //         singular: 'speech',
        //         plural: 'speeches',
        //         relationals: {
        //             categorie: { belongTo: 'speech' }
        //         }
        //     },
        //     {
        //         singular: 'categorie',
        //         plural: 'categories',
        //         relationals: {
        //             speeches: { hasMany: 'speech' }
        //         }
        //     }
        // ])
    }

    /**
     * Get database instance
     * @return PouchDB instance
     */
    getInstance() {
        if (this.instance === null && this.instance === undefined) {
            this.instance = new PouchDB(CONSTANTS.DATABASE_NAME)
        }
        return this.instance
    }

    /**
     * Close open connection and free up memory
     */
    close() {
        if (this.instance !== null && this.instance !== undefined) {
            this.instance.close()
        }
    }
}