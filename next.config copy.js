/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public'
});

module.exports = {
  ...withPWA,
  eslint: {
    dirs: ['.'],
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  },
  // other next.js config options
};