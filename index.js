if (Number(process.version.slice(1).split('.')[0]) < 17) throw new Error('Node 的等級必須要大於 17.x ，請進行更新');
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { permLevels } = require('./config.js');
const logger = require('./modules/logger.js');
const functions = require('./modules/functions.js');

const client = new Client({ intents: 131071, partials: ['CHANNEL', 'USER', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'] });

const commands = new Collection();
const aliases = new Collection();

const levelCache = {};
for (let i = 0; i < permLevels.length; i++) {
    const thisLevel = permLevels[i];
    levelCache[thisLevel.name] = thisLevel.level;
}

client.container = {
    commands,
    aliases,
    levelCache,
};
client.fn = functions;

(async () => {
    readdirSync('./commands/').forEach((folder) => {
        readdirSync(`./commands/${folder}/`).forEach((file) => {
            try {
                const code = require(`./commands/${folder}/${file}`);
                const cmdName = file.split('.')[0];
                code.conf.name = cmdName;
                logger.log(`CMD ${cmdName} 已被載入 ✅`);
                client.container.commands.set(cmdName, code);
                code.conf.aliases.forEach((alias) => {
                    client.container.aliases.set(alias, cmdName);
                });
            } catch (error) {
                logger.error(`${error}`);
            }
        });
    });

    readdirSync('./events/').forEach((file) => {
        try {
            const eventName = file.split('.')[0];
            logger.log(`EVENT ${eventName} 已被載入 ✅`);
            client.on(eventName, require(`./events/${file}`).bind(null, client));
        } catch (error) {
            logger.error(`${error}`);
        }
    });

    client.login(process.env.DISCORD_TOKEN);
})();
