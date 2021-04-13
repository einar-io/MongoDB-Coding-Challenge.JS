const itzibitzi = require('../src/itzibitzi.js')

describe("Parse and flatten", () => {

    const parseAndFlatten = itzibitzi.parseAndFlatten

    test('Test from the challenge description', () => {
        
        const test1 =
`{
    "a": 1,
    "b": true,
    "c": {
        "d": 3,
        "e": "test"
    }
}`

        const expected1 =
`{
    "a": 1,
    "b": true,
    "c.d": 3,
    "c.e": "test"
}`

        expect(parseAndFlatten(test1)).toStrictEqual(expected1)
    })

    test('Empty object', () => {
        
        const test2 = '{}'
        const expected2 = '{}'

        expect(parseAndFlatten(test2)).toStrictEqual(expected2)
    })

    test('Handling three levels of nesting', () => {

        const test3 = `{"a": {"b": {"c": 1}}}`
        const expected3 = 
`{
    "a.b.c": 1
}`

        expect(parseAndFlatten(test3)).toStrictEqual(expected3)
    })


    test('Two sibling objects', () => {

        const test4 = `{"a": {"aa": 1}, "b": {"bb": 2}}`
        const expected4 = 
`{
    "a.aa": 1,
    "b.bb": 2
}`

        expect(parseAndFlatten(test4)).toStrictEqual(expected4)
    })

    test('Handling a `null`', () => {

        const test5 = `{"Key?": null}`
        const expected5 =
`{
    "Key?": null
}`

        expect(parseAndFlatten(test5)).toStrictEqual(expected5)
    })

    test('Clashing keys', () => {

        const test6 = `{"a.aa": 1, "a": {"aa": 2}}`
        const expected6 =
`{
    "a.aa": 2
}`

        expect(parseAndFlatten(test6)).toStrictEqual(expected6)
    })

    test('Nested empty object', () => {

        const test7 = `{"a": {}}`
        const expected7 = `{}`

        expect(parseAndFlatten(test7)).toStrictEqual(expected7)
    })

    test('Nested numbers', () => {

        const test8 = `{"n": {"e": 2.7, "pi": 3.14}}`
        const expected8 = 
`{
    "n.e": 2.7,
    "n.pi": 3.14
}`

        expect(parseAndFlatten(test8)).toStrictEqual(expected8)
    })

    test('Nested booleans', () => {

        const test9 = `{"Bools": {"true": true, "false": false}}`
        const expected9 = 
`{
    "Bools.true": true,
    "Bools.false": false
}`

        expect(parseAndFlatten(test9)).toStrictEqual(expected9)
    })

    test('Nested string', () => {

        const test10 = `{"ThisIs": {"TheEnd": "Thank you for reading through my tests!"}}`
        const expected10 = 
`{
    "ThisIs.TheEnd": "Thank you for reading through my tests!"
}`

        expect(parseAndFlatten(test10)).toStrictEqual(expected10)
    })

    test('Bonustest for the JavaScript version', () => {

        const testA = `{"a": {"b": {"c": 32}}, "d": {"e": {"f": 42}}, "g": null}`
        const expectedA = 
`{
    "a.b.c": 32,
    "d.e.f": 42,
    "g": null
}`

        expect(parseAndFlatten(testA)).toStrictEqual(expectedA)
    })

})








