/**
 * Error response from database
 * @param {Object} err - Error returned from query
 */
class ResponseError {
    constructor(err) {
        this.success = false
        this.error = err
    }
}
/**
 * Success response from database
 * @param {Object} data - Response returned from query
 */
class Response {
    constructor(data) {
        this.success = true
        this.result = data
    }
}

module.exports = {
    Response: Response,
    ResponseError: ResponseError
}