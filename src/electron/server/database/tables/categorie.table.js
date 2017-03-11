const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

const CONSTANTS = require('../../common/constants')
const responses = require('../../common/responses')
const Categorie = require('../models/categorie.model')
const Tools = require('../../common/tools')

/**
 * Class that manage Categorie table
 */
module.exports = class CategorieTable {
    constructor() {
        this.db = new PouchDB(CONSTANTS.DATABASE_NAME)
        // Init table
        let searchCateg = 'Sans catégorie'
        this.search({selector: {title: searchCateg}}).then((data) => {
            if (data.result.length === 0) {
                let model = new Categorie({
                    title: searchCateg,
                    lang: 'fr',
                    deletable: false
                })
                this.add(model)
            }
        })
        // TODO: Add EN category lang
    }

    /**
     * Insert a categorie
     * @param {Categorie} model - Categorie model
     */
    add(model) {
        // Generate ID
        model._id = 'categorie/' + Tools.newUUID()

        return this.db.put(model).then((result) => {
            if (result.ok) {
                console.log('categorie add', result)
                return Promise.resolve(new responses.Response(result))
            }
        }).catch((err) => {
            console.log('categorie add failed', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Fetch one categorie
     * @param {String} id - ID of the categorie
     */
    find(id) {
        return this.db.get(id).then((doc) => {
            if (doc) {
                console.log('categorie fetched !', doc)
                return Promise.resolve(new responses.Response(doc))
            }
        }).catch((err) => {
            console.log('Error happened, categorie couln\'t be fetched !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Fetch all categories
     */
    findAll() {
        return this.db.allDocs({
            include_docs: true,
            startkey: 'categorie',
            endkey: 'categorie\\' + '\uffff'
        }).then((result) => {
            console.log('All categories fetched !', result)
            // result.rows.map((c) => {
            //     return new Categorie(c.doc)
            // })
            let data = [];
            for (let c of result.rows) {
                data.push(new Categorie(c.doc))
            }
            return Promise.resolve(new responses.Response(data))
        }).catch((err) => {
            console.log('Error happened, categories couln\'t be fetched !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Update a categorie
     * @param {Categorie} model - The Categorie model updated
     */
    update(model) {
        // Find old values and get _rev value
        let find = null
        this.find(model._id).then(data => find = data.result)
        model._rev = find._rev

        return this.db.put(model).then((result) => {
            console.log('categolrie updated !', result)
            this.find(result._id).then((data) => {
                return Promise.resolve(new responses.Response(result))
            })
        }).catch((err) => {
            console.log('Error happened, categorie couln\'t be updated !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Delete a categorie
     * @param {String} id - ID of the categorie
     */
    delete(id) {
        return this.db.get(id).then((doc) => {
            return this.db.remove(doc)
        }).then((result) => {
            console.log('categorie deleted !', result)
            return Promise.resolve(new responses.Response(result))
        }).catch((err) => {
            console.log('Error happened, categorie couln\'t be deleted !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Search everything
     * @param {Object} opts - Search options, see https://github.com/nolanlawson/pouchdb-find
     */
    search(opts) {
        console.log('pouchdb = ', this.db)
        return this.db.find(opts).then((result) => {
            console.log('search success !', result)
            return Promise.resolve(new responses.Response(result.docs))
        }).catch((err) => {
            console.log('Search failed !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }
}