const logger = require('../modules/logger.js');
const config = require('../config.js');
const { permlevel } = require('../modules/functions.js');

const { prefix } = config.settings;

module.exports = async (client, message) => {
    const { container } = client;
    if (!message.guildId || message.author.bot) return; // 確認訊息在伺服器內發送，且不為機器人
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        return message.reply(`嗨! 機器人的前綴是 \`${prefix}\``); // 如果有人提及機器人，就回覆前綴
    }

    if (message.content.toLowerCase().startsWith(prefix)) {
        try {
            // 得到 command 指令名稱 和 args 參數陣列
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            // 得到使用者的權限等級
            const permlevelGet = permlevel(message.member);
            // 從指令名稱得到其export的函數
            const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command));
            // 如果找不到，就不執行
            if (!cmd) return;
            // 比較權限等級，如果使用者的權限等級小於指令的權限等級，就不執行
            if (permlevelGet < container.levelCache[cmd.conf.permLevel]) {
                return message.channel.send(`你沒有權限使用!\n你的權限等級為 ${permlevelGet} (${config.permLevels.find((l) => l.level === permlevelGet).name})\n你需要權限等級 ${container.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
            }
            // 執行指令
            await cmd.run(client, message, args);
            // 記錄日誌
            logger.cmd(`${config.permLevels.find((l) => l.level === permlevelGet).name} ${message.author.tag} 執行了 ${cmd.conf.name}`);
        } catch (err) {
            // 如果出現錯誤，就回覆錯誤訊息
            message.channel.send({ content: `出現了些錯誤\n\`\`\`${err.message}\`\`\`` });
        }
    }
};
