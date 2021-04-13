#!/usr/bin/env node

const getStdin = require('get-stdin')
const itzibitzi = require('./itzibitzi.js')

const EXIT_FAILURE = 1

async function main () {
    const usrtxt = await getStdin()

    if (usrtxt === '') {
        console.error('No input supplied.  Try: `echo \'{ "a": 1, "b": true, "c": { "d": 3, "e": "test" }}\' |  node src/cli.js`')
        process.exit(EXIT_FAILURE)
    }

    const prettyStr = itzibitzi.parseAndFlatten(usrtxt)
    console.log(prettyStr)

    return prettyStr
}

main()
