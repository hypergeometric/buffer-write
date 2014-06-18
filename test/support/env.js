process.env.NODE_ENV = 'test';

var chai = require('chai');
chai.config.showDiff = false;
global.expect = chai.expect;
