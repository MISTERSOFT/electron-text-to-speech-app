const PouchDB = require('pouchdb')

module.exports = class Database {
    constructor() {
        this.db = new PouchDB('speech')
    }

    
}