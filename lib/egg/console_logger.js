'use strict';

const Logger = require('../logger');
const ConsoleTransport = require('../transports/console');
const utils = require('../utils');

/**
 * Terminal Logger, send log to console.
 */
// 继承自lib/logger.js
class ConsoleLogger extends Logger {

  /**
   * @constructor
   * @param {Object} options
   * - {String} [encoding] - log string encoding, default is 'utf8'
   */
  constructor(options) {
    super(options);
    // 基于console.js来完成输出
    this.set('console', new ConsoleTransport({
      level: this.options.level,
      formatter: utils.consoleFormatter,
    }));
  }

  get defaults() {
    return {
      encoding: 'utf8',
      level: process.env.NODE_ENV === 'production' ? 'INFO' : 'WARN',
    };
  }

}

module.exports = ConsoleLogger;
