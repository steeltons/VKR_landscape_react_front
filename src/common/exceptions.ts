export class ApiException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name= 'ApiException';
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, ApiException.prototype);
    }

}