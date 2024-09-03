import { Result } from "../modules/messages/messages.types";



export async function apiHandler<T>(callback: (...args: any[]) => Promise<T>, ...args: any[]): Promise<Result<T>> {
    try {
        const data: T = await callback(...args);
        return [data, null];
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.name);
            console.error(error.message);
            return [null, error];
        }
        return [null, new Error("Unknown error occurred")];
    }
}


export async function someAsyncCall(woo: any): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foo = {
                woo,
                waa: 'resolved promise'
            }
            resolve(foo);
        }, 5000);
    })
}

export function createBatches<T>(size: number, array: Array<T>) {
    let batches = [];

    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size));
    }

    return batches
}