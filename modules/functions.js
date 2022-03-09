const config = require('../config.js');

function permlevel(member) {
    let permlvl = 0;

    const permOrder = config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
        const currentLevel = permOrder.shift();
        if (currentLevel.check(member)) {
            permlvl = currentLevel.level;
            break;
        }
    }
    return permlvl;
}

function targetGet(message, args) {
    return message.mentions.members.first() || message.guild.members.cache.get(args[0]);
}

async function clean(client, text) {
    if (text && text.constructor.name == 'Promise') { text = await text; }
    if (typeof text !== 'string') { text = require('util').inspect(text, { depth: 1 }); }

    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203));

    text = text.replaceAll(client.token, '[REDACTED]');

    return text;
}

module.exports = { permlevel, targetGet, clean };