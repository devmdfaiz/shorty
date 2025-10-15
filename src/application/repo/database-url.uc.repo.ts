export interface DatabaseUrlRepo {
	create(originalUrl: string, shortCode: string): Promise<void>;
	delete(id: string): Promise<void>;
	get(): Promise<string[]>;
	getByShortCode(shortCode: string): Promise<string>;
}
