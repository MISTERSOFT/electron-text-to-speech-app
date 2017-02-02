module.exports = class Response {
    constructor(success, data) {
        this.success = success
        this.data = data
    }

    get success() {
        return this.success
    }

    get data() {
        return this.data
    }
}