// ==UserScript==
// @name         Copy GitHub Issue/PR Title Link
// @namespace    https://github.com/dinhtungdu/userscripts
// @version      1.1
// @description  Copy the title link of the current GitHub issue/PR when you press "q" followed by "q"
// @author       Tung Du
// @match        https://github.com/*/*/issues/*
// @match        https://github.com/*/*/pull/*
// ==/UserScript==

(function() {
    'use strict';

    let keysPressed = [];

    document.addEventListener('keydown', function(e) {
        keysPressed.push(e.key);

        if (keysPressed.length > 2) {
            keysPressed.shift();
        }

        if (keysPressed[0] === 'q' && keysPressed[1] === 'q') {
            const titleElement = document.querySelector('.gh-header-title');
            if (titleElement) {
                const title = titleElement.textContent.trim();
                const url = window.location.href;
                const htmlLink = `<a href="${url}">${title}</a>`;

                copyToClipboard(htmlLink, title);
            }

            keysPressed = []; // Reset the keys
        }
    });
    function copyToClipboard(html,plain) {
        const blob = new Blob([html], { type: 'text/html' });
        const blobText = new Blob([plain], {type: 'text/plain'});
        const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': blobText })];

        navigator.clipboard.write(data).then(function() {
            console.log('HTML link copied to clipboard.');
        }).catch(function(error) {
            console.error('Failed to copy HTML link: ', error);
        });
    }
})();
