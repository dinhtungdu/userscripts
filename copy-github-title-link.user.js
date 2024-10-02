// ==UserScript==
// @name         Copy GitHub Issue/PR Title Link
// @namespace    https://github.com/dinhtungdu/userscripts
// @version      1.2.9
// @description  Copy the title link of the current GitHub issue/PR when you press "w" followed by "w"
// @author       Tung Du
// @match        https://github.com/*/*/issues/*
// @match        https://github.com/*/*/pull/*
// ==/UserScript==

(function () {
  "use strict";

  let keysPressed = [];

  function isUserInAnEditableArea() {
    const tagName = document.activeElement.tagName.toLowerCase();
    return (
      (tagName === "input" &&
        ["text", "password", "email", "number", "tel", "url"].includes(
          document.activeElement.type,
        )) ||
      tagName === "textarea" ||
      document.activeElement.isContentEditable
    );
  }

  document.addEventListener("keydown", function (e) {
    if (isUserInAnEditableArea()) {
      return;
    }
    keysPressed.push(e.key);

    if (keysPressed.length > 2) {
      keysPressed.shift();
    }

    if (
      (keysPressed[0] === "w" && keysPressed[1] === "w") ||
      (keysPressed[0] === "ư" && keysPressed[1] === "w")
    ) {
      const titleElement = document.querySelector(".gh-header-title");
      if (titleElement) {
        const title = titleElement.textContent
          .trim()
          .replace(/(\r\n|\n|\r)/gm, "")
          .replace(/ +(?= )/g, "");
        const url = window.location.href;
        const htmlLink = `<a href="${url}">${title}</a>`;

        copyToClipboard(htmlLink, title);
      }

      keysPressed = []; // Reset the keys
    }

    if (keysPressed[0] === "c" && keysPressed[1] === "c") {
      const url = window.location.href;
      const issueNumber = url.match(/\d+/)[0];
      if (issueNumber) {
        copyToClipboard(
          `<a href="${url}">#${issueNumber}</a>`,
          `#${issueNumber}`,
        );
      }

      keysPressed = []; // Reset the keys
    }
  });
  function copyToClipboard(html, plain) {
    const blob = new Blob([html], { type: "text/html" });
    const blobText = new Blob([plain], { type: "text/plain" });
    const data = [
      new ClipboardItem({ "text/html": blob, "text/plain": blobText }),
    ];

    navigator.clipboard
      .write(data)
      .then(function () {
        console.log("HTML link copied to clipboard.");
      })
      .catch(function (error) {
        console.error("Failed to copy HTML link: ", error);
      });
  }
})();
