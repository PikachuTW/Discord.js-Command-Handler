# Discord.js v13 Command Handler

[![Run on Repl.it](https://replit.com/badge/github/Pikachu_TW/Discordjs-v13-Command-Handler)](https://replit.com/@PikachuTW/Discordjs-v13-Command-Handler)

這是 Discord.js v13 機器人的框架模板，你可以用它來開始搭建機器人

## Requirements

* Node.js 版本 16.9.0 或以上
* NPM 版本 7 或以上

## Config

`config.js`

```js
module.exports = {
    settings: {
        prefix: '!', // 機器人的前綴
        activity: 'Tails機器人框架', // 機器人的活動狀態
    },
    // 權限設定
    permLevels: [
        {
            level: 0,
            name: 'User',
            check: () => true,
        },

        {
            level: 10,
            name: 'Owner',
            check: (member) => member.id === '',
            // 填入你的id
        },
    ],
};
```

`.env`

```env
DISCORD_TOKEN = '填入TOKEN'
```

## 注意事項

* 請將你的機器人token填入 `.env` 檔中
* `config.js` 可設定機器人前綴與其活動狀態、權限設定
* 下載之後請運行 `npm install` ，安裝所需要的套件
* 若要運行， `node .`
* 若要部屬在repl.it，請[點擊我](https://replit.com/@PikachuTW/Discordjs-v13-Command-Handler) 並Fork專案，並在Secret填入 `DISCORD_TOKEN`
