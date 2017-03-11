const Database = require('../../database/database')
const CategorieTable = require('../../database/tables/categorie.table')

const CategorieDTO = require('../models/categorie.dto')
const Categorie = require('../../database/models/categorie.model')

module.exports = class CategorieConverter {
    static toDTO(entity) {
        let dto = new CategorieDTO()

        if (entity !== null || entity !== undefined) {
            dto.id = entity._id.replace('categorie/', '')
            dto.title = entity.title
            dto.lang = entity.lang
        }

        return dto
    }

    static toDTOs(entities) {
        let dtos = []

        if (entities.length > 0) {
            for (let entity of entities) {
                let categorie = new CategorieDTO()
                categorie.id = entity._id.replace('categorie/', '')
                categorie.title = entity.title
                categorie.lang = entity.lang
                dtos.push(categorie)
            }
        }

        return dtos
    }

    static toEntity(dto) {
        let entity = new Categorie()

        if (dto !== null || dto !== undefined) {
            entity._id = 'categorie/' + dto.id
            entity.title = dto.title
            entity.lang = dto.lang
        }

        return entity
    }
}