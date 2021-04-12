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
        break
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
function evaluator(path, key, value) {
  switch (typeof$(value)) {

    case 'object':
        const entries = Object.entries(value)
        return entries.flatMap(([k, v]) => evaluator(suffix(path, key), k, v))
        break

    case 'array':
        throw Error('Arrays are not supported')
        break

    default:
        // value is a primitive type
        return [[suffix(path, key), value]]
  }
}

function flatten (obj) {
  const initPath = ''
  const initKey  = ''
  const rvArr    = evaluator(initPath, initKey, obj)
  return Object.fromEntries(rvArr)
}

function parseAndFlatten (rawtxt) {
  /* JSON.parse() is a picky eater.  We should use a more comprehensive deprettyfier,
  but for demonstration purposes, this will do */
  const preprocess = rawtxt.replace(/\n/g, '').replace(/\s{2,}/g, ' ')
  const parsed     = JSON.parse(prep)
  const flatObj    = flatten(parsed)
  const prettyStr  = JSON.stringify(flatObj, null, 4)
  return prettyStr
}
