module.exports = (client, thread) => {
    thread.join();
};

// 由於機器人是不會自動加入論壇的，所以必須要偵測然後自動加入，這樣才可以強制管理
