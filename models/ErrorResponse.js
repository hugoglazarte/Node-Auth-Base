class ErrorResponse extends Error {
    constructor(statusCode,errorCode,message) {
        super();
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}

const modelToJson = (err) => {
    return JSON.parse(JSON.stringify(err))
}

module.exports = {
    ErrorResponse,
    modelToJson
}