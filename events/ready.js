const logger = require('../modules/logger.js');
const { settings } = require('../config.js');

module.exports = async (client) => {
    logger.ready(`${client.user.tag}, 成員數: ${client.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b)} ，伺服器數: ${client.guilds.cache.size}`);
    if (settings.activity) {
        client.user.setActivity(settings.activity, { type: 'PLAYING' });
    }
};
