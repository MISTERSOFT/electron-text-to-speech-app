const responses = require('../../common/responses')
const Speech = require('../models/speech.model')
const Tools = require('../../common/tools')

/**
 * Class that manage Speech table
 */
module.exports = class SpeechTable {
    constructor(dbInstance) {
        this.db = dbInstance
    }

    /**
     * Insert a Speech
     * @param {Speech} model - Speech model
     */
    static add(model) {
        // Generate ID
        model._id = 'speech/' + Tools.newUUID()

        return this.db.put(model).then((result) => {
            if (result.ok) {
                console.log('speech add', result)
                return Promise.resolve(new responses.Response(result))
            }
        }).catch((err) => {
            console.log('speech add failed', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Fetch one speech
     * @param {String} id - ID of the Speech
     */
    static find(id) {
        return this.db.get(id).then((doc) => {
            if (doc) {
                console.log('speech fetched !', doc)
                return Promise.resolve(new responses.Response(doc))
            }
        }).catch((err) => {
            console.log('Error happened, speech couln\'t be fetched !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Fetch all speeches
     */
    static findAll() {
        return this.db.allDocs({
            include_docs: true,
            startkey: type,
            endkey: 'speech\\' + '\uffff'
        }).then((result) => {
            console.log('All speeches fetched !', result)
            // let data = []
            // for (let i in result.rows) {
            //     data.push(new Speech(result.rows[i].doc))
            // }
            result.rows.map((s) => {
                return new Speech(s.doc)
            })
            return new Promise.resolve(new responses.Response(result.rows))
        }).catch((err) => {
            console.log('Error happened, speeches couln\'t be fetched !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Update a Speech
     * @param {Speech} model - The Speech model updated
     */
    static update(model) {
        // Find old values and get _rev value
        let find = null
        this.find(model._id).then(data => find = data.result)
        model._rev = find._rev

        return this.db.put(model).then((result) => {
            console.log('speech updated !', result)
            this.find(result._id).then((data) => {
                return Promise.resolve(new responses.Response(result))
            })
        }).catch((err) => {
            console.log('Error happened, speech couln\'t be updated !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Delete a Speech
     * @param {String} id - ID of the Speech
     */
    static delete(id) {
        return this.db.get(id).then((doc) => {
            return this.db.remove(doc)
        }).then((result) => {
            console.log('speech deleted !', result)
            return Promise.resolve(new responses.Response(result))
        }).catch((err) => {
            console.log('Error happened, speech couln\'t be deleted !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }

    /**
     * Search everything
     * @param {Object} opts - Search options, see https://github.com/nolanlawson/pouchdb-find
     */
    static search(opts) {
        return this.db.find(opts).then((result) => {
            console.log('search success !', result)
            return Promise.resolve(new responses.Response(result.docs))
        }).catch((err) => {
            console.log('Search failed !', err)
            return Promise.reject(new responses.ResponseError(err))
        })
    }
}