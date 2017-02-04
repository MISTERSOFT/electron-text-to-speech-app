const Database = require('../../database/database')
const SpeechTable = require('../../database/tables/speech.table')

const SpeechDTO = require('../models/speech.dto')
const Speech = require('../../database/models/speech.model')

module.exports = class SpeechConverter {
    static toDTO(entity) {
        let dto = new SpeechDTO()

        if (entity !== null || entity !== undefined) {
            dto.id = entity._id.replace('speech/', '')
            dto.title = entity.title
        }

        return dto
    }

    static toEntity(dto) {
        let entity = new Speech()

        if (dto !== null || dto !== undefined) {
            SpeechTable(Database.getInstance()).find(dto.id).then((data) => {
                entity._id = 'speech/' + dto.id
                entity.title = dto.title
                entity._rev = data.result._rev || null
            })
        }

        return entity
    }
}