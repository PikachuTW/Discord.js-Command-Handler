const logger = require('../modules/logger.js');
const { settings } = require('../config.js');

module.exports = async (client) => {
    // 記錄機器人準備完成
    logger.ready(`${client.user.tag}, 成員數: ${client.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b, 0)} ，伺服器數: ${client.guilds.cache.size}`);
    // 設定機器人的活動
    if (settings.activity) {
        client.user.setActivity(settings.activity, { type: 'PLAYING' });
    }
};
