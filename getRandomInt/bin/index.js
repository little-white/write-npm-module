#!/usr/bin/env node
var getRandomInt = require('../index')
var arguments = process.argv.slice(2)
console.log(getRandomInt(parseInt(arguments[0]), parseInt(arguments[1])))
