// content.js
function logChildNodeText(node, textContentVariable) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim() !== '') {
            textContentVariable.push(node.textContent.trim());
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
            logChildNodeText(children[i], textContentVariable);
        }
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    alert("Is the confidential email open in the current tab?")
    if (request.type === 'copyText') {
        if (document.querySelector(".hi")) {
            const element = document.querySelector(".hi").parentElement.children[2];
            let textContentVariable = [];

            if (element) {
                logChildNodeText(element, textContentVariable);
                const textContentString = textContentVariable.join('\n');

                navigator.clipboard.writeText(textContentString).then(function () {
                    alert("Text was successfully copied to clipboard!");
                });
            }
        }
        else
            alert("Looks the confidential email is not open in the current tab!")
    }
});
