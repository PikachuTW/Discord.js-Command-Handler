exports.run = async (client, message) => {
    const ping = Date.now() - message.createdTimestamp;
    const apiping = Math.round(client.ws.ping);
    message.reply(`機器人延遲: \`${ping}\` ms\nApi延遲: \`${apiping}\` ms`);
};

exports.conf = {
    aliases: [],
    permLevel: 'User',
};

exports.help = {
    name: 'ping',
    description: '傳送延遲值',
    usage: 'ping',
};
