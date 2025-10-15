export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode = 500, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;

		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}

export class DatabaseQueryError extends AppError {
	constructor(message = "Database query error") {
		super(message, 500);
	}
}

export class NotFoundError extends AppError {
	constructor(message = "Not found") {
		super(message, 404);
	}
}

export class BadRequestError extends AppError {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}

export class ServerError extends AppError {
	constructor(message = "Server error") {
		super(message, 500);
	}
}
