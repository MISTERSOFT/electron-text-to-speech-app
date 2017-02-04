const responses = require('../tools/responses')
const Categorie = require('../models/categorie.model')

/**
 * Class that manage Categorie table
 */
module.exports = class CategorieTable {
    constructor(dbInstance) {
        this.db = dbInstance
    }

    /**
     * Insert a categorie
     * @param {Categorie} model - Categorie model
     */
    static add(model) {
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
    static find(id) {
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
    static findAll() {
        return this.db.allDocs({
            include_docs: true,
            startkey: type,
            endkey: 'categorie\\' + '\uffff'
        }).then((result) => {
            console.log('All categories fetched !', result)
            result.rows.map((c) => {
                return new Categorie(c.doc)
            })
            return new Promise.resolve(new responses.Response(result.rows))
        }).catch((err) => {
            console.log('Error happened, categories couln\'t be fetched !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Update a categorie
     * @param {Categorie} model - The Categorie model updated
     */
    static update(model) {
        return this.db.put(model).then((result) => {
            console.log('categolrie updated !', result)
            return Promise.resolve(new responses.Response(result))
        }).catch((err) => {
            console.log('Error happened, categorie couln\'t be updated !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Delete a categorie
     * @param {String} id - ID of the categorie
     */
    static delete(id) {
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
}