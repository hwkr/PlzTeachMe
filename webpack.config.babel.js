/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack';

const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const HtmlWebpackTemplate = require('html-webpack-template');

const Configuration = require('./config.json');

const production = process.argv.indexOf('-p') !== -1;

export default {
  context: __dirname,
  entry: './index.jsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          `less?${production ? 'compress' : 'sourceMap'}`
        ),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?name=[name].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.font\.?(js|json)$/,
        loader: ExtractTextPlugin.extract(
          'css?sourceMap!' +
          `less?${production ? 'compress' : 'sourceMap'}!` +
          'fontgen?fileName=[fontname][ext]',
        ),
      },
      {
        test: /.(eot|ttf|woff|woff2)$/,
        loaders: ['file?name=[name].[ext]'],
      },
    ],
  },
  lessLoader: {
    lessPlugins: (() => {
      if (production) {
        return [
          new LessPluginCleanCSS({ advanced: true, keepSpecialComments: 1 }),
          new LessPluginAutoPrefix({ browsers: ['last 2 versions'] }),
        ];
      }
      return [];
    })(),
  },
  externals: {
    Config: JSON.stringify(Configuration),
  },
  resolve: {
    modulesDirectories: [
      __dirname,
      'node_modules',
      'components',
    ],
    extensions: ['', '.js', '.jsx'],
  },
  plugins: (() => [
    new ExtractTextPlugin('styles.css'),
    new FaviconsWebpackPlugin({
      logo: 'img/icon.png',
      prefix: 'icons/',
      background: Configuration.themecolor,
      title: Configuration.title,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      filename: '../index.html',
      appMountId: 'root',
      baseHref: production ? `http://${Configuration.host}` : false,
      mobile: true,
      title: Configuration.title,
      meta: {
        description: Configuration.description,
        'og:title': Configuration.title,
        'og:description': Configuration.description,
        'og:type': 'website',
        'og:image': `http://${Configuration.host}/dist/icons/apple-touch-startup-image-750x1294.png`,
      },
      links: [
      ],
      inlineManifestWebpackName: 'webpackManifest',
      scripts: [/* Path to Script */],
    }),
  ].concat(
    production ? [
      // Production only plugins
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ] : [
      // Development only plugins
      /* Nothing */
    ])
  )(),
};
