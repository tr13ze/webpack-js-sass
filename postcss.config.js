module.exports = {
    plugins: [
      require('autoprefixer')({browsers:["last 4 version", "Firefox 15"]}),
      require('cssnano')({preset:'default'})
    ]
  };
