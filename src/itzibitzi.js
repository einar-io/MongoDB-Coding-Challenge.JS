// JavaScript's `typeof` operator leaves some things to be desired, so we roll our own.
function typeof$ (value) {
    const v = typeof value

    switch (v) {
    case 'object':

        if (value === null) {
            return 'null'
        }

        if (value instanceof Object) {
            return 'object'
        }

        if (value instanceof Array) {
            return 'array'
        }
        // fallthrough for odd objects

    default:
        return v
    }
}

// We do not want at dot in front of the empty path.
function suffix (path, key) {
    if (path === '') {
        return key
    }
    return (path + '.' + key)
}

// The business logic is here.
function evaluator (path, key, value) {
    switch (typeof$(value)) {
    case 'object':
        return Object.entries(value).flatMap(([k, v]) => evaluator(suffix(path, key), k, v))

    case 'array':
        throw Error('Arrays are not supported')

    default:
        // value is a primitive type
        return [[suffix(path, key), value]]
    }
}

function flatten (obj) {
    const initPath = ''
    const initKey = ''
    const rvArr = evaluator(initPath, initKey, obj)
    return Object.fromEntries(rvArr)
}

function parseAndFlatten (usrtxt) {
/* JSON.parse() is a picky eater.  We should use a more comprehensive
 * deprettyfier, but for demonstration purposes, this will do. */
    const preprocess = usrtxt.replace(/\n/g, '').replace(/\s{2,}/g, ' ')
    let parsed
    try {
        parsed = JSON.parse(preprocess)
    } catch (e) {
        return `ERROR: The provided string could not be parsed as JSON.  The strings was:
'''
${usrtxt}
'''
Please check you did not forget a curly bracket or similar.
See also: https://www.json.org.`
    }
    const flatObj = flatten(parsed)
    const prettyStr = JSON.stringify(flatObj, null, 4)
    return prettyStr
}

module.exports = { __esModule: true }
module.exports.flatten = flatten
module.exports.parseAndFlatten = parseAndFlatten
