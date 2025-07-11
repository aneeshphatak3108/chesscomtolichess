chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "open_lichess") {
        chrome.tabs.create({ url: "https://lichess.org/paste" }, (tab) => {
            // Wait a bit for page load, then send PGN
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                if (tabId === tab.id && info.status === "complete") {
                    chrome.tabs.onUpdated.removeListener(listener);
                    chrome.tabs.sendMessage(tab.id, {
                        type: "inject_pgn",
                        pgn: message.pgn
                    });
                }
            });
        });
    }
});
