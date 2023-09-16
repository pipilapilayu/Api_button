/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const webpack = require("webpack")

module.exports = {
  pwa: {
    themeColor: '#c4afd0',
    manifestOptions: {
      name: 'NANA BUTTON',
      short_name: 'NANA BUTTON',
      icons: [
        {
          src: '/img/icon.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    },
    workboxOptions: {
      skipWaiting: true,
      exclude: [/\.(?:mp3|jpg|png|gif)$/],
      // include: [/\.(?:js|css|html|json|ico)$/],
      runtimeCaching: [
        {
          urlPattern: /\.(?:mp3)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'voice-cache',
            expiration: {
              // maxEntries: 10, // 缓存数量
              maxAgeSeconds: 60 * 60 * 24 * 7 // 缓存有效时长
            }
          }
        },
        {
          urlPattern: /\.(?:jpg|png|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              // maxEntries: 10, // 缓存数量
              maxAgeSeconds: 60 * 60 * 24 * 7 // 缓存有效时长
            }
          }
        }
      ]
    },
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null
    }
  },
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    loaderOptions: {
      stylus: {
        import: [path.join(__dirname, './src/setting/color.styl')]
      }
    }
  },
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV === 'production') {
    //   config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.info']
    // }
    return {
      performance: {
        hints: false
      },
      plugins: process.env.NODE_ENV === 'production'
        ? [
          new webpack.HotModuleReplacementPlugin()
        ]
        : [
            new webpack.HotModuleReplacementPlugin(),
            new BundleAnalyzerPlugin({
              generateStatsFile: false
            }),
            new SimpleProgressWebpackPlugin(),
            AutoImport({
              resolvers: [ElementPlusResolver()]
            }),
            Components({
              resolvers: [ElementPlusResolver()]
            })
          ],
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包初始时依赖的第三方
            },
            corejs: {
              name: 'chunk-corejs', // 单独将 core-js 拆包
              priority: 15,
              test: /[\\/]node_modules[\\/]core-js[\\/]/
            }
          }
        }
      },
      output: {
        hotUpdateChunkFilename: '[id].hot-update.js',
      }
    }
  }
}
