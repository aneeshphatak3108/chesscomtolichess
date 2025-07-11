console.log("✅ Chess2Lichess content script loaded!");

// Helper to wait until an element exists
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

// Add custom button after game ends
function addGameReviewButton() {
    const container = document.querySelector(".game-over-buttons-component") || document.querySelector(".game-over-component");
    if (!container || document.querySelector("#review-to-lichess")) return;

    const btn = document.createElement("button");
    btn.textContent = "📊 Game Review on Lichess";
    btn.id = "review-to-lichess";
    btn.style.cssText = `
        background-color: #5865f2;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
    `;

    container.appendChild(btn);

    btn.onclick = async () => {
        try {
            console.log("👉 Opening share modal...");
            const shareBtn = document.querySelector('[data-cy="share-button"]') || document.querySelector("button[aria-label='Share']");
            if (!shareBtn) return alert("Share button not found.");
            shareBtn.click();

            // Wait for the PGN tab
            await waitForElement("#tab-pgn", 5000);
            document.querySelector("#tab-pgn").click();

            // Wait for PGN textarea
            const pgnBox = await waitForElement("textarea.share-menu-tab-pgn-textarea", 5000);
            const pgn = pgnBox.value;

            await navigator.clipboard.writeText(pgn);
            //alert("✅ PGN copied to clipboard. Opening Lichess...");
            //window.open("https://lichess.org/paste", "_blank");
            chrome.runtime.sendMessage({
                type: "open_lichess",
                pgn: pgn
            });
            
        } catch (err) {
            console.error("❌ Error:", err);
            alert("Something went wrong: " + err.message);
        }
    };
}

// Wait for game end
const observer = new MutationObserver(() => {
    const isGameOver = document.querySelector(".game-over-buttons-component, .game-over-component");
    if (isGameOver) {
        console.log("Game over detected!");
        addGameReviewButton();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
