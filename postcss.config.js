// postcss.config.js
module.exports = {
  plugin: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
}
