export class CustomError extends Error {
    public statusCode: number;
    public details?: any;

    constructor(message: string, statusCode = 400, details?: any) {
        super(message);

        this.statusCode = statusCode;
        this.details = details;
    }
}
