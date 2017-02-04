const Buffer = require('buffer')
const uuid = require('node-uuid')

module.exports = {
    /**
     * Encode a string in Base64
     */
    toBase64 : (str) => {
        return Buffer.from(str, 'base64')
    },
    /**
     * Generate a new UUID (based on time)
     */
    newUUID : () => {
        return uuid.v1()
    }
}