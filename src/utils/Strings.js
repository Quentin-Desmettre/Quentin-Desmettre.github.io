
const firstNWords = (str, n) => {
    return str.split(' ').slice(0, n).join(' ')
}
const extractFirstNWords = (str, n) => {
    const firstN = firstNWords(str, n)
    const restOfTheText = str.replace(firstN, '')
    return [firstN, restOfTheText]
}

const formatNumeric = (value) => {
    // 1356789 => 1,356,789

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const isInArray = (array, element, comparator) => {
    for (let i = 0; i < array.length; i++) {
        if (comparator(array[i], element))
            return true;
    }
    return false;
}

export {
    firstNWords,
    extractFirstNWords,
    formatNumeric,
    isInArray,
}
