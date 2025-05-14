export function enumFields<T extends object>(supplier: T) {
    return Object.keys(supplier).filter((key) => isNaN(Number(key)));
}