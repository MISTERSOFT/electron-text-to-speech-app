const devRouter = require('express').Router()
const CONSTANTS = require('../common/constants')
const PouchDB = require('pouchdb')

devRouter.get('/cleandb', (req, res, next) => {
    let db = new PouchDB(CONSTANTS.DATABASE_NAME)
    db.destroy().then((state) => {
        if (state.ok) {
            res.status(200).end('Database cleaned up')
        }
        else {
            res.status(200).end('Impossible to destroy database')
        }
    })
})

module.exports = devRouter