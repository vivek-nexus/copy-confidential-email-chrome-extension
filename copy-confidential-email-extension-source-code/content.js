// content.js


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'copyText') {
        if (document.querySelector(".hi")) {
            const element = document.querySelector(".hi").parentElement.children[2];
            let textContentVariable = [];

            if (element) {
                logChildNodeText(element, textContentVariable);
                const textContentString = textContentVariable.join('\n');

                showEmailText(textContentString)

                // navigator.clipboard.writeText(textContentString).then(function () {
                //     alert("Text was successfully copied to clipboard!");
                // }).catch(function () {
                //     alert("Failed to copy to clipboard")
                // });
            }
        }
        else
            alert("Looks the confidential email is not open in the current tab!")
    }
});

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

function showEmailText(text) {
    // Banner CSS
    let html = document.querySelector("html");
    let obj = document.createElement("div");
    let textarea = document.createElement("textarea");
    let copyButton = document.createElement("button");
    let closeButton = document.createElement("button");
    obj.style.cssText = modalCSS;
    textarea.style.cssText = textAreaCSS
    textarea.value = text;
    copyButton.textContent = "Copy"
    closeButton.textContent = "Close"

    obj.append(textarea);
    obj.append(copyButton);
    obj.append(closeButton)

    if (html)
        html.append(obj);

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(function () {
            copyButton.textContent = "Copied"
            setTimeout(() => {
                copyButton.textContent = "Copy"
            }, 3000);
        }).catch(function () {
            alert("Failed to copy to clipboard")
        });
    })

    closeButton.addEventListener("click", () => {
        obj.remove()
    })
}


const modalCSS = `background: rgb(255 255 255 / 75%); 
    backdrop-filter: blur(16px); 
    position: fixed;
    top: 10%; 
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    max-width: 780px;
    height: 75dvh;  
    z-index: 1000; 
    padding: 0rem 1rem;
    border-radius: 8px; 
    font-size: 1rem; 
    line-height: 1.5; 
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;`;

const textAreaCSS = `width: 100%;
    height: 90%;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;