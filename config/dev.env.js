'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//webpack-merge用于实现合并类似于ES6的Object.assign()
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
