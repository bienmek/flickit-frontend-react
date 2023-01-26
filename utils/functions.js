
export async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function parser (string) {
    if (typeof string === "string") {
        return JSON.parse(string)
    }
    return null
}

export function findSmallerNumber(list, variable) {
    let smallerNumber;
    for (let i = 0; i < list.length; i++) {
        if (list[i] <= variable) {
            if (smallerNumber === undefined || list[i] >= smallerNumber) {
                smallerNumber = list[i];
            }
        }
    }
    return smallerNumber;
}

export function findNextHigherNumber(list, variable) {
    let nextHigherNumber;
    for (let i = 0; i < list.length; i++) {
        if (list[i] > variable) {
            if (nextHigherNumber === undefined || list[i] < nextHigherNumber) {
                nextHigherNumber = list[i];
            }
        }
    }
    return nextHigherNumber;
}