/**
 * Delay the running of an async function for a specified duration
 */
export async function sleep(durationMs = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(undefined);
        }, durationMs);
    });
}
