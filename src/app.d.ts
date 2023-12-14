// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	var prisma: PrismaClient
	
	interface Domain {
		id: string,
		name: String,
		title: String,
		topic: String,
	}
}

export {};
