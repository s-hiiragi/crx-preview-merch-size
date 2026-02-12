
async function sendMessageToActiveTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, message);
}

chrome.contextMenus.onClicked.addListener(async(info, tab) => {
    if (info.menuItemId === "DisplayGoodsSize") {
        const msg = { selectionText: info.selectionText };
        await sendMessageToActiveTab(msg);
    }
});

chrome.runtime.onInstalled.addListener((details) => {
    chrome.contextMenus.create({
        id: "DisplayGoodsSize",
        title: "実寸サイズをプレビュー",
        contexts: ["selection"]
    });
});
