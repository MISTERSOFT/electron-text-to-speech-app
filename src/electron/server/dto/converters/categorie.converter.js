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
        }

        return dto
    }

    static toEntity(dto) {
        let entity = new Categorie()

        if (dto !== null || dto !== undefined) {
            CategorieTable(Database.getInstance()).find(dto.id).then((data) => {
                entity._id = 'categorie/' + dto.id
                entity.title = dto.title
                entity._rev = data.result._rev
            })
        }

        return entity
    }
}