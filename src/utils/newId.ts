let lastId = 0;

export function newId (prefix='id') {
    lastId++;
    return `${prefix}${lastId}`;
}