const path = require('path');

module.exports = {

  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "./src/assets/styles/main.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('scss')
      .test(/\.scss/)
      .oneOf([
        {
          resourceQuery: /module/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          ]
        },
        // this matches plain `<style>` or `<style scoped>`
        {
          use: [
            'vue-style-loader',
            'sass-loader'
          ]
        }
      ])
      // .use('vue-style-loader')
      // .loader('sass-loader')
      // .options({
      //   modules: true,
      //   localIdentName: '[local]_[hash:base64:8]'
      // })
      .end();

    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/symbols'))
      .end()
      .use('file-loader')
      .loader('file-loader')
      .options({
        name(file) {
          // if (process.env.NODE_ENV === 'development') {
          //   return 'assets/images/[hash].[ext]';
          // }

          return 'assets/images/[name].[ext]';
        },
      });

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/symbols'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: filePath => path.basename(filePath, '.svg'),
      });
  },
};

function resolve(dir) {
  return path.join(__dirname, './', dir);
}
