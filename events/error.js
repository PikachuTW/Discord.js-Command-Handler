const logger = require('../modules/Logger.js');
module.exports = async (client, error) => {
    logger.error(`${JSON.stringify(error)}`);
};