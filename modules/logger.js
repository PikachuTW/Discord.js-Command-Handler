const moment = require('moment-timezone');

const types = ['log', 'warn', 'error', 'cmd', 'ready', 'eval'];

exports.run = (content, type) => {
    const timestamp = `[${moment().tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')}]:`;

    if (!(types.includes(type))) {
        throw new TypeError(`選項: ${types.join(', ')}`);
    }

    console.log(`${timestamp} ${type.toUpperCase()} ${content}`);
};

types.forEach((type) => {
    exports[type] = (arg) => this.run(arg, type);
});
