export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_URL: string;
			WEBPACK_PORT: number;
			ENV: "test" | "development" | "production";
		}
	}
}
