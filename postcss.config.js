
// подключите плагины в файл
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // плагины
  plugins: [
    //  autoprefixer
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};