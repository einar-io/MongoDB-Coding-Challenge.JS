#!/usr/bin/env node

const fs = require('fs')

async function getInputObject () {
  // Get input
  let input
  try {
    input = fs.readFileSync(process.stdin.fd, 'utf-8')
  } catch (error) {
    console.error('No input supplied.  Try: `echo {"a": {"b": {"c": 42}}} |  node fdsf`')
    process.exit()
  }

  console.info(`read: ${input}`)

  // Parse input
  let parsed
  try {
    parsed = JSON.parse(input)
  } catch (error) {
    console.error(`The input: ${input}`)
    process.exit()
  }

  return parsed
}

async function flatten (obj) {
  return obj
}

async function writeOutputObject (flatObj) {
  console.info(`result: ${flatObj}`)
  return flatObj
}

async function main () {
  console.info('start')

  const parsed = await getInputObject()
  const output = await flatten(parsed)
  writeOutputObject(output)

  console.info('done')
  process.exit()
}

main()
