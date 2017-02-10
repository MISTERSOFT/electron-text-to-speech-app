const categorieRoutes = require('express').Router()

const Database = require('../database/database')
const responses = require('../common/responses')
let CategorieTable = require('../database/tables/categorie.table')
    CategorieTable = new CategorieTable()
let SpeechTable = require('../database/tables/speech.table')
    SpeechTable = new SpeechTable()
const Categorie = require('../database/models/categorie.model')
const CategorieConverter = require('../dto/converters/categorie.converter')
const SpeechConverter = require('../dto/converters/speech.converter')
const Tools = require('../common/tools')

/**
 * Get all categories
 */
categorieRoutes.get('/', (req, res, next) => {
    CategorieTable.findAll().then((data) => {
        let result = []
        if (data.result.length > 0) {
            data.result.map(c => {
                result.push(CategorieConverter.toDTO(c.doc))
            })
        }

        res.status(200)
            .type('json')
            .end(JSON.stringify(new responses.Response(result)));
    })
})

categorieRoutes.get('/speeches', (req, res, next) => {
    CategorieTable.findAll().then((data_categ) => {
        let categories = []
        if (data_categ.result.length > 0) {
            data_categ.result.map(c => {
                categories.push(CategorieConverter.toDTO(c.doc))
            })
            SpeechTable.findAll().then((data_speeches) => {
                let result = []
                if (data_speeches.result.length > 0) {
                    data_speeches.result.map((s) => {
                        result.push(SpeechConverter.toDTO(s))
                    })
                }
                for (let i = 0; i < speeches.length; i++) {
                    categories[i].speeches = result.filter(function(speech, index) {
                        if (categories[i].id === speech.id) {
                            return speech;
                        }
                    })
                }

                res.status(200)
                    .type('json')
                    .end(JSON.stringify(new responses.Response(categories)));
            })
        }
    })
})

/**
 * Get a categorie
 */
categorieRoutes.get('/:id', (req, res, next) => {
    let id = req.params.id || null

    if (id !== null) {
        CategorieTable.find(id).then((data) => {
            data = CategorieConverter.toDTO(data)

            res.status(200)
                .type('json')
                .end(JSON.stringify(data));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, params are empty'));
    }
})

/**
 * Add a categorie
 */
categorieRoutes.post('/', (req, res, next) => {
    let categ = req.body.categorie || null

    if (categ !== null) {
        let model = CategorieConverter.toEntity(categ)

        CategorieTable.add(model).then((data) => {
            data = CategorieConverter.toDTO(data)

            res.status(200)
                .type('json')
                .end(JSON.stringify(data));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, body is empty'));
    }
})

/**
 * Update a categorie
 */
categorieRoutes.put('/', (req, res, next) => {
    let categ = req.body.categorie || null

    if (categ !== null) {
        let model = CategorieConverter.toEntity(categ)

        CategorieTable.add(model).then((data) => {
            data = CategorieConverter.toDTO(data)

            res.status(200)
                .type('json')
                .end(JSON.stringify(data));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, body is empty'));
    }
})

/**
 * Delete a categorie
 */
categorieRoutes.delete('/:id', (req, res, next) => {
    let id = req.params.id || null

    if (id !== null) {
        CategorieTable.delete(id).then((result) => {
            res.status(200)
                .type('json')
                .end(JSON.stringify(result));
        })
    }
    else {
        res.status(400).end(new responses.ResponseError('Invalid request, params are empty'));
    }
})

module.exports = categorieRoutes