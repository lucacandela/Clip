/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */

    /**
     * Get the content of the textboxt,
     * send a "copy" message to the content
     * script in the active tab so that it will copy.
     */
    function copy(tabs) {
      console.log(e.target.TextContent);
      let txt = e.target.textContent;
      browser.tabs.sendMessage(tabs[0].id, {
        command: "copy",
        content: txt
      });
    }

    /**
     * Send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset"
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not copy: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "copy()" or "reset()" as appropriate.
     */
    if (e.target.classList.children[0]contains("textbox")) {
      console.log("ur mom gay");
      browser.tabs.query({active: true, currentWindow: true})
        .then(copy)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      console.log("reset button");
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
    else {
      console.log("idk");
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute copy content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/copy.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);