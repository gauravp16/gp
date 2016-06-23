exports.config = {
  baseUrl: 'http://localhost:9001',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  framework: 'cucumber',
  specs: [
    'features/*.feature'
  ],
  capabilities: {
    browserName: 'chrome',
    'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',
    'phantomjs.cli.args': '--debug=true --webdriver --webdriver-logfile=webdriver.log --webdriver-loglevel=DEBUG',
    version: '',
    platform: 'ANY'
  },
  cucumberOpts: {
    require: 'steps/*-steps.js',
    format: 'pretty'
  },
  onPrepare: function () {
    global.isAngularSite = function (flag) {
      console.log('Switching to ' + (flag ? 'Asynchronous' : 'Synchronous') + ' mode.')
      browser.ignoreSynchronization = !flag;
    },
    global.BROWSER_WAIT = 5000;
  }
}