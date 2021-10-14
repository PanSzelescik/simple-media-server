export const sorter = {
    name: stringSorter('name'),
    modified: numberSorter('modified'),
    size: numberSorter('size'),
}

function stringSorter(prop) {
    return (a, b) => a[prop].localeCompare(b[prop]);
}

function numberSorter(prop) {
    return (a, b) => a[prop] === b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
}
