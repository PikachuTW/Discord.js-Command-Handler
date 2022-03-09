const logger = require('../modules/logger.js');
const config = require('../config.js');

const prefix = config.settings.prefix;

module.exports = async (client, message) => {
    const { container } = client;
    if (!message.guildId) return;
    if (message.author.bot) return;
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        return message.reply(`嗨! 機器人的前綴是 \`${prefix}\``);
    }

    if (message.content.toLowerCase().startsWith(prefix)) {
        try {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            const permlevelGet = client.fn.permlevel(message.member);
            const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command));
            if (!cmd) return;
            if (permlevelGet < container.levelCache[cmd.conf.permLevel]) {
                return message.channel.send(`你沒有權限使用!\n你的權限等級為 ${permlevelGet} (${config.permLevels.find(l => l.level === permlevelGet).name})\n你需要權限等級 ${container.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
            }
            await cmd.run(client, message, args);
            logger.cmd(`${config.permLevels.find(l => l.level === permlevelGet).name} ${message.author.tag} 執行了 ${cmd.help.name}`);
        }
        catch (err) {
            message.channel.send({ content: `出現了些錯誤\n\`\`\`${err.message}\`\`\`` });
        }
    }
};