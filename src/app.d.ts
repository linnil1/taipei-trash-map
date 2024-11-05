// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
        interface Platform {
            env: {
                data_trashcar: KVNamespace
            }
            context: {
                waitUntil(promise: Promise<any>): void
            }
            caches: CacheStorage & { default: Cache }
        }
    }
}

export {}
