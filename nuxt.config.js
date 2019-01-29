const pkg = require('./package')

module.exports = {
  mode: 'spa',
  head: {
    title: "云笔记",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  dev: (process.env.NODE_ENV !== 'production'),
  loading: {color: '#fff'
},
loader:[
  {
      test:/\.less$/,
      loaders:'style-loader!css-loader!less-loader'
  }
],
  css: [],
  plugins: [
    {src: '~plugins/iview', ssr: false},
    {src:'~plugins/markdown',ssr:false}
    
  ],
  modules: [

  ],
  proxy: {
    
  },
  build: {
   
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://101.132.104.74:7072/api'
  }
}
