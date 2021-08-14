// CanadaPostContent.js

/**
 * Message listener.
 * If message is "is_candapost" then returns message "return_canadapost" with value true.
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "if_canadapost") {
            //Sends a message back to Background.js, in this case to open a new tab to google
            chrome.runtime.sendMessage({ "message": "return_canadapost", "value": true });
        }
    }
);