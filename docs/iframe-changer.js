//shamelessly stolen from https://melonking.net/scripts/frame-link.js

var mainFrame;
var firstLoad = true;
var updateTitle = true;
var pageParam = "z";
var titlePrefix = "";
var hitCounterFunction = undefined;

//Event to handle first page load - Also sets up the mainFrame
window.addEventListener("DOMContentLoaded", (e) => {
    mainFrame = document.getElementById("mainframe");
    mainFrame.addEventListener("load", updateHistory, false);
    setMainFrame();
});

//Event to handle back button presses
window.addEventListener("popstate", function (e) {
    if (e.state !== null) {
        setMainFrame();
    }
});

//Checks to see if a page parameter exists and sets the mainframe src to that page.
function setMainFrame() {
    let params = new URLSearchParams(window.location.search);
    let page = params.get(pageParam);
    mainFrame = document.getElementById("mainframe");
    if (page != null) {
        mainFrame.src = page;
    }
}

//Updates the browser history with the current page, causing the URL bar to update.
function updateHistory() {
    let title = titlePrefix + mainFrame.contentDocument.title;

    // Stops the page getting into an infinate loop reloading itself.
    if (firstLoad) {
        firstLoad = false;
        if (updateTitle) {
            document.title = title;
        }
        return;
    }

    history.replaceState(null, "", "?" + pageParam + "=" + mainFrame.contentWindow.location.pathname);

    if (updateTitle) {
        document.title = title;
    }
}

//i wrote this one :3
function changeiframe(pagename){
    document.getElementById("mainframe").src = pagename + ".html";
    updateHistory();
}