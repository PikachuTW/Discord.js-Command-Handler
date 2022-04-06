const Discord = require('discord.js');
const config = require('../config.js');

const permlevel = (member) => {
    let permlvl = 0;
    const permOrder = config.permLevels.slice(0).sort((p, c) => (p.level < c.level ? 1 : -1));
    while (permOrder.length) {
        const currentLevel = permOrder.shift();
        if (currentLevel.check(member)) {
            permlvl = currentLevel.level;
            break;
        }
    }
    return permlvl;
};

const targetGet = (message, args) => {
    if (!args[0]) return undefined;
    if (args[0].matchAll(Discord.MessageMentions.USERS_PATTERN).next().value) {
        return message.guild.members.cache.get(args[0].matchAll(Discord.MessageMentions.USERS_PATTERN).next().value[1]);
    }
    return message.guild.members.cache.get(args[0]);
};

const clean = async (client, text) => {
    let value = text;
    if (value && value.constructor.name === 'Promise') { value = await value; }
    if (typeof value !== 'string') { value = require('util').inspect(value, { depth: 1 }); }

    value = value
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`);

    value = value.replaceAll(client.token, '[REDACTED]');

    return value;
};

module.exports = { permlevel, targetGet, clean };
