const Database = require('../../database/database')
const SpeechTable = require('../../database/tables/speech.table')

const SpeechDTO = require('../models/speech.dto')
const Speech = require('../../database/models/speech.model')

module.exports = class SpeechConverter {
    /**
     * Convert entity (object from db) to a DTO
     * @returns {Object} Speech DTO
     */
    static toDTO(entity) {
        let dto = new SpeechDTO()

        if (entity !== null || entity !== undefined) {
            dto.id = entity._id.replace('speech/', '')
            dto.text = entity.text
            dto.textBase64 = entity.textBase64
            dto.audio = entity.audio
            dto.lang = entity.lang
            dto.categorieId = entity.categorieId
        }

        return dto
    }

    /**
     * Convert DTO to a entity
     * @returns {Object} Speech entity
     */
    static toEntity(dto) {
        let entity = new Speech()

        if (dto !== null || dto !== undefined) {
            entity._id = 'speech/' + dto.id
            entity.title = dto.title
            entity.text = dto.text
            entity.textBase64 = dto.textBase64
            entity.audio = dto.audio
            entity.lang = dto.lang
            entity.categorieId = dto.categorieId
        }

        return entity
    }
}