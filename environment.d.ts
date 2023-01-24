export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_ENDPOINT: string;
			ENV: "test" | "development" | "production";
		}
	}
}
