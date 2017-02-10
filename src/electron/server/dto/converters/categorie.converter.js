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
            dto.deletable = entity.deletable
        }

        return dto
    }

    static toEntity(dto) {
        let entity = new Categorie()

        if (dto !== null || dto !== undefined) {
            entity._id = 'categorie/' + dto.id
            entity.title = dto.title
            entity.deletable = dto.deletable
        }

        return entity
    }
}