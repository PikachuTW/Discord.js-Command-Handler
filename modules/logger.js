/* eslint-disable indent */
const moment = require('moment-timezone');

exports.run = (content, type) => {
    const timestamp = `[${moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')}]:`;

    switch (type) {
        case 'log': return console.log(`${timestamp} LOG ${content} `);
        case 'warn': return console.log(`${timestamp} WARN ${content} `);
        case 'error': return console.log(`${timestamp} ERROR ${content} `);
        case 'cmd': return console.log(`${timestamp} CMD ${content}`);
        case 'ready': return console.log(`${timestamp} READY ${content}`);
        case 'eval': return console.log(`${timestamp} EVAL ${content} `);
        default: throw new TypeError('選項: log, warn, error, cmd, ready, eval');
    }
};

exports.log = (arg) => this.run(arg, 'log');

exports.warn = (arg) => this.run(arg, 'warn');

exports.error = (arg) => this.run(arg, 'error');

exports.cmd = (arg) => this.run(arg, 'cmd');

exports.ready = (arg) => this.run(arg, 'ready');

exports.eval = (arg) => this.run(arg, 'eval');