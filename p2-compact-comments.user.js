// ==UserScript==
// @name         P2 compact comments
// @namespace    http://tampermonkey.net/
// @version      2025-04-28-15-49
// @description  try to take over the world!
// @author       You
// @match        *.wordpress.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wordpress.com
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  const css = `
.o2-post-comments .comment-content {
  font-size: 0.875em !important;
  margin-left: 0em !important;
  margin-top: 0em !important;
}
.o2-post-comments .comment-content p {
  margin-bottom: 1rem !important;
}
.o2-post-comments .comment-content blockquote {
  padding: 1em 1em 0.1em !important;
  margin-bottom: 1em !important;
}
header.o2-comment-header {
  padding: 0 !important;
  transform: translateY(-6px);
}
.o2-comment .o2-comment-footer-actions {
  padding-bottom: 0.25em !important;
}
.o2-comment .o2-comment-footer-actions p {
  margin-bottom: 0em !important;
}
.o2-child-comments {
  margin-top: 0.5em !important;
  padding-left: 1em !important;
  border-left: 1px solid;
  border-bottom: 1px solid;
  margin-bottom: -1px;
  border-color: #f2f2f2;
}
.o2-child-comments .o2-comment-header .fragment-avatar-wrapper,
.o2-child-comments .o2-comment-header .avatar {
  width: 20px !important;
  height: 20px !important;
}
.o2-child-comments .o2-comment {
  padding: 0 !important;
}
.o2-child-comments .o2-comment + .o2-comment {
  margin-top: 0.5em;
}
    `;
  GM_addStyle(css);
})();
