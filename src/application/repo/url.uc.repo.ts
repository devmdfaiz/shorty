export interface UrlUseCaseRepo {
	create(originalUrl: string): Promise<string>;
	delete(shortedUrl: string): Promise<void>;
	get(): Promise<string[]>;
	getOriginalUrl(shortedCode: string): Promise<string>;
}
