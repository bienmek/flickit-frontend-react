

export async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function parser (string) {
    if (typeof string === "string") {
        return JSON.parse(string)
    }
    return null
}