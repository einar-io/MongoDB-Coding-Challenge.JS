#!/usr/bin/env node

const fs = require('fs')

async function main () {
  console.log('start')

  let input
  try {
    input = fs.readFileSync(process.stdin.fd, 'utf-8')
  } catch (error) {
    console.log('No input supplied.  Try: `echo {"a": {"b": {"c": 42}}} |  node fdsf`')
    process.exit()
  }

  console.log(`read: ${input}`)

  console.log('done')
}

main()
