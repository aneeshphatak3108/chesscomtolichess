function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const intervalTime = 100;
        let timeElapsed = 0;

        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if (timeElapsed > timeout) {
                clearInterval(interval);
                reject(new Error("Element not found: " + selector));
            }
            timeElapsed += intervalTime;
        }, intervalTime);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "inject_pgn") {
        waitForElement("#form3-pgn", 5000).then(textarea => {
            textarea.value = message.pgn;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));

            // Click import button
            const importBtn = document.querySelector("button.submit.button.text");
            if (importBtn) {
                importBtn.click();
            } else {
                console.error("Import button not found.");
            }
        }).catch(err => {
            console.error("Error injecting PGN:", err);
        });
    }
});
