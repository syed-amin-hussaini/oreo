const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public'
});

module.exports = {
  ...withPWA,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // other next.js config options
};