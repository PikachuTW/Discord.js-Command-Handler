module.exports = {

    settings: {
        prefix: '!',
        // 機器人的前綴
        activity: 'Tails機器人框架',
        // 機器人的活動狀態
    },

    // 權限設定
    permLevels: [
        {
            level: 0,
            name: 'User',
            check: () => true,
        },

        /* {
            level: 1,
            name: 'Staff',
            check: (member) => {
                try {
                    if (member.roles.cache.has('身分組id')) return true;
                }
                catch (e) {
                    return false;
                }
            },
        }, */

        {
            level: 10,
            name: 'Owner',
            check: (member) => member.id === '',
            // 填入你的id
        },
    ],
};
