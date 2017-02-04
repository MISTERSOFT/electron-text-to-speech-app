const ResponseError = require('response')
const Response = require('response')

// todo delete this
console.log('Response class', Response)
console.log('ResponseError class', ResponseError)
// end todo


/**
 * Class that manage Categorie table
 */
module.exports = class CategorieTable {
    constructor(dbInstance) {
        this.db = dbInstance
    }

    /**
     * @param {Categorie} model - Categorie model
     */
    add(model) {
        return this.db.put(model).then((result) => {
            if (result.ok) {
                console.log('categorie add', result)
                return Promise.resolve(new Response(result))
            }
        }).catch((err) => {
            console.log('categorie add failed', err)
            return Promise.reject(new ResponseError(err))
        })
    }

    find(id) {
        
    }
}