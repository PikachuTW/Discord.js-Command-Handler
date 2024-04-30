const { codeBlock } = require('@discordjs/builders');
const logger = require('../../modules/logger.js');
const { clean } = require('../../modules/functions.js');

/*
Eval 指令非常危險，這將可以輸出你的Token，甚至是獲取、刪除整台電腦的檔案! 請務必只讓自己有操作權，尤其是用自己的伺服器架設的時候
*/

exports.run = async (client, message, args) => {
    const code = args.join(' ');
    try {
        // eslint-disable-next-line no-eval
        const evaled = eval(code);
        const cleaned = await clean(client, evaled);
        logger.eval(`${cleaned}`);
        message.channel.send(codeBlock('js', cleaned));
    } catch (err) {
        message.channel.send(codeBlock('js', err));
        logger.error(`${err}`);
    }
};

exports.conf = {
    aliases: [],
    permLevel: 'Owner',
    description: '執行任何 javascript 程式碼',
    usage: 'eval <程式碼>',
};
