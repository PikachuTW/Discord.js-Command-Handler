const logger = require('../modules/logger.js');

module.exports = async (client, error) => {
    logger.error(`${JSON.stringify(error)}`);
};

// 紀錄錯誤的事件
