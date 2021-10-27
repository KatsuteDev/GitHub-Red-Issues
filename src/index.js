// Copyright (C) 2021 Katsute <https://github.com/Katsute>

"use strict";

removeInlineCSS();

// run for 30s in case the site hasn't loaded yet
let loop = 0;
const interval = setInterval(() => {
    removeInlineCSS();
    if(loop++ >= 30)
        clearInterval(this);
}, 1000);

// remove inlined css from timeline
function removeInlineCSS(){
    for(const badge of document.getElementsByClassName("TimelineItem-badge"))
        if(badge.style.cssText == "background-color: var(--color-done-emphasis)  !important;")
            badge.style.cssText = "";
}