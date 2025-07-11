# ♟️ Chess.com to Lichess - Free Game Review Extension

A lightweight Chrome Extension that lets users instantly analyze their completed Chess.com games on [Lichess.org](https://lichess.org/paste) with one click.

## 🔧 What it does

Once a Chess.com game ends, this extension injects a **"📊 Game Review on Lichess"** button below the game result. Clicking the button:

1. Opens the Share modal on Chess.com
2. Switches to the PGN tab
3. Extracts the PGN of the game
4. Opens [lichess.org/paste](https://lichess.org/paste)
5. Pastes the PGN and auto-clicks **IMPORT GAME**

All this happens without the user copying or switching tabs manually.

## Current Approach

- Currently my approach is DOM scraping to:
  - Detect game over screen
  - Locate and click Share & PGN buttons
  - Extract the PGN via query selectors

> ⚠️ This approach is tightly coupled to the Chess.com website structure. Any UI change may break the functionality.

##  Future Plans

I plan to migrate from DOM scraping to using Chess.com's APIs, for a more stable and scalable solution. This would:
- Avoid breakage from UI changes
- Make the extension more reliable
- Open possibilities like historical game fetching or auto-analysis

##  Technologies Used

- JavaScript (Vanilla)
- Chrome Extension APIs (Manifest V3)
- MutationObserver + async DOM interaction
- Message passing between content/background scripts

##  How to Use Locally

1. Clone this repo
2. Go to chrome://extensions in your browser
3.Enable Developer Mode
4.Click "Load Unpacked" and select this folder
5.Play a Chess.com game — at the end, click the Review on Lichess button!
