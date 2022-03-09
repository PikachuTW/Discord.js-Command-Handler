if (Number(process.version.slice(1).split('.')[0]) < 17) throw new Error('Node 的等級必須要大於 17.x ，請進行更新');
require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { permLevels } = require('./config.js');
const logger = require('./modules/logger.js');
const functions = require('./modules/functions.js');
const client = new Client({ intents: 32767, partials: ['CHANNEL', 'USER', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'] });

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

const init = async () => {

    const folders = readdirSync('./commands/').filter(file => !file.endsWith('.js'));
    for (const folder of folders) {
        const cmds = readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js'));
        for (const file of cmds) {
            try {
                const code = require(`./commands/${folder}/${file}`);
                logger.log(`CMD ${code.help.name} 已被載入 ✅`);
                client.container.commands.set(code.help.name, code);
                code.conf.aliases.forEach(alias => {
                    client.container.aliases.set(alias, code.help.name);
                });
            }
            catch (error) {
                logger.error(`${error}`);
            }
        }
    }

    const eventFiles = readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        try {
            const eventName = file.split('.')[0];
            logger.log(`EVENT ${eventName} 已被載入 ✅`);
            const event = require(`./events/${file}`);
            client.on(eventName, event.bind(null, client));
        }
        catch (error) {
            logger.error(`${error}`);
        }
    }

    client.on('threadCreate', (thread) => thread.join());

    client.login(process.env.DISCORD_TOKEN);
};

init();