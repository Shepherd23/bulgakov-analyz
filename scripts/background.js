chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url.startsWith("https://ithub.bulgakov.app/lessons/")) {
        chrome.scripting
        .executeScript({
        target : {tabId : details.tabId},
        files : [ "scripts/main.js" ],
        })
        chrome.scripting
        .executeScript({
        target : {tabId : details.tabId},
        files : [ "libs/mammoth.browser.js" ],
        })
    }
});