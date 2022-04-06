exports.run = async (client, message) => {
    message.reply(`機器人延遲: \`${Date.now() - message.createdTimestamp}\` ms\nApi延遲: \`${client.ws.ping}\` ms`);
};

exports.conf = {
    aliases: [],
    permLevel: 'User',
    description: '傳送延遲值',
    usage: 'ping',
};
