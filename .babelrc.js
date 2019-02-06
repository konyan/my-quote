

const env = require('./env-config')

module.exports = {
  presets: ['next/babel',"react",
  "es2015"],
  plugins: [['transform-define', env]]
}