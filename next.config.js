const withSass = require('@zeit/next-sass')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
   
    exportPathMap: function () {
        return {
            '/': { page: '/' },
        }
    },
    withSass,
    assetPrefix: !debug ? '/Next-gh-page-example/' : ''
}