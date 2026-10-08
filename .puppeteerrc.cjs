// .puppeteerrc.cjs
const { join } = require('path');

/**
 * @type {import('puppeteer').Configuration}
 */
module.exports = {
  // The directory where Puppeteer will download and look for browsers.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),

  /**
   * If you'd rather use the system-installed Chrome, uncomment the following line
   * and point it to your Chrome executable.
   */
  // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};
