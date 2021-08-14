// Background.js

/**
 * Listener for browserAction onclick of the extension icon.
 * Sends message "clicked_browser_action" to the current content.
 */


/** 
 * "default_popup": "popup.html" in the menifest.joson will overwride below Listener
 */

// chrome.browserAction.onClicked.addListener(function(tab) {
//     // Send a message to the active tab
//     chrome.tabs.query({active: true, currentWindow: true}, function(t) {
//         chrome.tabs.sendMessage(t[0].id, {"message": "clicked_browser_action"});

//     });
// });

/**
 * Listener for current content.
 * Accepts message return_canadapost and sets icon true if Canada post and false if not.
 */
chrome.runtime.onMessage.addListener(
    function (r, sender, sendResponse) {
        if (r.message === "return_canadapost" && r.value) {
            changeIcon(true);
        } else if (r.message === "return_canadapost" && !r.value) {
            changeIcon(false);
        }
    }
);

/**
 * Handler for when tab is refreshed.
 * Calls changeIcon(false) to set icon back to default.
 * Calls checkIfCanadaPost with current tab via tabs.query to ensure the current page is still selected before it's loaded.
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    changeIcon(false)
    chrome.tabs.query({ active: true, currentWindow: true }, function (t) {
        checkIfCanadaPost(t[0].id)
    });
});

/**
 * Handler for when tab is created.
 * Calls changeIcon(false) to set icon back to default.
 * Calls checkIfCanadaPost with current tab via tabs.query to ensure the current page is still selected before it's loaded.
 */
chrome.tabs.onCreated.addListener(function (tab) {
    changeIcon(false)
    chrome.tabs.query({ active: true, currentWindow: true }, function (t) {
        checkIfCanadaPost(t[0].id)
    });
});

/**
 * Handler for when tab is selected.
 * Calls changeIcon(false) to set icon back to default.
 * Calls checkIfCanadaPost with current tab via tabs.query to ensure the current page is still selected before it's loaded.
 */
chrome.tabs.onActivated.addListener(function (tab) {
    changeIcon(false)
    chrome.tabs.query({ active: true, currentWindow: true }, function (t) {
        checkIfCanadaPost(t[0].id)
    });
});

/**
 * Sends message to current content to check if it's CanadaPost
 * @param tab - The browser tab to check if Canada Post. Should be current and active tab.
 */
function checkIfCanadaPost(tab) {
    chrome.tabs.sendMessage(tab, { "message": "if_canadapost" });
}

/**
 * Changes extensions icon based on flag boolean. True = green. False = red.
 * @param {boolean} flag - Toggle to change the flag to green if true, and red if false.
 */
function changeIcon(flag) {
    if (flag) {
        chrome.browserAction.setIcon({ path: { "39": "/icons/greenicon.png" } });
    } else {
        chrome.browserAction.setIcon({ path: { "39": "/icons/redicon.png" } });
    }
}