// popup.js
const copyButton = document.getElementById('copyButton');

copyButton.addEventListener('click', function () {
    const messageToUI = document.querySelector("#message")
    messageToUI.textContent = "Attempted to copy"

    // Get the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "copyText" })
    });
});
